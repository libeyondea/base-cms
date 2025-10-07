import { Box, Button, Paper, Typography } from '@mui/material';
import { Link as RouterLink, isRouteErrorResponse, useRouteError } from 'react-router-dom';

export const ErrorBoundaryView = () => {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<Box
				component={Paper}
				elevation={8}
				sx={{
					maxWidth: 400,
					mx: 'auto',
					my: 8,
					p: 4,
					textAlign: 'center',
					borderRadius: 3,
					background: 'rgba(255,255,255,0.95)',
					backdropFilter: 'blur(6px)'
				}}
			>
				<Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
					Lỗi {error.status}
				</Typography>
				<Typography color="text.secondary" sx={{ mb: 2 }}>
					{error.statusText}
				</Typography>
				<Button variant="contained" color="primary" component={RouterLink} to="/" aria-label="Về trang chủ" tabIndex={0}>
					Về trang chủ
				</Button>
			</Box>
		);
	}

	return (
		<Box
			component={Paper}
			elevation={8}
			sx={{
				maxWidth: 400,
				mx: 'auto',
				my: 8,
				p: 4,
				textAlign: 'center',
				borderRadius: 3,
				background: 'rgba(255,255,255,0.95)',
				backdropFilter: 'blur(6px)'
			}}
		>
			<Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
				Đã xảy ra lỗi
			</Typography>
			<Typography color="text.secondary" sx={{ mb: 2 }}>
				Vui lòng thử lại sau.
			</Typography>
			<Button variant="contained" color="primary" component={RouterLink} to="/" aria-label="Về trang chủ" tabIndex={0}>
				Về trang chủ
			</Button>
		</Box>
	);
};

export default ErrorBoundaryView;
