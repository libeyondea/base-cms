import { Header, Sidebar, useTheme } from '@libeyondea/base-cms';
import PersonIcon from '@mui/icons-material/Person';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { roleConfig } from '~/config/roleConfig';

import Menuitems from './MenuItems';

const PrivateLayout = () => {
	const { theme } = useTheme();

	return (
		<Box sx={{ backgroundColor: theme.palette.background.paper, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
			<Header logoUrl="/images/logo.png" additionalMenuItems={[{ label: 'Test', icon: <PersonIcon />, onClick: () => {} }]} />

			<Box sx={{ display: 'flex', flex: 1, marginTop: '64px' }}>
				<Sidebar items={Menuitems} logoUrl="/images/logo.png" roleConfig={roleConfig} />
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
