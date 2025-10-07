import { showToast } from '@libeyondea/base-cms';
import { useMutation } from '@tanstack/react-query';

import { AuthService } from '~/service/authService';

const authService = new AuthService();

const useAuthApi = () => {
	const mSignin = useMutation({
		mutationFn: (payload: any) => authService.signin(payload),
		onSuccess: (res) => {
			if (res.data?.success) {
				showToast.success(res.data?.message);
			} else {
				showToast.error(res.data?.message);
			}
		},
		onError(error: any) {
			showToast.error(error?.message || error);
		}
	});

	const mSignup = useMutation({
		mutationFn: (payload: any) => authService.signup(payload),
		onSuccess: (data) => {
			if (data.data.success) {
				showToast.success(data?.data?.message);
			} else {
				showToast.error(data?.data?.message);
			}
		},
		onError: (error: any) => {
			showToast.error(error?.message || error);
		}
	});

	const mSignout = useMutation({
		mutationFn: () => authService.signout(),
		onSuccess: (data) => {
			showToast.success(data?.data?.message);
		},
		onError: (error: any) => {
			showToast.error(error?.message || error);
		}
	});

	return {
		mSignin,
		mSignup,
		mSignout
	};
};

export default useAuthApi;
