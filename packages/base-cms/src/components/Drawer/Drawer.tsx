import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Divider, IconButton, Drawer as MuiDrawer, DrawerProps as MuiDrawerProps, Typography, useMediaQuery, useTheme } from '@mui/material';

export interface DrawerProps extends Omit<MuiDrawerProps, 'onClose'> {
	open: boolean;
	onClose: () => void;
	title?: string;
	showCloseButton?: boolean;
	width?: number | string;
	children: React.ReactNode;
}

export const Drawer = ({
	open,
	onClose,
	title,
	showCloseButton = true,
	width = 400,
	children,
	anchor = 'right',
	variant = 'temporary',
	...props
}: DrawerProps) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleClose = () => {
		onClose();
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape') {
			handleClose();
		}
	};

	return (
		<MuiDrawer
			open={open}
			onClose={handleClose}
			anchor={anchor}
			variant={isMobile ? 'temporary' : variant}
			sx={{
				'& .MuiDrawer-paper': {
					width: typeof width === 'number' ? `${width}px` : width,
					boxSizing: 'border-box'
				}
			}}
			{...props}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					height: '100%'
				}}
				onKeyDown={handleKeyDown}
				tabIndex={-1}
			>
				{/* Header */}
				{(title || showCloseButton) && (
					<>
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'space-between',
								p: 2,
								minHeight: 64
							}}
						>
							{title && (
								<Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
									{title}
								</Typography>
							)}
							{showCloseButton && (
								<IconButton onClick={handleClose} aria-label="Đóng drawer" size="small" sx={{ ml: 1 }}>
									<CloseIcon />
								</IconButton>
							)}
						</Box>
						<Divider />
					</>
				)}

				{/* Content */}
				<Box
					sx={{
						flexGrow: 1,
						overflow: 'auto',
						// p: title || showCloseButton ? 0 : 2
						p: 2
					}}
				>
					{children}
				</Box>
			</Box>
		</MuiDrawer>
	);
};
