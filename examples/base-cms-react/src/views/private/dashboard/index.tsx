import { useMemo, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import {
	FormProvider,
	MainCard,
	NAutocomplete,
	PageContainer,
	REQUIRED_MESSAGE,
	RHFAutocomplete,
	RHFAutocompleteMulti,
	RHFScheduleTimePicker,
	RHFSelect,
	RHFSwitch,
	RHFTextField
} from '@libeyondea/base-cms';
import { Button, Container, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const Dashboard = () => {
	const [service, setService] = useState<any>(null);
	const defaultValues = useMemo(() => {
		return {
			service_ids: [],
			schedule_time: ''
		};
	}, []);

	const validationSchema = useMemo(() => {
		return yup.object().shape({
			service_ids: yup.array().of(yup.number().required(REQUIRED_MESSAGE)).min(1, 'Vui lòng chọn ít nhất 1 dịch vụ').required(REQUIRED_MESSAGE)
		});
	}, []);

	const methods = useForm<any>({
		defaultValues: defaultValues,
		resolver: yupResolver(validationSchema) as any,
		mode: 'all'
	});

	const handleFormSubmit = async (values: any) => {
		console.log(values);
	};

	return (
		<PageContainer title="Dashboard">
			<Container maxWidth="md">
				<MainCard>
					<FormProvider methods={methods} onSubmit={methods.handleSubmit(handleFormSubmit)}>
						<Grid container spacing={3}>
							<Grid size={12}>
								<RHFAutocompleteMulti
									name="service_ids"
									label="Services"
									valueKey="id"
									labelKey="title"
									loadChildren={true}
									childrenKey="children"
									options={[
										{
											id: 1,
											code: 'HOTICH',
											title: 'Hộ tịch',
											sub_title: null,
											status: 1,
											is_active: true,
											default_workflow_id: null,
											children: [
												{
													id: 2,
													code: 'HOTICH_KHAISINH',
													title: 'Đăng ký khai sinh',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 1,
													children: [
														{
															id: 33,
															code: 'HOTICH_KHAISINH_KHAISINH',
															title: 'Đăng ký khai sinh',
															sub_title: null,
															status: 1,
															is_active: true,
															default_workflow_id: 1,
															children: []
														},
														{
															id: 44,
															code: 'HOTICH_KHAISINH_KHAITU',
															title: 'Đăng ký khai tử',
															sub_title: null,
															status: 1,
															is_active: true,
															default_workflow_id: 2,
															children: []
														}
													]
												},
												{
													id: 3,
													code: 'HOTICH_KHAITU',
													title: 'Đăng ký khai tử',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 2,
													children: []
												},
												{
													id: 4,
													code: 'HOTICH_KETHON',
													title: 'Đăng ký kết hôn',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 3,
													children: []
												},
												{
													id: 5,
													code: 'HOTICH_TRICHLUC',
													title: 'Cấp bản sao trích lục hộ tịch',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 4,
													children: []
												},
												{
													id: 6,
													code: 'HOTICH_GIAMHO',
													title: 'Đăng Ký Giám Hộ',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 5,
													children: []
												}
											]
										},
										{
											id: 14,
											code: 'XAHOI',
											title: 'Xã hội',
											sub_title: null,
											status: 1,
											is_active: true,
											default_workflow_id: null,
											children: [
												{
													id: 15,
													code: 'XAHOI_HONGHEO',
													title: 'Xác nhận hộ nghèo, hộ cận nghèo',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: null,
													children: []
												},
												{
													id: 16,
													code: 'XAHOI_TROCAP',
													title: 'Thủ tục hưởng trợ cấp xã hội',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: null,
													children: []
												}
											]
										},
										{
											id: 7,
											code: 'CUTRU',
											title: 'Cư Trú',
											sub_title: null,
											status: 1,
											is_active: true,
											default_workflow_id: 6,
											children: [
												{
													id: 8,
													code: 'CUTRU_THUONGTRU',
													title: 'Đăng ký thường trú',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 7,
													children: []
												},
												{
													id: 9,
													code: 'CUTRU_XACNHAN',
													title: 'Xác nhận thông tin về cư trú',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: 8,
													children: []
												},
												{
													id: 13,
													code: 'CUTRU_TAMTRU',
													title: 'Đăng ký tạm trú',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: null,
													children: []
												},
												{
													id: 17,
													code: 'CUTRU_TAMVANG',
													title: 'Khai báo tạm vắng',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: null,
													children: []
												}
											]
										},
										{
											id: 10,
											code: 'CHUNGTHUC',
											title: 'Chứng thực',
											sub_title: null,
											status: 1,
											is_active: true,
											default_workflow_id: null,
											children: [
												{
													id: 11,
													code: 'CHUNGTHUC_BANSAO',
													title: 'Chứng thực bản sao từ bản chính',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: null,
													children: []
												},
												{
													id: 12,
													code: 'CHUNGTHUC_CHUKY',
													title: 'Chứng thực chữ ký',
													sub_title: null,
													status: 1,
													is_active: true,
													default_workflow_id: null,
													children: []
												}
											]
										}
									]}
								/>
							</Grid>
							<Grid size={12}>
								<NAutocomplete
									label="Services"
									valueKey="id"
									labelKey="name"
									options={[
										{ id: 1, name: 'Service 1' },
										{ id: 2, name: 'Service 2' },
										{ id: 3, name: 'Service 3' }
									]}
									value={service}
									onChange={(e, value) => setService(value)}
									isObject={true}
								/>
							</Grid>
							<Grid size={12}>
								<RHFScheduleTimePicker name="schedule_time" label="Schedule Time" type="all" />
							</Grid>
							<Grid size={12}>
								<Button type="submit" variant="contained" color="primary">
									Submit
								</Button>
							</Grid>
						</Grid>
					</FormProvider>
				</MainCard>
			</Container>
		</PageContainer>
	);
};

export default Dashboard;
