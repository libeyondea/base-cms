import { FormControl, FormHelperText, InputAdornment, InputLabel, MenuItem, Select, SelectProps, SxProps, Theme } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { renderLabelWithInfo } from './InfoTooltip';

type RHFSelectProps = Omit<SelectProps, 'startAdornment' | 'endAdornment'> & {
	valueKey?: string | number;
	labelKey?: string;
	colorKey?: string;
	disabledKey?: string;
	label?: string;
	name: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	options: any[];
	handleOnchange?: (value: any) => void;
	helperText?: string;
	maxHeight?: string | number;
	sx?: SxProps<Theme>;
	iconOffset?: number;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

export const RHFSelect = ({
	valueKey = 'id',
	labelKey = 'name',
	colorKey = 'color',
	disabledKey = 'disabled',
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
	info,
	...props
}: RHFSelectProps) => {
	const { control } = useFormContext();

	const optionItems =
		Array.isArray(options) && options.length > 0 ? (
			options?.map((item) => (
				<MenuItem key={item?.[valueKey]} value={item?.[valueKey]} sx={{ color: item?.[colorKey] || 'inherit' }} disabled={item?.[disabledKey]}>
					{item?.[labelKey]}
				</MenuItem>
			))
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
						{label && <InputLabel id={`${name}-label`}>{renderLabelWithInfo(label, info)}</InputLabel>}
						<Select
							{...field}
							{...props}
							labelId={label ? `${name}-label` : undefined}
							value={field.value}
							label={label}
							onChange={(e) => {
								field.onChange(e);
								handleOnchange?.(e.target.value);
							}}
							MenuProps={{
								PaperProps: {
									sx: {
										maxHeight: maxHeight
									}
								}
							}}
							startAdornment={startAdornment ? <InputAdornment position="start">{startAdornment?.(field.value)}</InputAdornment> : null}
							endAdornment={endAdornment ? <InputAdornment position="end">{endAdornment?.(field.value)}</InputAdornment> : null}
							sx={{
								...sx,
								...(endAdornment && {
									'& .MuiSelect-icon': {
										right: iconOffset
									},
									'& .MuiSelect-select': {
										color: selectedColor
									}
								})
							}}
						>
							{optionItems}
						</Select>
						{(!!fieldState.error || helperText) && <FormHelperText>{fieldState.error ? fieldState.error.message : helperText}</FormHelperText>}
					</FormControl>
				);
			}}
		/>
	);
};
