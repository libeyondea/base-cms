import { MenuItem, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFDropdownProps = TextFieldProps & {
	name: string;
	options: any[];
	keyValue?: string;
	labelKey?: string;
	handleOnchange?: (value: any) => void;
};

const RHFDropdown = ({ name, keyValue = 'id', labelKey = 'name', options, handleOnchange, helperText, ...props }: RHFDropdownProps) => {
	const { control } = useFormContext();

	const optionsItem =
		Array.isArray(options) && options.length ? (
			options?.map((item) => {
				return (
					<MenuItem key={item[keyValue]} value={item[keyValue]} disabled={item.disabled}>
						{item[labelKey]}
					</MenuItem>
				);
			})
		) : (
			<MenuItem value="">
				<em>No data</em>
			</MenuItem>
		);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<TextField
						{...field}
						{...props}
						select
						fullWidth
						autoComplete="off"
						value={field.value}
						onChange={(e) => {
							field.onChange(e);
							handleOnchange?.(e.target.value);
						}}
						slotProps={{
							select: {
								MenuProps: {
									PaperProps: {
										sx: {
											maxHeight: '300px'
										}
									}
								}
							}
						}}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
					>
						{optionsItem}
					</TextField>
				);
			}}
		/>
	);
};

export default RHFDropdown;
