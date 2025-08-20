import { FormHelperText, Switch, SwitchProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFSwitchProps = SwitchProps & {
	name: string;
	helperText?: string;
};

const RHFSwitch = ({ name, helperText, ...props }: RHFSwitchProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<>
						<Switch {...field} {...props} checked={field.value} />
						{(!!fieldState.error || helperText) && (
							<FormHelperText error={!!fieldState.error}>{fieldState.error ? fieldState.error.message : helperText}</FormHelperText>
						)}
					</>
				);
			}}
		/>
	);
};

export default RHFSwitch;
