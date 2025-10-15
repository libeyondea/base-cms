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
			service_ids: []
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
									labelKey="name"
									options={[
										{ id: 1, name: 'Service 1' },
										{ id: 2, name: 'Service 2' },
										{ id: 3, name: 'Service 3' }
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
