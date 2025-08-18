import { forwardRef } from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { Controller, useFormContext } from 'react-hook-form';
import { PatternFormat } from 'react-number-format';

type RHFNationalIDProps = TextFieldProps & {
	name: string;
	endAdornment?: (value: any) => React.ReactNode;
};

type NationalIDInputProps = InputBaseComponentProps & {
	name: string;
	onChange: (event: {
		target: {
			name: string;
			value: string;
		};
	}) => void;
};

const NationalIDPatternInput = forwardRef<HTMLInputElement, NationalIDInputProps>(function NationalIDPatternInput(props, ref) {
	const { onChange, name, ...other } = props;

	return (
		<PatternFormat
			{...other}
			getInputRef={ref}
			format="############"
			allowEmptyFormatting={false}
			isAllowed={(values) => values.value.length <= 12}
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

const RHFNationalID = ({ name, label = 'CCCD', endAdornment, helperText, size = 'medium', ...textFieldProps }: RHFNationalIDProps) => {
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
						inputMode="numeric"
						slotProps={{
							input: {
								inputComponent: NationalIDPatternInput,
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

export default RHFNationalID;
