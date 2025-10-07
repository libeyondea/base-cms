import { SidebarItem } from './Sidebar.types';

/**
 * Kiểm tra xem user có quyền truy cập vào sidebar item không
 * @param item - Sidebar item cần kiểm tra
 * @param userRole - Role của user hiện tại (có thể là string hoặc array)
 * @returns true nếu user có quyền truy cập
 */
export const hasAccessToItem = (item: SidebarItem, userRole?: string | string[]): boolean => {
	// Nếu item không có roles hoặc là mảng rỗng thì tất cả đều có thể truy cập
	if (!item.roles || item.roles.length === 0) {
		return true;
	}

	// Nếu không có user role thì không có quyền
	if (!userRole) {
		return false;
	}

	// Chuyển userRole thành mảng để xử lý dễ hơn
	const userRoles = Array.isArray(userRole) ? userRole : [userRole];

	// Kiểm tra xem có role nào của user nằm trong danh sách roles được phép không
	return item.roles.some((role) => userRoles.includes(role));
};

/**
 * Lọc sidebar items dựa trên role của user
 * @param items - Danh sách sidebar items
 * @param userRole - Role của user hiện tại
 * @returns Danh sách items đã được lọc
 */
export const filterSidebarByRole = (items: SidebarItem[], userRole?: string | string[]): SidebarItem[] => {
	return items
		.map((item) => {
			// Nếu là navlabel (nhóm chính), filter các submenu items
			if (item.navlabel && item.subMenu) {
				const filteredSubMenu = filterSidebarByRole(item.subMenu, userRole);
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
			if (!hasAccessToItem(item, userRole)) {
				return null;
			}

			// Nếu có submenu, filter recursively
			if (item.subMenu && item.subMenu.length > 0) {
				const filteredSubMenu = filterSidebarByRole(item.subMenu, userRole);
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
