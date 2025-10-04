import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { Header } from '~/components/Layout/Header/Header';
import { Sidebar } from '~/components/Layout/SideBar/Sidebar';

import Menuitems from './MenuItems';

const PrivateLayout = () => {
	const theme = useTheme();

	return (
		<Box sx={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header logoUrl="/images/logo.png" />

			<Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
				<Sidebar items={Menuitems} logoUrl="/images/logo.png" />
				<Box sx={{ width: '100%', flex: 1 }}>
					<Box sx={{ minHeight: 'calc(100vh - 64px)' }} p={2}>
						<Outlet />
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default PrivateLayout;
