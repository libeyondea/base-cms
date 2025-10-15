import { InputAdornment, InputAdornmentProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

type NDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
	value: string | null | undefined;
	onChange?: (value: string | null) => void;
	helperText?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	startAdornment?: (value: string | null | undefined) => React.ReactNode;
	endAdornment?: (value: string | null | undefined) => React.ReactNode;
};

export const NDatePicker = ({ value, onChange, helperText, fullWidth = true, size = 'medium', startAdornment, endAdornment, ...props }: NDatePickerProps) => {
	const pickerValue = value ? dayjs(value, 'DD/MM/YYYY') : null;

	return (
		<DatePicker
			{...props}
			format="DD/MM/YYYY"
			value={pickerValue}
			onChange={(val: Dayjs | null) => {
				const stringValue = val ? val.format('DD/MM/YYYY') : null;
				onChange?.(stringValue);
			}}
			slots={{
				inputAdornment: (adornProps: InputAdornmentProps) => (
					<InputAdornment {...adornProps} sx={{ gap: 1 }}>
						{adornProps.children}
						{endAdornment?.(value ?? null)}
					</InputAdornment>
				)
			}}
			slotProps={{
				textField: {
					fullWidth: fullWidth,
					size: size,
					helperText: helperText,
					InputProps: {
						startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment?.(value ?? null)}</InputAdornment> : null
					}
				}
			}}
		/>
	);
};
