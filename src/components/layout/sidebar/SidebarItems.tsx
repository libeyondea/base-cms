import { Link } from '@mui/material';
import { useLocation } from 'react-router-dom';

import { Menu } from '~/components/layout/sidebar/components/Menu';
import { MenuItem } from '~/components/layout/sidebar/components/MenuItem';
import { Submenu } from '~/components/layout/sidebar/components/Submenu';

import Menuitems from './MenuItems';

const SidebarItems = () => {
	const location = useLocation();
	const pathDirect = location.pathname;

	// Hàm render menu items từ mảng Menuitems
	const renderMenuItems = (items: any[]) => {
		return items.map((item: any) => {
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
	const renderSubMenuItems = (subItems: any[]) => {
		return subItems.map((subItem: any) => {
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

	return renderMenuItems(Menuitems);
};

export default SidebarItems;
