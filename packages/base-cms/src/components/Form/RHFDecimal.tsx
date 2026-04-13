import { forwardRef } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

type RHFDecimalProps = TextFieldProps & {
	name: string;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
	/** Giá trị tối thiểu (mặc định: 0) */
	min?: number;
	/** Giá trị tối đa */
	max?: number;
	/** Số chữ số thập phân tối đa (mặc định: 2) */
	decimalScale?: number;
	/** Luôn hiển thị đủ số chữ số thập phân (mặc định: false) */
	fixedDecimalScale?: boolean;
	/** Ký tự phân cách thập phân (mặc định: ',') */
	decimalSeparator?: string;
	/** Hiển thị dấu phân cách hàng nghìn (mặc định: false) */
	thousandSeparator?: boolean | string;
	/** Cho phép số âm (mặc định: false) */
	allowNegative?: boolean;
};

type DecimalInputProps = InputBaseComponentProps & {
	name: string;
	onChange: (event: { target: { name: string; value: string } }) => void;
	min?: number;
	max?: number;
	decimalScale?: number;
	fixedDecimalScale?: boolean;
	decimalSeparator?: string;
	thousandSeparator?: boolean | string;
	allowNegative?: boolean;
};

/**
 * Custom input component cho phép nhập số thập phân.
 * Sử dụng NumericFormat để kiểm soát chính xác số chữ số thập phân.
 */
const DecimalNumericInput = forwardRef<HTMLInputElement, DecimalInputProps>(function DecimalNumericInput(props, ref) {
	const {
		onChange,
		name,
		min = 0,
		max,
		decimalScale = 2,
		fixedDecimalScale = false,
		decimalSeparator = ',',
		thousandSeparator = false,
		allowNegative = false,
		...other
	} = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			decimalScale={decimalScale}
			fixedDecimalScale={fixedDecimalScale}
			decimalSeparator={decimalSeparator}
			thousandSeparator={thousandSeparator}
			allowNegative={allowNegative}
			allowLeadingZeros={false}
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
 * RHFDecimal - React Hook Form TextField chỉ cho phép nhập số thập phân.
 *
 * @example
 * // Số thập phân tối đa 2 chữ số
 * <RHFDecimal name="price" label="Giá" />
 *
 * // Số thập phân 4 chữ số, luôn hiển thị đủ
 * <RHFDecimal name="rate" label="Tỉ lệ" decimalScale={4} fixedDecimalScale />
 *
 * // Với dấu phân cách hàng nghìn
 * <RHFDecimal name="amount" label="Số tiền" thousandSeparator="." decimalSeparator="," />
 *
 * // Giới hạn min/max
 * <RHFDecimal name="percentage" label="Phần trăm" min={0} max={100} suffix="%" />
 */
export const RHFDecimal = ({
	name,
	helperText,
	fullWidth = true,
	size = 'medium',
	startAdornment,
	endAdornment,
	min = 0,
	max,
	decimalScale = 2,
	fixedDecimalScale = false,
	decimalSeparator = ',',
	thousandSeparator = false,
	allowNegative = false,
	...textFieldProps
}: RHFDecimalProps) => {
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
						name={field.name}
						value={inputValue}
						onChange={field.onChange}
						onBlur={field.onBlur}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
						autoComplete="off"
						inputMode="decimal"
						slotProps={{
							input: {
								inputComponent: DecimalNumericInput,
								inputProps: {
									name: field.name,
									onBlur: field.onBlur,
									min,
									max,
									decimalScale,
									fixedDecimalScale,
									decimalSeparator,
									thousandSeparator,
									allowNegative
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
