import { forwardRef } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

type RHFPhoneProps = TextFieldProps & {
	name: string;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

type PhoneInputProps = InputBaseComponentProps & {
	name: string;
	onChange: (event: {
		target: {
			name: string;
			value: string;
		};
	}) => void;
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

const RHFPhone = ({
	name,
	label = 'Số điện thoại',
	helperText,
	fullWidth = true,
	size = 'medium',
	startAdornment,
	endAdornment,
	...textFieldProps
}: RHFPhoneProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const inputValue = field.value || '';

				const textField = (
					<TextField
						{...textFieldProps}
						fullWidth={fullWidth}
						size={size}
						name={field.name}
						label={label}
						value={inputValue}
						onChange={field.onChange}
						onBlur={field.onBlur}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
						autoComplete="off"
						inputMode="tel"
						slotProps={{
							input: {
								inputComponent: PhonePatternInput,
								inputProps: {
									name: field.name,
									onBlur: field.onBlur
								},
								startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment?.(inputValue)}</InputAdornment> : null,
								endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment?.(inputValue)}</InputAdornment> : null
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
