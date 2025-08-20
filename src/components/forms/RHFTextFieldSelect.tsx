import { FormControl, InputAdornment, MenuItem, SxProps, TextField, TextFieldProps, Theme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

type RHFTextFieldSelectProps = Omit<TextFieldProps, 'startAdornment' | 'endAdornment'> & {
	valueKey?: string | number;
	labelKey?: string;
	colorKey?: string;
	label?: string;
	name: string;
	options: any[];
	handleOnchange?: (value: any) => void;
	helperText?: string;
	maxHeight?: string | number;
	sx?: SxProps<Theme>;
	iconOffset?: number;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

const RHFTextFieldSelect = ({
	valueKey = 'id',
	labelKey = 'name',
	colorKey = 'color',
	label,
	name,
	options,
	handleOnchange,
	helperText,
	maxHeight = 220,
	fullWidth = true,
	size = 'medium',
	sx,
	iconOffset = 40,
	startAdornment,
	endAdornment,
	...props
}: RHFTextFieldSelectProps) => {
	const { control } = useFormContext();

	const optionItems =
		Array.isArray(options) && options.length > 0 ? (
			options?.map((item) => {
				return (
					<MenuItem key={item?.[valueKey]} value={item?.[valueKey]} sx={{ color: item?.[colorKey] || 'inherit' }}>
						{item?.[labelKey]}
					</MenuItem>
				);
			})
		) : (
			<MenuItem value="">
				<em>N/A</em>
			</MenuItem>
		);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				const selectedColor = options?.find((item) => item?.[valueKey] === field.value)?.[colorKey] || 'inherit';

				return (
					<FormControl fullWidth={fullWidth} size={size} error={!!fieldState.error}>
						<TextField
							{...field}
							{...props}
							label={label}
							value={field.value}
							onChange={(e) => {
								field.onChange(e);
								handleOnchange?.(e.target.value);
							}}
							select
							slotProps={{
								select: {
									MenuProps: {
										PaperProps: {
											sx: {
												maxHeight: maxHeight
											}
										}
									},
									startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment?.(field.value)}</InputAdornment> : null,
									endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment?.(field.value)}</InputAdornment> : null,
									sx: {
										...(endAdornment && {
											'& .MuiSelect-icon': {
												right: iconOffset
											},
											'& .MuiSelect-select': {
												color: selectedColor
											}
										})
									}
								}
							}}
							sx={sx}
							helperText={fieldState.error ? fieldState.error.message : helperText}
						>
							{optionItems}
						</TextField>
					</FormControl>
				);
			}}
		/>
	);
};

export default RHFTextFieldSelect;
