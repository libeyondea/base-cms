import { forwardRef } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { renderLabelWithInfo } from './InfoTooltip';

type RHFIntegerProps = TextFieldProps & {
	name: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
	/** Giá trị tối thiểu (mặc định: 0) */
	min?: number;
	/** Giá trị tối đa */
	max?: number;
	/** Hiển thị dấu phân cách hàng nghìn (mặc định: false) */
	thousandSeparator?: boolean | string;
};

type IntegerInputProps = InputBaseComponentProps & {
	name: string;
	onChange: (event: { target: { name: string; value: string } }) => void;
	min?: number;
	max?: number;
	thousandSeparator?: boolean | string;
};

/**
 * Custom input component chỉ cho phép nhập số nguyên >= 0.
 * Sử dụng NumericFormat với decimalScale=0 để chặn dấu thập phân.
 */
const IntegerNumericInput = forwardRef<HTMLInputElement, IntegerInputProps>(function IntegerNumericInput(props, ref) {
	const { onChange, name, min = 0, max, thousandSeparator = false, ...other } = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			decimalScale={0}
			allowNegative={min < 0}
			allowLeadingZeros={false}
			thousandSeparator={thousandSeparator}
			isAllowed={(values) => {
				const { floatValue } = values;
				if (floatValue === undefined) return true;
				if (min !== undefined && floatValue < min) return false;
				if (max !== undefined && floatValue > max) return false;
				return true;
			}}
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

/**
 * RHFInteger - React Hook Form TextField chỉ cho phép nhập số nguyên >= 0.
 *
 * @example
 * // Chỉ nhập số nguyên >= 0
 * <RHFInteger name="quantity" label="Số lượng" />
 *
 * // Giới hạn min/max
 * <RHFInteger name="age" label="Tuổi" min={0} max={150} />
 *
 * // Có dấu phân cách hàng nghìn
 * <RHFInteger name="population" label="Dân số" thousandSeparator="." />
 */
export const RHFInteger = ({
	name,
	helperText,
	fullWidth = true,
	size = 'medium',
	startAdornment,
	endAdornment,
	min = 0,
	max,
	thousandSeparator = false,
	info,
	...textFieldProps
}: RHFIntegerProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const inputValue = field.value ?? '';

				return (
					<TextField
						{...textFieldProps}
						fullWidth={fullWidth}
						size={size}
						label={renderLabelWithInfo(textFieldProps.label as string, info)}
						name={field.name}
						value={inputValue}
						onChange={field.onChange}
						onBlur={field.onBlur}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
						autoComplete="off"
						inputMode="numeric"
						slotProps={{
							input: {
								inputComponent: IntegerNumericInput,
								inputProps: {
									name: field.name,
									onBlur: field.onBlur,
									min,
									max,
									thousandSeparator
								},
								startAdornment: startAdornment ? (
									<InputAdornment position="start">{startAdornment?.(inputValue)}</InputAdornment>
								) : null,
								endAdornment: endAdornment ? (
									<InputAdornment position="end">{endAdornment?.(inputValue)}</InputAdornment>
								) : null
							}
						}}
					/>
				);
			}}
		/>
	);
};
