import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import { MobileTimePicker, MobileTimePickerProps } from '@mui/x-date-pickers/MobileTimePicker';
import moment, { Moment } from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTimePickerProps = MobileTimePickerProps & {
	name: string;
	helperText?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

const RHFTimePicker = ({ name, label, helperText, fullWidth = true, size = 'medium', startAdornment, endAdornment, ...props }: RHFTimePickerProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => (
				<MobileTimePicker
					{...field}
					{...props}
					openTo="hours"
					format="HH:mm"
					label={label}
					value={field.value ? moment(field.value, 'HH:mm') : null}
					onChange={(value: Moment | null) => {
						const stringValue = value ? value.format('HH:mm') : '00:00';
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

export default RHFTimePicker;
