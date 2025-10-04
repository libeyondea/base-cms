import CloseIcon from '@mui/icons-material/Close';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Badge, Box, IconButton, Stack, Tooltip, useTheme } from '@mui/material';

import { useSidebar } from '~/contexts/AppProvider';

import { Logo } from '../SideBar/components/Logo';
import { Profile } from './Profile';
import { ThemeToggle } from './ThemeToggle';

interface HeaderProps {
	navigationItems?: Array<{
		node: React.ReactNode;
	}>;
	logoUrl: string;
}

export const Header = ({ navigationItems = [], logoUrl }: HeaderProps) => {
	const { drawerOpen, toggleDrawer } = useSidebar();
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
					<IconButton color="inherit" aria-label="menu" onClick={toggleDrawer} size="small">
						{!drawerOpen ? <ReorderIcon /> : <CloseIcon />}
					</IconButton>
				</Tooltip>
				<Logo img={logoUrl} />
			</Box>

			<Stack spacing={1} direction="row" alignItems="center">
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
