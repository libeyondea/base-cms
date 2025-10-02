import { Divider, Drawer, useMediaQuery, useTheme } from '@mui/material';

import { Logo } from '~/components/layout/sidebar/components/Logo';
import { Sidebar } from '~/components/layout/sidebar/components/Sidebar';
import { useDispatch, useSelector } from '~/store';
import { openDrawer } from '~/store/slices/menu';

import SidebarItems from './SidebarItems';

const MSidebar = () => {
	const theme = useTheme();
	const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
	const { drawerOpen } = useSelector((state) => state.menu);
	const dispatch = useDispatch();

	if (lgUp) {
		return (
			<Drawer
				open={drawerOpen}
				onClose={() => dispatch(openDrawer(!drawerOpen))}
				sx={{
					flexShrink: 0
				}}
			>
				<Sidebar width="100%" showProfile={false} isCollapse={false} mode={theme.palette.mode}>
					<Logo href="/" img="/images/logo.png" />
					<Divider />
					<SidebarItems />
				</Sidebar>
			</Drawer>
		);
	}

	return (
		<Drawer open={drawerOpen} onClose={() => dispatch(openDrawer(!drawerOpen))} sx={{ flexShrink: 0 }}>
			<Sidebar width="100%" showProfile={false} isCollapse={false} mode={theme.palette.mode}>
				<Logo href="/" img="/images/logo.png" />
				<SidebarItems />
			</Sidebar>
		</Drawer>
	);
};

export default MSidebar;
