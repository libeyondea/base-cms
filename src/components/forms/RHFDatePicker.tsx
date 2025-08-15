import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { Controller, useFormContext } from 'react-hook-form';

type RHFDatePickerProps = DatePickerProps & {
	name: string;
	label: string;
	endAdornment?: (value: any) => React.ReactNode;
	helperText?: string;
};

const RHFDatePicker = ({ label, name, endAdornment, helperText, ...props }: RHFDatePickerProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<DatePicker
					{...field}
					{...props}
					format="DD/MM/YYYY"
					label={label}
					value={field.value ? moment(field.value, 'DD/MM/YYYY') : null}
					onChange={(value: Moment | null) => {
						const stringValue = value ? value.format('DD/MM/YYYY') : '';
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
							helperText: error ? error.message : helperText,
							size: 'medium'
						}
					}}
				/>
			)}
		/>
	);
};

export default RHFDatePicker;
