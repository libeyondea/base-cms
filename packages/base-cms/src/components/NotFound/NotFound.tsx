import { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	const handleGoHome = () => {
		navigate('/');
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	if (!mounted) {
		return null;
	}

	return (
		<Container
			maxWidth="lg"
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				py: 4,
				touchAction: 'manipulation',
				WebkitOverflowScrolling: 'touch'
			}}
		>
			<Paper
				elevation={24}
				sx={{
					p: { xs: 4, md: 6 },
					borderRadius: 4,
					textAlign: 'center',
					maxWidth: 700,
					width: '100%',
					background: 'rgba(255, 255, 255, 0.95)',
					backdropFilter: 'blur(10px)',
					border: '1px solid rgba(255, 255, 255, 0.2)',
					animation: mounted ? 'slideIn 0.6s ease-out' : 'none',
					'@keyframes slideIn': {
						'0%': {
							opacity: 0,
							transform: 'translateY(30px) scale(0.9)'
						},
						'100%': {
							opacity: 1,
							transform: 'translateY(0) scale(1)'
						}
					},
					touchAction: 'manipulation'
				}}
			>
				{/* Icon 404 */}
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						mb: 3,
						animation: mounted ? 'bounce 2s infinite' : 'none',
						'@keyframes bounce': {
							'0%, 20%, 50%, 80%, 100%': {
								transform: 'translateY(0)'
							},
							'40%': {
								transform: 'translateY(-10px)'
							},
							'60%': {
								transform: 'translateY(-5px)'
							}
						}
					}}
				>
					<ErrorOutlineIcon
						sx={{
							fontSize: { xs: 80, md: 120 },
							color: 'error.main',
							filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
						}}
					/>
				</Box>

				{/* Số 404 */}
				<Typography
					variant="h1"
					sx={{
						fontSize: { xs: '4rem', md: '6rem' },
						fontWeight: 900,
						background: 'linear-gradient(45deg, #667eea, #764ba2)',
						backgroundClip: 'text',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						mb: 2,
						textShadow: '0 2px 4px rgba(0,0,0,0.1)',
						animation: mounted ? 'pulse 2s infinite' : 'none',
						'@keyframes pulse': {
							'0%': {
								transform: 'scale(1)'
							},
							'50%': {
								transform: 'scale(1.05)'
							},
							'100%': {
								transform: 'scale(1)'
							}
						}
					}}
				>
					404
				</Typography>

				{/* Tiêu đề */}
				<Typography
					variant="h4"
					sx={{
						fontWeight: 600,
						color: 'text.primary',
						mb: 2,
						fontSize: { xs: '1.5rem', md: '2rem' }
					}}
				>
					Trang không tồn tại
				</Typography>

				{/* Mô tả */}
				<Typography
					variant="body1"
					sx={{
						color: 'text.secondary',
						mb: 4,
						fontSize: { xs: '1rem', md: '1.1rem' },
						lineHeight: 1.6,
						maxWidth: 500,
						mx: 'auto'
					}}
				>
					Xin lỗi, trang không tồn tại. Vui lòng quay về trang chủ.
				</Typography>

				{/* Các nút hành động */}
				<Box
					sx={{
						display: 'flex',
						flexDirection: { xs: 'column', sm: 'row' },
						gap: 3,
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%'
					}}
				>
					<Button
						variant="contained"
						size="large"
						startIcon={<HomeIcon />}
						onClick={handleGoHome}
						sx={{
							background: 'linear-gradient(45deg, #667eea, #764ba2)',
							color: 'white',
							px: 4,
							py: 1.5,
							borderRadius: 3,
							fontWeight: 600,
							textTransform: 'none',
							fontSize: '1rem',
							boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
							minWidth: { xs: '100%', sm: 'auto' },
							minHeight: 48,
							touchAction: 'manipulation'
						}}
						aria-label="Quay về trang chủ"
					>
						Trang chủ
					</Button>

					<Button
						variant="outlined"
						size="large"
						startIcon={<ArrowBackIcon />}
						onClick={handleGoBack}
						sx={{
							borderColor: 'primary.main',
							color: 'primary.main',
							px: 4,
							py: 1.5,
							borderRadius: 3,
							fontWeight: 600,
							textTransform: 'none',
							fontSize: '1rem',
							minWidth: { xs: '100%', sm: 'auto' },
							minHeight: 48,
							touchAction: 'manipulation'
						}}
						aria-label="Quay lại trang trước"
					>
						Quay lại
					</Button>
				</Box>

				{/* Thông tin bổ sung */}
				<Box
					sx={{
						mt: 4,
						pt: 3,
						borderTop: '1px solid',
						borderColor: 'divider'
					}}
				>
					<Typography
						variant="caption"
						sx={{
							color: 'text.disabled',
							display: 'block',
							mb: 1
						}}
					>
						Mã lỗi: 404 - Not Found
					</Typography>
					<Typography
						variant="caption"
						sx={{
							color: 'text.disabled'
						}}
					>
						Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với đội ngũ hỗ trợ
					</Typography>
				</Box>
			</Paper>
		</Container>
	);
};
