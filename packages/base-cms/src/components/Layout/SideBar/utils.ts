import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';

import { SidebarItem } from './Sidebar.types';

/**
 * Extract roles từ user object với cấu hình linh hoạt
 * Hỗ trợ nhiều cấu trúc dữ liệu:
 * - role: 'admin' (single string)
 * - roles: ['admin', 'user'] (array of strings)
 * - roles: [{ten_vai_tro: 'admin'}, {ten_vai_tro: 'user'}] (array of objects)
 *
 * @param user - User object
 * @param roleConfig - Cấu hình để extract role
 * @returns Mảng các roles của user
 */
export const extractUserRoles = (user: any, roleConfig?: RoleConfig): string[] => {
	if (!user) return [];

	const userRoleKeys = Array.isArray(roleConfig?.userRoleKey) ? roleConfig.userRoleKey : [roleConfig?.userRoleKey || 'role', 'roles'];

	const roleValueKey = roleConfig?.roleValueKey;

	// Thử tất cả các keys có thể
	for (const key of userRoleKeys) {
		const value = user[key];

		if (!value) continue;

		// Trường hợp 1: role là string đơn
		if (typeof value === 'string') {
			return [value];
		}

		// Trường hợp 2: roles là array
		if (Array.isArray(value)) {
			// Nếu array rỗng
			if (value.length === 0) continue;

			// Nếu có roleValueKey, extract từ object
			if (roleValueKey) {
				return value
					.map((item) => {
						if (typeof item === 'object' && item !== null) {
							return item[roleValueKey];
						}
						return item;
					})
					.filter((role): role is string => typeof role === 'string' && role.length > 0);
			}

			// Nếu không có roleValueKey, coi như array of strings
			return value.filter((role): role is string => typeof role === 'string');
		}
	}

	return [];
};

/**
 * Kiểm tra xem user có quyền truy cập vào sidebar item không
 * @param item - Sidebar item cần kiểm tra
 * @param userRoles - Mảng roles của user hiện tại
 * @returns true nếu user có quyền truy cập
 */
export const hasAccessToItem = (item: SidebarItem, userRoles: string[]): boolean => {
	// Nếu item không có roles hoặc là mảng rỗng thì tất cả đều có thể truy cập
	if (!item.roles || item.roles.length === 0) {
		return true;
	}

	// Nếu không có user roles thì không có quyền
	if (!userRoles || userRoles.length === 0) {
		return false;
	}

	// Kiểm tra xem có role nào của user nằm trong danh sách roles được phép không
	return item.roles.some((role) => userRoles.includes(role));
};

/**
 * Lọc sidebar items dựa trên role của user
 * @param items - Danh sách sidebar items
 * @param userRoles - Mảng roles của user hiện tại
 * @returns Danh sách items đã được lọc
 */
export const filterSidebarByRole = (items: SidebarItem[], userRoles: string[]): SidebarItem[] => {
	return items
		.map((item) => {
			// Nếu là navlabel (nhóm chính), filter các submenu items
			if (item.navlabel && item.subMenu) {
				const filteredSubMenu = filterSidebarByRole(item.subMenu, userRoles);
				// Chỉ giữ lại navlabel nếu có ít nhất 1 submenu item sau khi filter
				if (filteredSubMenu.length > 0) {
					return {
						...item,
						subMenu: filteredSubMenu
					};
				}
				return null;
			}

			// Kiểm tra quyền truy cập của item
			if (!hasAccessToItem(item, userRoles)) {
				return null;
			}

			// Nếu có submenu, filter recursively
			if (item.subMenu && item.subMenu.length > 0) {
				const filteredSubMenu = filterSidebarByRole(item.subMenu, userRoles);
				// Chỉ giữ item nếu có ít nhất 1 submenu sau khi filter
				if (filteredSubMenu.length > 0) {
					return {
						...item,
						subMenu: filteredSubMenu
					};
				}
				// Nếu submenu rỗng sau khi filter thì không hiển thị item này
				return null;
			}

			return item;
		})
		.filter((item): item is SidebarItem => item !== null);
};
