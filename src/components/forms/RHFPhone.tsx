import { forwardRef } from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

type RHFPhoneProps = TextFieldProps & {
	name: string;
	endAdornment?: (value: any) => React.ReactNode;
};

type PhoneInputProps = InputBaseComponentProps & {
	name: string;
	onChange: (event: { target: { name: string; value: string } }) => void;
};

const PhonePatternInput = forwardRef<HTMLInputElement, PhoneInputProps>(function PhonePatternInput(props, ref) {
	const { onChange, name, ...other } = props;

	return (
		<PatternFormat
			{...other}
			getInputRef={ref}
			format="#### ### ###"
			allowEmptyFormatting={false}
			isAllowed={(values) => values.value.length <= 10}
			onValueChange={(values) => {
				onChange({
					target: {
						name: name,
						value: values.value
					}
				});
			}}
		/>
	);
});

const RHFPhone = ({ name, label = 'Số điện thoại', endAdornment, helperText, size = 'medium', ...textFieldProps }: RHFPhoneProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const inputValue = field.value || '';

				const textField = (
					<TextField
						{...textFieldProps}
						fullWidth
						size={size}
						label={label}
						value={inputValue}
						onChange={field.onChange}
						onBlur={field.onBlur}
						name={field.name}
						helperText={error ? error.message : helperText}
						error={!!error}
						autoComplete="off"
						inputMode="tel"
						slotProps={{
							input: {
								inputComponent: PhonePatternInput,
								inputProps: {
									name: field.name,
									onBlur: field.onBlur
								},
								endAdornment: endAdornment?.(inputValue)
							}
						}}
					/>
				);

				return textField;
			}}
		/>
	);
};

export default RHFPhone;
