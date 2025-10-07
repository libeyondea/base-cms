import { useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { LoadingScreen } from '~/components/LoadingScreen';
import { useAuth } from '~/contexts/AppProvider';
import { AuthService } from '~/service/authService';
import { getCookie, removeCookie } from '~/utils/cookie';

const authService = new AuthService();

// Guard component để bảo vệ private routes
export const PrivateGuard = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}

	return children;
};

// Guard component để bảo vệ auth routes (không cho phép vào nếu đã đăng nhập)
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" replace />;
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

export const AccessControl = ({ children }: { children: React.ReactNode }) => {
	const { isInitialized, signin, signout } = useAuth();

	const initialize = async () => {
		try {
			const serviceToken = getCookie('service_token');
			if (serviceToken) {
				const res = await authService.profile(serviceToken);
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
