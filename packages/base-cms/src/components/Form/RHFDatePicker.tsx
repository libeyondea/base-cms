import { InputAdornment, InputAdornmentProps } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

type RHFDatePickerProps = DatePickerProps & {
	name: string;
	helperText?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

export const RHFDatePicker = ({ name, helperText, fullWidth = true, size = 'medium', startAdornment, endAdornment, ...props }: RHFDatePickerProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<DatePicker
					{...field}
					{...props}
					format="DD/MM/YYYY"
					value={field.value ? dayjs(field.value, 'DD/MM/YYYY') : null}
					onChange={(value: Dayjs | null) => {
						const stringValue = value ? value.format('DD/MM/YYYY') : '';
						field.onChange(stringValue);
					}}
					slots={{
						inputAdornment: (adornProps: InputAdornmentProps) => (
							<InputAdornment {...adornProps} sx={{ gap: 1 }}>
								{adornProps.children}
								{endAdornment?.(field.value)}
							</InputAdornment>
						)
					}}
					slotProps={{
						textField: {
							fullWidth: fullWidth,
							size: size,
							error: !!fieldState.error,
							helperText: fieldState.error ? fieldState.error.message : helperText,
							InputProps: {
								startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment?.(field.value)}</InputAdornment> : null
							}
						}
					}}
				/>
			)}
		/>
	);
};
