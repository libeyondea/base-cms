import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTextFieldProps = TextFieldProps & {
	name: string;
};

const RHFTextField = ({ name, helperText, ...props }: RHFTextFieldProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<TextField
						{...field}
						{...props}
						fullWidth
						value={field.value}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
					/>
				);
			}}
		/>
	);
};

export default RHFTextField;
