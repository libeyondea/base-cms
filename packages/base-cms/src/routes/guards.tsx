import { useCallback, useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';
import { extractUserRoles } from '~/components/Layout/SideBar/utils';
import { LoadingScreen } from '~/components/LoadingScreen';
import { useAuth } from '~/contexts/AppProvider';
import { axiosServices } from '~/utils/axios';
import { getCookie, removeCookie } from '~/utils/cookie';

// Guard component để bảo vệ private routes
export const PrivateGuard = ({ children, redirectPrivateTo = '/signin' }: { children: React.ReactNode; redirectPrivateTo?: string }) => {
	const location = useLocation();
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to={redirectPrivateTo} state={{ from: location }} replace />;
	}

	return children;
};

// Guard component để bảo vệ auth routes (không cho phép vào nếu đã đăng nhập)
export const AuthGuard = ({ children, redirectAuthTo = '/' }: { children: React.ReactNode; redirectAuthTo?: string }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to={redirectAuthTo} replace />;
	}

	return children;
};

// Guard component để kiểm tra phân quyền dựa trên roles
export const RoleGuard = ({
	children,
	requiredRoles,
	roleConfig,
	redirectTo = '/404',
	fallback
}: {
	children: React.ReactNode;
	requiredRoles?: string[];
	roleConfig?: RoleConfig;
	redirectTo?: string;
	fallback?: React.ReactNode;
}) => {
	const { user } = useAuth();

	// Nếu không có requiredRoles hoặc là mảng rỗng thì cho phép truy cập
	if (!requiredRoles || requiredRoles.length === 0) {
		return children;
	}

	// Extract user roles
	const userRoles = extractUserRoles(user, roleConfig);

	// Kiểm tra xem user có ít nhất một role được yêu cầu không
	const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));

	if (!hasRequiredRole) {
		// Nếu có fallback component, hiển thị nó
		if (fallback) {
			return fallback;
		}
		// Không thì redirect về trang chỉ định
		return <Navigate to={redirectTo} replace />;
	}

	return children;
};

// HOC để wrap route với guard
export const withGuard = (Component: React.ComponentType<any>, Guard: React.FC<{ children: React.ReactNode }>) => {
	return (props: any) => (
		<Guard>
			<Component {...props} />
		</Guard>
	);
};

export const AccessControl = ({
	children,
	profileAPI = '/profile',
	keyDataProfile = 'data'
}: {
	children: React.ReactNode;
	profileAPI?: string;
	keyDataProfile?: string;
}) => {
	const { isInitialized, signin, signout } = useAuth();

	const initialize = useCallback(async () => {
		try {
			const serviceToken = getCookie('service_token');
			if (serviceToken) {
				const response = await axiosServices.get(profileAPI, {
					headers: {
						Authorization: `Bearer ${serviceToken}`
					}
				});

				if (response?.data?.success) {
					signin({
						user: response?.data?.[keyDataProfile],
						token: serviceToken
					});
				} else {
					signout();
				}
			} else {
				signout();
			}
		} catch (err) {
			removeCookie('service_token');
			signout();
		}
	}, [profileAPI, keyDataProfile, signin, signout]);

	useEffect(() => {
		initialize();
	}, [initialize]);

	if (!isInitialized) {
		return <LoadingScreen />;
	}

	return children;
};
