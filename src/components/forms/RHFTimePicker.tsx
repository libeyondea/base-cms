import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import { MobileTimePicker, MobileTimePickerProps } from '@mui/x-date-pickers/MobileTimePicker';
import moment, { Moment } from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

interface RHFTimePickerProps extends MobileTimePickerProps {
	name: string;
	label: string;
	endAdornment?: (value: any) => React.ReactNode;
}

const RHFTimePicker = ({ label, name, endAdornment, ...props }: RHFTimePickerProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
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
						...(endAdornment
							? {
									inputAdornment: (adornProps: InputAdornmentProps) => (
										<>
											<InputAdornment {...adornProps} sx={{ mr: 2 }}>
												{adornProps.children}
											</InputAdornment>
											{endAdornment?.(field.value)}
										</>
									)
								}
							: {})
					}}
					slotProps={{
						textField: {
							fullWidth: true,
							error: !!error,
							helperText: error?.message,
							size: 'medium'
						}
					}}
				/>
			)}
		/>
	);
};

export default RHFTimePicker;
