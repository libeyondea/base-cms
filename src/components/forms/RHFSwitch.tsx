import FormHelperText from '@mui/material/FormHelperText';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Controller, useFormContext } from 'react-hook-form';

type RHFSwitchProps = SwitchProps & {
	name: string;
};

const RHFSwitch = ({ name, ...props }: RHFSwitchProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<>
						<Switch {...field} {...props} checked={field.value} />
						{!!fieldState.error && <FormHelperText error={!!fieldState.error}>{fieldState.error?.message}</FormHelperText>}
					</>
				);
			}}
		/>
	);
};

export default RHFSwitch;
