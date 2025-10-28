export interface MenuItemProps {
	icon?: React.ReactNode;
	title: string;
	onClick: () => void;
	disabled?: boolean;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

export interface MenuPopupProps {
	menuItems: MenuItemProps[];
	tooltipTitle?: string;
	customIcon?: React.ReactNode;
}
