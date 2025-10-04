import { Divider, Drawer, useMediaQuery, useTheme } from '@mui/material';

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
}

export const Sidebar = ({ items, logoUrl, logoWidth, logoHeight }: MSidebarProps) => {
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
					<SidebarItems items={items} />
				</SidebarComponent>
			</Drawer>
		);
	}

	return (
		<Drawer open={drawerOpen} onClose={toggleDrawer} sx={{ flexShrink: 0 }}>
			<SidebarComponent width="100%" showProfile={false} isCollapse={false} mode={theme.palette.mode}>
				<Logo href="/" img={logoUrl} width={logoWidth} height={logoHeight} />
				<SidebarItems items={items} />
			</SidebarComponent>
		</Drawer>
	);
};
