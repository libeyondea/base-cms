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
