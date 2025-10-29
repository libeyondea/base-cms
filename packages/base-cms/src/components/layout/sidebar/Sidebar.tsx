import { Divider, Drawer, useMediaQuery, useTheme } from '@mui/material';

import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';
import { useSidebar } from '~/contexts/AppProvider';

import { SidebarItem } from './Sidebar.types';
import { SidebarItems } from './SidebarItems';
import { Logo } from './components/Logo';
import { Sidebar as SidebarComponent } from './components/Sidebar';

interface MSidebarProps {
	items: SidebarItem[];
	logoUrl: string;
	logoWidth?: string | number;
	logoHeight?: string | number;
	/**
	 * Cấu hình để extract role từ user object
	 * Cho phép tùy chỉnh key và cấu trúc role cho các dự án khác nhau
	 */
	roleConfig?: RoleConfig;
}

export const Sidebar = ({ items, logoUrl, logoWidth, logoHeight, roleConfig }: MSidebarProps) => {
	const theme = useTheme();
	const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
	const { drawerOpen, toggleDrawer } = useSidebar();

	if (lgUp) {
		return (
			<Drawer
				open={drawerOpen}
				onClose={toggleDrawer}
				sx={{
					flexShrink: 0
				}}
			>
				<SidebarComponent width="100%" showProfile={false} isCollapse={false} mode={theme.palette.mode}>
					<Logo href="/" img={logoUrl} width={logoWidth} height={logoHeight} />
					<Divider />
					<SidebarItems items={items} roleConfig={roleConfig} />
				</SidebarComponent>
			</Drawer>
		);
	}

	return (
		<Drawer open={drawerOpen} onClose={toggleDrawer} sx={{ flexShrink: 0 }}>
			<SidebarComponent width="100%" showProfile={false} isCollapse={false} mode={theme.palette.mode}>
				<Logo href="/" img={logoUrl} width={logoWidth} height={logoHeight} />
				<SidebarItems items={items} roleConfig={roleConfig} />
			</SidebarComponent>
		</Drawer>
	);
};
