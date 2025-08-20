import { MenuItem, Select, SelectProps, SxProps, Theme } from '@mui/material';

type NSelectProps = SelectProps & {
	valueKey?: string | number;
	labelKey?: string;
	colorKey?: string;
	value: any;
	options: any[];
	maxHeight?: string | number;
	PaperPropsSx?: SxProps<Theme>;
	sx?: SxProps<Theme>;
};

const NSelect = ({
	valueKey = 'id',
	labelKey = 'name',
	colorKey = 'color',
	value,
	options,
	maxHeight = 220,
	fullWidth = true,
	size = 'medium',
	PaperPropsSx,
	sx,
	...props
}: NSelectProps) => {
	const selectedColor = options?.find((item) => item?.[valueKey] === value)?.[colorKey] || 'inherit';

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
		<Select
			{...props}
			fullWidth={fullWidth}
			size={size}
			MenuProps={{
				PaperProps: {
					sx: {
						...PaperPropsSx,
						maxHeight: maxHeight
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
		</Select>
	);
};

export default NSelect;
