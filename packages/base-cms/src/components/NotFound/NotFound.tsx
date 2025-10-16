import { useEffect, useState } from 'react';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { Box, Button, Container, Paper, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
	const navigate = useNavigate();
	const theme = useTheme();
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
		<Box
			sx={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				overflow: 'hidden',
				background:
					theme.palette.mode === 'dark'
						? 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%)'
						: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background:
						theme.palette.mode === 'dark'
							? 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.2) 0%, transparent 50%)'
							: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%)',
					animation: mounted ? 'float 6s ease-in-out infinite' : 'none',
					'@keyframes float': {
						'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
						'50%': { transform: 'translateY(-20px) rotate(180deg)' }
					}
				}
			}}
		>
			<Container
				maxWidth="lg"
				sx={{
					position: 'relative',
					zIndex: 1,
					py: 4,
					touchAction: 'manipulation',
					WebkitOverflowScrolling: 'touch'
				}}
			>
				<Paper
					elevation={0}
					sx={{
						p: { xs: 4, md: 6 },
						borderRadius: 4,
						textAlign: 'center',
						maxWidth: 700,
						width: '100%',
						mx: 'auto',
						background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
						backdropFilter: 'blur(20px)',
						border: theme.palette.mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
						boxShadow:
							theme.palette.mode === 'dark'
								? '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
								: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
						animation: mounted ? 'slideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
						'@keyframes slideIn': {
							'0%': {
								opacity: 0,
								transform: 'translateY(50px) scale(0.8)'
							},
							'100%': {
								opacity: 1,
								transform: 'translateY(0) scale(1)'
							}
						},
						touchAction: 'manipulation'
					}}
				>
					{/* Icon 404 với hiệu ứng đặc biệt */}
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'center',
							mb: 4,
							position: 'relative',
							'&::before': {
								content: '""',
								position: 'absolute',
								top: '50%',
								left: '50%',
								transform: 'translate(-50%, -50%)',
								width: 200,
								height: 200,
								borderRadius: '50%',
								background:
									theme.palette.mode === 'dark'
										? 'radial-gradient(circle, rgba(255, 119, 198, 0.1) 0%, transparent 70%)'
										: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
								animation: mounted ? 'pulse 3s ease-in-out infinite' : 'none',
								'@keyframes pulse': {
									'0%, 100%': { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.5 },
									'50%': { transform: 'translate(-50%, -50%) scale(1.2)', opacity: 0.8 }
								}
							}
						}}
					>
						<SearchOffIcon
							sx={{
								fontSize: { xs: 100, md: 140 },
								color: theme.palette.mode === 'dark' ? 'error.light' : 'error.main',
								filter:
									theme.palette.mode === 'dark'
										? 'drop-shadow(0 0 20px rgba(244, 67, 54, 0.3))'
										: 'drop-shadow(0 4px 12px rgba(244, 67, 54, 0.2))',
								animation: mounted ? 'float 3s ease-in-out infinite' : 'none',
								'@keyframes float': {
									'0%, 100%': { transform: 'translateY(0px)' },
									'50%': { transform: 'translateY(-10px)' }
								}
							}}
						/>
					</Box>

					{/* Số 404 với gradient động */}
					<Typography
						variant="h1"
						sx={{
							fontSize: { xs: '5rem', md: '8rem' },
							fontWeight: 900,
							background:
								theme.palette.mode === 'dark'
									? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57)'
									: 'linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c)',
							backgroundSize: '300% 300%',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							mb: 2,
							textShadow: theme.palette.mode === 'dark' ? '0 0 30px rgba(255, 255, 255, 0.1)' : '0 2px 4px rgba(0,0,0,0.1)',
							animation: mounted ? 'gradientShift 4s ease-in-out infinite, glow 2s ease-in-out infinite alternate' : 'none',
							'@keyframes gradientShift': {
								'0%': { backgroundPosition: '0% 50%' },
								'50%': { backgroundPosition: '100% 50%' },
								'100%': { backgroundPosition: '0% 50%' }
							},
							'@keyframes glow': {
								'0%': { filter: 'brightness(1)' },
								'100%': { filter: 'brightness(1.2)' }
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
							fontSize: { xs: '1.75rem', md: '2.25rem' },
							animation: mounted ? 'fadeInUp 0.8s ease-out 0.2s both' : 'none',
							'@keyframes fadeInUp': {
								'0%': {
									opacity: 0,
									transform: 'translateY(20px)'
								},
								'100%': {
									opacity: 1,
									transform: 'translateY(0)'
								}
							}
						}}
					>
						Trang không tồn tại
					</Typography>

					{/* Mô tả */}
					<Typography
						variant="body1"
						sx={{
							color: 'text.secondary',
							mb: 5,
							fontSize: { xs: '1.1rem', md: '1.25rem' },
							lineHeight: 1.7,
							maxWidth: 500,
							mx: 'auto',
							animation: mounted ? 'fadeInUp 0.8s ease-out 0.4s both' : 'none'
						}}
					>
						Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
					</Typography>

					{/* Các nút hành động */}
					<Box
						sx={{
							display: 'flex',
							flexDirection: { xs: 'column', sm: 'row' },
							gap: 3,
							justifyContent: 'center',
							alignItems: 'center',
							width: '100%',
							animation: mounted ? 'fadeInUp 0.8s ease-out 0.6s both' : 'none'
						}}
					>
						<Button
							variant="contained"
							size="large"
							startIcon={<HomeIcon />}
							onClick={handleGoHome}
							sx={{
								background:
									theme.palette.mode === 'dark' ? 'linear-gradient(45deg, #667eea, #764ba2)' : 'linear-gradient(45deg, #667eea, #764ba2)',
								color: 'white',
								px: 5,
								py: 2,
								borderRadius: 4,
								fontWeight: 600,
								textTransform: 'none',
								fontSize: '1.1rem',
								boxShadow:
									theme.palette.mode === 'dark'
										? '0 8px 25px rgba(102, 126, 234, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
										: '0 8px 25px rgba(102, 126, 234, 0.3)',
								minWidth: { xs: '100%', sm: 180 },
								minHeight: 56,
								touchAction: 'manipulation',
								transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
								'&:hover': {
									transform: 'translateY(-2px)',
									boxShadow:
										theme.palette.mode === 'dark'
											? '0 12px 35px rgba(102, 126, 234, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.2)'
											: '0 12px 35px rgba(102, 126, 234, 0.4)'
								}
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
								borderColor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
								color: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
								px: 5,
								py: 2,
								borderRadius: 4,
								fontWeight: 600,
								textTransform: 'none',
								fontSize: '1.1rem',
								minWidth: { xs: '100%', sm: 180 },
								minHeight: 56,
								touchAction: 'manipulation',
								transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
								backdropFilter: 'blur(10px)',
								background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.8)',
								'&:hover': {
									transform: 'translateY(-2px)',
									background: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.9)',
									borderColor: theme.palette.mode === 'dark' ? 'primary.main' : 'primary.dark',
									boxShadow: theme.palette.mode === 'dark' ? '0 8px 25px rgba(0, 0, 0, 0.3)' : '0 8px 25px rgba(0, 0, 0, 0.1)'
								}
							}}
							aria-label="Quay lại trang trước"
						>
							Quay lại
						</Button>
					</Box>

					{/* Thông tin bổ sung */}
					<Box
						sx={{
							mt: 5,
							pt: 4,
							borderTop: `1px solid ${theme.palette.divider}`,
							animation: mounted ? 'fadeInUp 0.8s ease-out 0.8s both' : 'none'
						}}
					>
						<Typography
							variant="caption"
							sx={{
								color: 'text.disabled',
								display: 'block',
								mb: 1,
								fontSize: '0.875rem',
								fontWeight: 500
							}}
						>
							Mã lỗi: 404 - Not Found
						</Typography>
						<Typography
							variant="caption"
							sx={{
								color: 'text.disabled',
								fontSize: '0.875rem'
							}}
						>
							Nếu vấn đề vẫn tiếp tục, vui lòng liên hệ với đội ngũ hỗ trợ
						</Typography>
					</Box>
				</Paper>
			</Container>
		</Box>
	);
};
