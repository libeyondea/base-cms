import { showToast } from '@libeyondea/base-cms';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { UserService } from '~/service/userService';
import { FilterObject, IApi } from '~/types/hook';

const userService = new UserService();

interface FilterApi {
	id?: number;
	filter?: FilterObject;
}

const useUserApi = ({ id, filter }: IApi & FilterApi) => {
	const queryClient = useQueryClient();

	const qGetAllUser = useQuery({
		queryKey: [`qGetAllUser`, filter],
		queryFn: () => userService.getAllUser(filter),
		enabled: Boolean(filter)
	});

	const qGetDetailUser = useQuery({
		queryKey: [`qGetDetailUser`, id],
		queryFn: () => userService.getDetailUser(id),
		enabled: Boolean(id)
	});

	const mCreateUser = useMutation({
		mutationFn: (payload: any) => userService.createUser(payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [`qGetAllUser`] });
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

	const mUpdateUser = useMutation({
		mutationFn: (payload: any) => userService.updateUser(payload),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [`qGetAllUser`] });
			queryClient.invalidateQueries({ queryKey: [`qGetDetailUser`] });
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

	const mDeleteUser = useMutation({
		mutationFn: (id: number) => userService.deleteUser(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: [`qGetAllUser`] });
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

	return {
		qGetAllUser,
		qGetDetailUser,
		mCreateUser,
		mUpdateUser,
		mDeleteUser
	};
};

export default useUserApi;
