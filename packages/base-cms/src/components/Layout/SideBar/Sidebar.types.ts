export interface SidebarItem {
	id: string;
	navlabel?: boolean;
	title: string;
	icon?: any;
	href?: string;
	subMenu?: SidebarItem[];
}
