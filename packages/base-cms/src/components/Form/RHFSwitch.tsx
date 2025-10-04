import { FormControl, FormHelperText, FormLabel, InputLabel, Switch, SwitchProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFSwitchProps = SwitchProps & {
	label?: string;
	name: string;
	helperText?: string;
};

export const RHFSwitch = ({ name, helperText, label, size = 'medium', ...props }: RHFSwitchProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<FormControl>
						{label && <FormLabel>{label}</FormLabel>}
						<Switch {...field} {...props} checked={field.value} />
						{(!!fieldState.error || helperText) && (
							<FormHelperText error={!!fieldState.error}>{fieldState.error ? fieldState.error.message : helperText}</FormHelperText>
						)}
					</FormControl>
				);
			}}
		/>
	);
};
