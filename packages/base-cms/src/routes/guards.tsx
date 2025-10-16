import { useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

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

// HOC để wrap route với guard
export const withGuard = (Component: React.ComponentType<any>, Guard: React.FC<{ children: React.ReactNode }>) => {
	return (props: any) => (
		<Guard>
			<Component {...props} />
		</Guard>
	);
};

export const AccessControl = ({ children, profileAPI = '/profile' }: { children: React.ReactNode; profileAPI?: string }) => {
	const { isInitialized, signin, signout } = useAuth();

	const initialize = async () => {
		try {
			const serviceToken = getCookie('service_token');
			if (serviceToken) {
				const res = await axiosServices.get(profileAPI, {
					headers: {
						Authorization: `Bearer ${serviceToken}`
					}
				});
				signin({
					user: res?.data?.data,
					token: serviceToken
				});
			} else {
				signout();
			}
		} catch (err) {
			removeCookie('service_token');
			signout();
		}
	};

	useEffect(() => {
		initialize();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!isInitialized) {
		return <LoadingScreen />;
	}

	return children;
};
