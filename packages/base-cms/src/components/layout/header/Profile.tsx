import { useState } from 'react';

import PersonIcon from '@mui/icons-material/Person';
import { Avatar, Box, Button, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack } from '@mui/material';

import { useAuth } from '~/contexts/AppProvider';
import { removeCookie } from '~/utils/cookie';

export interface AdditionalMenuItem {
	label: string;
	icon?: React.ReactNode;
	onClick: () => void;
	disabled?: boolean;
}

interface ProfileProps {
	additionalMenuItems?: AdditionalMenuItem[];
}

export const Profile = ({ additionalMenuItems = [] }: ProfileProps) => {
	const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
	const { user, signout } = useAuth();

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		try {
			removeCookie('service_token');
			signout();
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<Box>
			<IconButton size="large" aria-label="profile" color="inherit" aria-controls="msgs-menu" aria-haspopup="true" onClick={handleClick}>
				<Avatar
					sx={{
						width: 30,
						height: 30
					}}
				/>
			</IconButton>
			<Menu
				id="msgs-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				sx={{
					'& .MuiMenu-paper': {
						width: '200px'
					}
				}}
			>
				<MenuItem>
					<Stack spacing={0.5}>
						<ListItemText primary={user?.fullname} />
						<ListItemText primary={user?.email} sx={{ fontSize: 11, color: 'text.secondary' }} />
					</Stack>
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<PersonIcon sx={{ fontSize: 20 }} />
					</ListItemIcon>
					<ListItemText>Cá nhân</ListItemText>
				</MenuItem>
				{additionalMenuItems.map((item, index) => (
					<MenuItem key={index} onClick={item.onClick} disabled={item.disabled}>
						{item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
						<ListItemText>{item.label}</ListItemText>
					</MenuItem>
				))}
				<Divider />
				<Box mt={1} py={1} px={2}>
					<Button variant="outlined" color="primary" fullWidth onClick={handleLogout}>
						Đăng xuất
					</Button>
				</Box>
			</Menu>
		</Box>
	);
};
