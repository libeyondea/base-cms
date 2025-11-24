import { SxProps, TooltipProps } from '@mui/material';

export interface MenuItemProps {
	icon?: React.ReactNode;
	title: string;
	onClick: () => void;
	disabled?: boolean;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	sx?: SxProps;
}

export interface MenuPopupProps {
	menuItems: MenuItemProps[];
	tooltipTitle?: string;
	customIcon?: React.ReactNode;
	customSize?: 'small' | 'medium' | 'large';
	customSx?: SxProps;
	customTooltipProps?: Omit<TooltipProps, 'title' | 'children'>;
}
