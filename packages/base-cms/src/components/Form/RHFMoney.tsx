import { forwardRef } from 'react';

import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { InputBaseComponentProps } from '@mui/material/InputBase';
import { Controller, useFormContext } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

import { renderLabelWithInfo } from './InfoTooltip';

type RHFMoneyProps = TextFieldProps & {
	name: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
	thousandSeparator?: string;
	prefix?: string;
	suffix?: string;
	max?: number;
	min?: number;
};

type MoneyInputProps = InputBaseComponentProps & {
	name: string;
	onChange: (event: {
		target: {
			name: string;
			value: string;
		};
	}) => void;
	thousandSeparator?: string;
	prefix?: string;
	suffix?: string;
	max?: number;
	min?: number;
};

const MoneyNumericInput = forwardRef<HTMLInputElement, MoneyInputProps>(function MoneyNumericInput(props, ref) {
	const { onChange, name, thousandSeparator, prefix, suffix, max, min, ...other } = props;

	return (
		<NumericFormat
			{...other}
			getInputRef={ref}
			thousandSeparator={thousandSeparator}
			decimalSeparator=","
			prefix={prefix}
			suffix={suffix}
			decimalScale={0}
			allowNegative={false}
			isAllowed={(values) => {
				const { floatValue } = values;
				if (floatValue === undefined) return true;
				if (max !== undefined && floatValue > max) return false;
				if (min !== undefined && floatValue < min) return false;
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

export const RHFMoney = ({
	name,
	label = 'Số tiền',
	helperText,
	fullWidth = true,
	size = 'medium',
	startAdornment,
	endAdornment,
	thousandSeparator = '.',
	prefix = '',
	suffix = '',
	max,
	min,
	info,
	...textFieldProps
}: RHFMoneyProps) => {
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
						label={renderLabelWithInfo(label as string, info)}
						value={inputValue}
						onChange={field.onChange}
						onBlur={field.onBlur}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
						autoComplete="off"
						inputMode="numeric"
						slotProps={{
							input: {
								inputComponent: MoneyNumericInput,
								inputProps: {
									name: field.name,
									onBlur: field.onBlur,
									thousandSeparator,
									prefix,
									suffix,
									max,
									min
								},
								startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment?.(inputValue)}</InputAdornment> : null,
								endAdornment: endAdornment ? (
									<InputAdornment position="end">{endAdornment?.(inputValue)}</InputAdornment>
								) : (
									<InputAdornment position="end">VNĐ</InputAdornment>
								)
							}
						}}
					/>
				);

				return textField;
			}}
		/>
	);
};
