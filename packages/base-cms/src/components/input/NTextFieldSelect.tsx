import { MenuItem, SxProps, TextField, TextFieldProps, Theme } from '@mui/material';

type NTextFieldSelectProps = TextFieldProps & {
	valueKey?: string | number;
	labelKey?: string;
	colorKey?: string;
	disabledKey?: string;
	value: any;
	options: any[];
	maxHeight?: string | number;
	PaperPropsSx?: SxProps<Theme>;
	sx?: SxProps<Theme>;
};

export const NTextFieldSelect = ({
	valueKey = 'id',
	labelKey = 'name',
	colorKey = 'color',
	disabledKey = 'disabled',
	value,
	options,
	maxHeight = 220,
	fullWidth = true,
	size = 'medium',
	PaperPropsSx,
	sx,
	...props
}: NTextFieldSelectProps) => {
	const selectedColor = options?.find((item) => item?.[valueKey] === value)?.[colorKey] || 'inherit';

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
		<TextField
			{...props}
			select
			fullWidth={fullWidth}
			size={size}
			slotProps={{
				select: {
					MenuProps: {
						PaperProps: {
							sx: {
								...PaperPropsSx,
								maxHeight: maxHeight
							}
						}
					}
				}
			}}
			sx={{
				...sx,
				'& .MuiSelect-select': {
					color: selectedColor
				}
			}}
		>
			{optionItems}
		</TextField>
	);
};
