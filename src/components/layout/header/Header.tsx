import CloseIcon from '@mui/icons-material/Close';
import MapIcon from '@mui/icons-material/Map';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReorderIcon from '@mui/icons-material/Reorder';
import VideocamIcon from '@mui/icons-material/Videocam';
import { Badge, Box, Button, IconButton, Stack, Tooltip, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

import ThemeToggle from '~/components/ui/ThemeToggle';
import { useDispatch, useSelector } from '~/store';
import { openDrawer } from '~/store/slices/menu';

import Profile from './Profile';

interface HeaderProps {
	navigationItems?: Array<{
		node: React.ReactNode;
	}>;
	logoUrl: string;
}

const Header = ({ navigationItems = [], logoUrl }: HeaderProps) => {
	const { drawerOpen } = useSelector((state) => state.menu);
	const dispatch = useDispatch();
	const theme = useTheme();

	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				right: 0,
				zIndex: 1200,
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
				pl: 2,
				pr: 1,
				backgroundColor: theme.palette.background.paper,
				boxShadow: theme.palette.mode === 'light' ? '0 0 10px 0 rgba(0, 0, 0, 0.1)' : '0 0 10px 0 rgba(0, 0, 0, 0.3)',
				height: '64px',
				borderBottom: `1px solid ${theme.palette.divider}`
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center' }} gap={1}>
				<Tooltip title="Menu">
					<IconButton color="inherit" aria-label="menu" onClick={() => dispatch(openDrawer(!drawerOpen))} size="small">
						{!drawerOpen ? <ReorderIcon /> : <CloseIcon />}
					</IconButton>
				</Tooltip>
				<Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
					<Link to="/">
						<img src={logoUrl} alt="logo" height={40} />
					</Link>
				</Box>
			</Box>

			<Stack spacing={1} direction="row" alignItems="center">
				{/* Render navigation buttons từ custom array */}
				{navigationItems.length > 0 &&
					navigationItems.map((item, index) => (
						<Box key={index} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
							{item.node}
						</Box>
					))}
				<ThemeToggle />
				<IconButton aria-label="show 11 new notifications" aria-controls="msgs-menu" aria-haspopup="true">
					<Badge variant="dot" color="primary">
						<NotificationsActiveIcon sx={{ fontSize: 21 }} />
					</Badge>
				</IconButton>
				<Profile />
			</Stack>
		</Box>
	);
};

export default Header;
