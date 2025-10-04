import { useState } from 'react';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';

interface MenuItemProps {
	icon?: React.ReactNode;
	title: string;
	onClick: () => void;
	disabled?: boolean;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
}

interface MenuPopupProps {
	menuItems: MenuItemProps[];
	tooltipTitle?: string;
}

export const MenuPopup = ({ menuItems, tooltipTitle = 'Action' }: MenuPopupProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleMenuItemClick = (onClick: () => void) => {
		onClick();
		handleClose();
	};
	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
				<Tooltip title={tooltipTitle}>
					<IconButton id="basic-button" onClick={handleClick}>
						<MoreVertIcon />
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				slotProps={{
					paper: {
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1.5,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1
							},
							'&::before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: 'background.paper',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0
							}
						}
					}
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				{menuItems.map((item: MenuItemProps, index: number) => (
					<MenuItem
						key={index}
						onClick={() => handleMenuItemClick(item.onClick)}
						disabled={item.disabled}
						sx={{
							color: item.color ? `${item.color}.main` : 'inherit'
						}}
					>
						{item.icon && <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>{item.icon}</Box>}
						{item.title}
					</MenuItem>
				))}
			</Menu>
		</>
	);
};
