import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Container, Grid, IconButton, InputAdornment, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { FormProvider } from '~/components/Form/FormProvider';
import { RHFTextField } from '~/components/Form/RHFTextField';
import { PageContainer } from '~/components/PageContainer';
import { useAuth } from '~/contexts/AppProvider';
import useAuthApi from '~/hooks/api/useAuthApi';
import { REQUIRED_MESSAGE } from '~/utils/constant';
import { setCookie } from '~/utils/cookie';

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const { signin } = useAuth();

	const { mSignin } = useAuthApi();

	const defaultValues = {
		email: '',
		password: ''
	};

	const schema = yup.object({
		email: yup.string().email('Email không hợp lệ').required(REQUIRED_MESSAGE),
		password: yup.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự').required(REQUIRED_MESSAGE)
	});

	type FormData = yup.InferType<typeof schema>;

	const methods = useForm<FormData>({
		defaultValues,
		resolver: yupResolver(schema),
		mode: 'all'
	});

	const onSubmit = async (values: FormData) => {
		try {
			const payload = {
				...values
			};

			const response = await mSignin.mutateAsync(payload);

			if (response?.data?.success) {
				setCookie('service_token', response?.data?.access_token, { expires: 365 });
				signin({
					user: response?.data?.data,
					token: response?.data?.access_token
				});
			}
		} catch (error: any) {
			console.log('error', error);
		}
	};

	const handleTogglePassword = () => {
		setShowPassword(!showPassword);
	};

	return (
		<PageContainer title="Đăng nhập" description="Đăng nhập vào hệ thống">
			<Container maxWidth="sm">
				<Box
					sx={{
						minHeight: '100vh',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						padding: 2
					}}
				>
					<Card
						elevation={3}
						sx={{
							width: '100%',
							maxWidth: 400
						}}
					>
						<CardContent sx={{ padding: 4 }}>
							<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
								<Typography component="h1" variant="h4" gutterBottom>
									Đăng nhập
								</Typography>

								<Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
									Vui lòng nhập thông tin đăng nhập của bạn
								</Typography>

								<FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
									<Grid container spacing={2}>
										<Grid size={12}>
											<RHFTextField
												name="email"
												label="Email"
												autoComplete="email"
												autoFocus
												slotProps={{
													input: {
														startAdornment: (
															<InputAdornment position="start">
																<Email color="action" />
															</InputAdornment>
														)
													}
												}}
											/>
										</Grid>
										<Grid size={12}>
											<RHFTextField
												name="password"
												label="Mật khẩu"
												type={showPassword ? 'text' : 'password'}
												autoComplete="current-password"
												slotProps={{
													input: {
														startAdornment: (
															<InputAdornment position="start">
																<Lock color="action" />
															</InputAdornment>
														),
														endAdornment: (
															<InputAdornment position="end">
																<IconButton aria-label="toggle password visibility" onClick={handleTogglePassword} edge="end">
																	{showPassword ? <VisibilityOff /> : <Visibility />}
																</IconButton>
															</InputAdornment>
														)
													}
												}}
											/>
										</Grid>
									</Grid>

									<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5 }} loading={mSignin.isPending}>
										Đăng nhập
									</Button>

									<Box sx={{ textAlign: 'center' }}>
										<Typography variant="body2" color="text.secondary">
											Chưa có tài khoản?{' '}
											<Typography
												component="span"
												variant="body2"
												color="primary"
												sx={{ cursor: 'pointer', textDecoration: 'underline' }}
											>
												Đăng ký ngay
											</Typography>
										</Typography>
									</Box>
								</FormProvider>
							</Box>
						</CardContent>
					</Card>
				</Box>
			</Container>
		</PageContainer>
	);
};

export default SignIn;
