import { Link } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Menu } from '~/components/layout/sidebar/components/Menu';
import { MenuItem } from '~/components/layout/sidebar/components/MenuItem';
import { Submenu } from '~/components/layout/sidebar/components/Submenu';

import { SidebarItem } from './MenuItems';

const SidebarItems = ({ items }: { items: SidebarItem[] }) => {
	const location = useLocation();
	const pathDirect = location.pathname;

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

	return renderMenuItems(items);
};

export default SidebarItems;
