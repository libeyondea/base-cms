import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import { MobileTimePicker, MobileTimePickerProps } from '@mui/x-date-pickers/MobileTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { Controller, useFormContext } from 'react-hook-form';

import { renderLabelWithInfo } from './InfoTooltip';

type RHFTimePickerProps = MobileTimePickerProps & {
	name: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	helperText?: string;
	fullWidth?: boolean;
	size?: 'small' | 'medium';
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

export const RHFTimePicker = ({ name, label, helperText, fullWidth = true, size = 'medium', startAdornment, endAdornment, info, ...props }: RHFTimePickerProps) => {
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
					label={renderLabelWithInfo(label as string, info)}
					value={field.value ? dayjs(field.value, 'HH:mm') : null}
					onChange={(value: Dayjs | null) => {
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
