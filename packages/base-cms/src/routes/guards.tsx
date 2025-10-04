import { useEffect } from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { LoadingScreen } from '~/components/LoadingScreen';
import { AuthService } from '~/service/authService';
import { useDispatch, useSelector } from '~/store';
import { signin, signout } from '~/store/slices/auth';
import { getCookie, removeCookie } from '~/utils/cookie';

const authService = new AuthService();

// Guard component để bảo vệ private routes
export const PrivateGuard = ({ children }: { children: React.ReactNode }) => {
	const location = useLocation();

	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="/signin" state={{ from: location }} replace />;
	}

	return children;
};

// Guard component để bảo vệ auth routes (không cho phép vào nếu đã đăng nhập)
export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
	const dispatch = useDispatch();
	const isInitialized = useSelector((state) => state.auth.isInitialized);

	const initialize = async () => {
		try {
			const serviceToken = getCookie('service_token');
			if (serviceToken) {
				const res = await authService.profile(serviceToken);
				dispatch(
					signin({
						user: res?.data?.data,
						token: serviceToken
					})
				);
			} else {
				dispatch(signout());
			}
		} catch (err) {
			removeCookie('service_token');
			dispatch(signout());
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
