import { forwardRef } from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { Controller, FieldPath, FieldValues, useFormContext } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';

// Interface cho các props của numeric format
interface NumericFormatProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	onBlur?: () => void;
	name: string;
	thousandSeparator?: boolean | string;
	decimalSeparator?: string;
	prefix?: string;
	suffix?: string;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
	allowNegative?: boolean;
	allowLeadingZeros?: boolean;
}

// Interface cho các props của pattern format
interface PatternFormatProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	onBlur?: () => void;
	name: string;
	format: string;
	mask?: string;
	allowEmptyFormatting?: boolean;
}

// Component cho NumericFormat
const NumericFormatCustom = forwardRef<typeof NumericFormat, NumericFormatProps>(function NumericFormatCustom(props, ref) {
	const { onChange, onBlur, ...other } = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value
					}
				});
			}}
			onBlur={onBlur}
		/>
	);
});

// Component cho PatternFormat
const PatternFormatCustom = forwardRef<typeof PatternFormat, PatternFormatProps>(function PatternFormatCustom(props, ref) {
	const { onChange, onBlur, ...other } = props;

	return (
		<PatternFormat
			{...other}
			getInputRef={ref}
			onValueChange={(values) => {
				onChange({
					target: {
						name: props.name,
						value: values.value
					}
				});
			}}
			onBlur={onBlur}
		/>
	);
});

// Interface cho props của FormTextField
interface FormTextFieldProps<T extends FieldValues> extends Omit<TextFieldProps, 'name' | 'value' | 'onChange'> {
	name: FieldPath<T>;
	rules?: any;
	defaultValue?: string;

	// Format type
	formatType?: 'text' | 'numeric' | 'pattern';

	// Numeric format props
	thousandSeparator?: boolean | string;
	decimalSeparator?: string;
	prefix?: string;
	suffix?: string;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
	allowNegative?: boolean;
	allowLeadingZeros?: boolean;

	// Pattern format props
	format?: string; // Required for pattern format
	mask?: string;
	allowEmptyFormatting?: boolean;

	// Custom value
	value?: string | number;

	// Custom end adornment
	endAdornment?: (option: any) => React.ReactNode;
}

// Component chính - hỗ trợ cả text và format
const RHFTextField = <T extends FieldValues>({
	name,
	rules,
	defaultValue = '',
	formatType = 'text',
	// Numeric props
	thousandSeparator,
	decimalSeparator,
	prefix,
	suffix,
	decimalScale,
	fixedDecimalScale,
	allowNegative,
	allowLeadingZeros,
	// Pattern props
	format,
	mask,
	allowEmptyFormatting,
	label,
	value, // custom value
	size = 'medium',
	endAdornment,
	...textFieldProps
}: FormTextFieldProps<T>) => {
	const { control } = useFormContext<T>();

	// Validate props based on format type
	if (formatType === 'pattern' && !format) {
		throw new Error('format prop is required when formatType is "pattern"');
	}

	return (
		<Controller
			name={name}
			control={control}
			rules={rules}
			defaultValue={defaultValue as any}
			render={({ field, fieldState: { error } }) => {
				// Ưu tiên sử dụng custom value nếu được truyền vào
				const inputValue = value !== undefined ? value : field.value || '';

				// Nếu là text thường, không cần format
				if (formatType === 'text') {
					const textField = (
						<TextField
							{...textFieldProps}
							fullWidth
							value={inputValue}
							onChange={field.onChange}
							onBlur={field.onBlur}
							name={field.name}
							label={label}
							error={!!error}
							helperText={error ? error.message : textFieldProps.helperText}
							size={size}
							slotProps={{
								input: {
									endAdornment: endAdornment?.(inputValue)
								}
							}}
						/>
					);

					return textField;
				}

				// Chọn component format phù hợp cho numeric và pattern
				const InputComponent = formatType === 'pattern' ? PatternFormatCustom : NumericFormatCustom;

				// Tạo inputProps dựa trên format type
				const inputProps =
					formatType === 'pattern'
						? {
								format: format!,
								mask,
								allowEmptyFormatting,
								onBlur: field.onBlur,
								name: field.name
							}
						: {
								thousandSeparator,
								decimalSeparator,
								prefix,
								suffix,
								decimalScale,
								fixedDecimalScale,
								allowNegative,
								allowLeadingZeros,
								onBlur: field.onBlur,
								name: field.name
							};

				const textField = (
					<TextField
						{...textFieldProps}
						fullWidth
						value={inputValue}
						onChange={field.onChange}
						onBlur={field.onBlur}
						name={field.name}
						label={label}
						error={!!error}
						helperText={error ? error.message : textFieldProps.helperText}
						slotProps={{
							input: {
								inputComponent: InputComponent as any,
								inputProps,
								endAdornment: endAdornment?.(inputValue)
							}
						}}
						size={size}
					/>
				);

				return textField;
			}}
		/>
	);
};

export default RHFTextField;
