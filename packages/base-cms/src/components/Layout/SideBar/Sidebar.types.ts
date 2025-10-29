export interface SidebarItem {
	id: string;
	navlabel?: boolean;
	title: string;
	icon?: any;
	href?: string;
	subMenu?: SidebarItem[];
	/**
	 * Danh sách các roles được phép truy cập item này
	 * Nếu không có hoặc là mảng rỗng thì tất cả roles đều có thể truy cập
	 * @example ['admin', 'manager']
	 */
	roles?: string[];
}

/**
 * Cấu hình cho role-based access control
 * Cho phép tùy chỉnh key để extract role từ user object
 */
export interface RoleConfig {
	/**
	 * Key để lấy role từ user object
	 * @example 'role' | 'roles' | 'user_role'
	 * @default 'role'
	 */
	userRoleKey?: string | string[];

	/**
	 * Key để extract giá trị role từ object (nếu role là array of objects)
	 * @example 'ten_vai_tro' | 'role_name' | 'name'
	 * @default undefined (sẽ coi như role là string hoặc array of strings)
	 */
	roleValueKey?: string;
}

/**
 * Cấu hình mặc định cho role
 */
export const DEFAULT_ROLE_CONFIG: RoleConfig = {
	userRoleKey: ['role', 'roles'],
	roleValueKey: undefined
};
