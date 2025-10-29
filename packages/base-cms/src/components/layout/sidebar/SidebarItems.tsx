import { Link } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';
import { useAuth } from '~/contexts/AppProvider';

import { SidebarItem } from './Sidebar.types';
import { Menu } from './components/Menu';
import { MenuItem } from './components/MenuItem';
import { Submenu } from './components/Submenu';
import { extractUserRoles, filterSidebarByRole } from './utils';

export interface SidebarItemsProps {
	items: SidebarItem[];
	/**
	 * Cấu hình để extract role từ user object
	 * Cho phép tùy chỉnh key và cấu trúc role cho các dự án khác nhau
	 */
	roleConfig?: RoleConfig;
}

export const SidebarItems = ({ items, roleConfig }: SidebarItemsProps) => {
	const location = useLocation();
	const pathDirect = location.pathname;
	const { user } = useAuth();

	// Extract roles từ user với cấu hình linh hoạt
	const userRoles = extractUserRoles(user, roleConfig);

	// Lọc sidebar items dựa trên role của user
	const filteredItems = filterSidebarByRole(items, userRoles);

	// Hàm render menu items từ mảng Menuitems
	const renderMenuItems = (items: SidebarItem[]) => {
		return items.map((item: SidebarItem) => {
			// Nếu là navlabel (nhóm chính)
			if (item.navlabel) {
				return (
					<Menu key={item.id} subHeading={item.title}>
						{item.subMenu && renderSubMenuItems(item.subMenu)}
					</Menu>
				);
			}
			return null;
		});
	};

	// Hàm render sub menu items
	const renderSubMenuItems = (subItems: SidebarItem[]) => {
		return subItems.map((subItem: SidebarItem) => {
			// Nếu có subMenu (menu lồng nhau) - luôn tạo Submenu
			if (subItem.subMenu && subItem.subMenu.length > 0) {
				return (
					<Submenu key={subItem.id} icon={subItem.icon ? <subItem.icon /> : undefined} title={subItem.title}>
						{renderSubMenuItems(subItem.subMenu)}
					</Submenu>
				);
			}

			// Menu item thường
			return (
				<MenuItem
					key={subItem.id}
					icon={subItem.icon ? <subItem.icon /> : undefined}
					component={Link}
					link={subItem.href}
					isSelected={pathDirect === subItem.href}
				>
					{subItem.title}
				</MenuItem>
			);
		});
	};

	return renderMenuItems(filteredItems);
};
