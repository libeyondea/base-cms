import { useMemo } from 'react';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';

import { AccessControl } from './guards';
import { RoutesConfig } from './types';
import { generateRoutes } from './utils';

export interface RoutesProps {
	/**
	 * Custom routes configuration
	 */
	config: RoutesConfig;
	/**
	 * Router basename
	 */
	basename?: string;
	/**
	 * Profile API
	 */
	profileAPI?: string;
	/**
	 * Custom redirect path for private routes when user is not authenticated
	 * Default: '/signin'
	 */
	redirectPrivateTo?: string;
	/**
	 * Custom redirect path for auth routes when user is already authenticated
	 * Default: '/'
	 */
	redirectAuthTo?: string;
	/**
	 * Key data for profile API
	 * Default: 'data'
	 */
	keyDataProfile?: string;
	/**
	 * Cấu hình để extract role từ user object
	 * Cho phép tùy chỉnh key và cấu trúc role cho các dự án khác nhau
	 * @deprecated Sử dụng config.roleConfig thay vì prop này
	 */
	roleConfig?: RoleConfig;
}

export const Routes = ({ config, basename, profileAPI, redirectPrivateTo, redirectAuthTo, keyDataProfile, roleConfig }: RoutesProps) => {
	const router = useMemo(() => {
		// Merge roleConfig từ prop hoặc từ config (ưu tiên config.roleConfig)
		const finalConfig = {
			...config,
			roleConfig: config.roleConfig || roleConfig
		};

		const routes = generateRoutes(finalConfig, { redirectPrivateTo, redirectAuthTo });
		return createBrowserRouter(routes, { basename });
	}, [config, basename, redirectPrivateTo, redirectAuthTo, roleConfig]);

	return (
		<AccessControl profileAPI={profileAPI} keyDataProfile={keyDataProfile}>
			<RouterProvider router={router} />
		</AccessControl>
	);
};

export * from './types';
export * from './utils';
export * from './guards';
