import { forwardRef, memo, useCallback, useMemo } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, useTheme } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { Breakpoint, SxProps } from '@mui/system';

interface CommonModalProps {
	open: boolean;
	handleClose: () => void;
	title?: string;
	children: React.ReactNode;

	// Form props
	idForm?: string;
	isHandleSubmit?: boolean;

	// Size props
	maxWidtSize?: false | Breakpoint;
	fullScreen?: boolean;
	minHeight?: string | number;

	// Action props
	hiddenAction?: boolean;

	// Primary button (submit)
	titleButton?: string;
	typeButton?: Record<string, any>;
	onClickButton?: () => void;
	isShowButton?: boolean;

	// Styling
	customStyle?: {
		root?: SxProps;
		title?: SxProps;
		content?: SxProps;
	};
}

// Tối ưu Transition component với forwardRef
const SlideTransition = forwardRef<unknown, TransitionProps & { children: React.ReactElement }>((props, ref) => (
	<Slide direction="down" ref={ref} {...props} />
));

export const CommonModal = ({
	open,
	handleClose,
	title,
	children,

	// Form props
	idForm,
	isHandleSubmit = true,

	// Size props
	maxWidtSize = 'lg',
	fullScreen = false,
	minHeight = 'auto',

	// Action props
	hiddenAction = false,

	// Primary button
	titleButton = 'Lưu',
	typeButton,
	onClickButton,
	isShowButton = false,

	// Styling
	customStyle = {}
}: CommonModalProps) => {
	const theme = useTheme();

	// Tối ưu callback functions
	const handleCloseDialog = useCallback(
		(event: {}, reason: 'backdropClick' | 'escapeKeyDown') => {
			if (reason === 'escapeKeyDown') {
				handleClose();
			}
		},
		[handleClose]
	);

	const handleCloseX = useCallback(() => {
		handleClose();
	}, [handleClose]);

	// Tối ưu styles với useMemo
	const dialogStyles = useMemo(
		() => ({
			'& .MuiDialog-paper': {
				borderRadius: 2,
				boxShadow: theme.shadows[10]
			},
			...(customStyle.root || {})
		}),
		[theme.shadows, customStyle.root]
	);

	const titleStyles = useMemo(
		() => ({
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			minHeight: 70,
			borderBottom: '1px solid rgba(0,0,0,0.08)',
			px: 3,
			py: 2,
			...customStyle.title
		}),
		[customStyle.title]
	);

	const contentStyles = useMemo(
		() => ({
			minHeight: minHeight,
			p: 0,
			...customStyle.content
		}),
		[minHeight, customStyle.content]
	);

	// Tối ưu render buttons
	const renderHeaderButton = useMemo(() => {
		if (!isShowButton) return null;

		return (
			<Button variant="contained" size="large" onClick={onClickButton} type="button" sx={{ mr: 1 }}>
				{titleButton}
			</Button>
		);
	}, [isShowButton, onClickButton, titleButton]);

	const renderActionButtons = useMemo(() => {
		if (hiddenAction) return null;

		return (
			<DialogActions sx={{ px: 3, py: 2, borderTop: '1px dashed rgba(0,0,0,0.08)' }}>
				<Box display="flex" gap={1} ml="auto">
					<Button
						sx={{ px: 4 }}
						variant="contained"
						form={idForm}
						startIcon={<SaveIcon />}
						type={isHandleSubmit ? 'submit' : 'button'}
						{...typeButton}
					>
						{titleButton}
					</Button>
				</Box>
			</DialogActions>
		);
	}, [hiddenAction, idForm, isHandleSubmit, typeButton, titleButton]);

	return (
		<Dialog
			open={open}
			onClose={handleCloseDialog}
			disableEnforceFocus={false} // đảm bảo focus bị giới hạn trong dialog
			disableRestoreFocus={false} // khôi phục focus khi đóng
			aria-labelledby={title ? 'dialog-title' : undefined}
			aria-describedby="dialog-description"
			fullWidth
			scroll={fullScreen ? 'paper' : 'body'}
			maxWidth={maxWidtSize}
			fullScreen={fullScreen}
			slots={{
				transition: SlideTransition
			}}
			slotProps={{
				transition: {
					timeout: 400
				}
			}}
			sx={dialogStyles}
		>
			{title && (
				<DialogTitle id="dialog-title" sx={titleStyles}>
					<DialogContentText variant="h5" component="span" sx={{ letterSpacing: 1, fontWeight: 500 }}>
						{title}
					</DialogContentText>
					<Box display="flex" alignItems="center" gap={1}>
						{renderHeaderButton}
						<IconButton
							onClick={handleCloseX}
							aria-label="đóng dialog"
							sx={{
								bgcolor: 'rgba(0,0,0,0.04)',
								'&:hover': {
									bgcolor: 'rgba(0,0,0,0.08)'
								}
							}}
						>
							<CloseIcon />
						</IconButton>
					</Box>
				</DialogTitle>
			)}

			<DialogContent sx={contentStyles}>
				<Box
					width="100%"
					minHeight={minHeight}
					sx={{
						overflowY: 'auto',
						px: 3,
						py: 2
					}}
				>
					{children}
				</Box>
			</DialogContent>

			{renderActionButtons}
		</Dialog>
	);
};
