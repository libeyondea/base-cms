import { MenuItem, SxProps, TextField, TextFieldProps, Theme } from '@mui/material';

type IProps = {
	name: string;
	onChange: (value: any) => void;
	value: any;
	native?: boolean;
	maxHeight?: boolean | number;
	PaperPropsSx?: SxProps<Theme>;
	options: any[];
	keyValue?: string | number;
	labelKey?: string;
	colorKey?: string;
	sx?: SxProps<Theme>;
};

type NormalDropdownProps = IProps & TextFieldProps;

const NormalDropdown = ({
	name,
	value,
	native,
	maxHeight = 220,
	keyValue = 'id',
	labelKey = 'name',
	colorKey = 'color',
	PaperPropsSx,
	options,
	onChange,
	size = 'small',
	sx,
	...other
}: NormalDropdownProps) => {
	// Find the selected item to get its color
	const selectedItem = options?.find((item) => item[keyValue] === value);
	const selectedColor = selectedItem?.[colorKey];

	const checkItem =
		Array.isArray(options) && options.length ? (
			options?.map((item) => {
				return (
					<MenuItem key={item[keyValue]} value={item[keyValue]} sx={{ color: item[colorKey] || 'inherit' }}>
						{item[labelKey]}
					</MenuItem>
				);
			})
		) : (
			<MenuItem value="">
				<em>N/A</em>
			</MenuItem>
		);

	return (
		<TextField
			select
			fullWidth
			size={size}
			autoComplete="off"
			value={value}
			onChange={onChange}
			SelectProps={{
				native,
				MenuProps: {
					PaperProps: {
						sx: {
							...(!native && {
								maxHeight: typeof maxHeight === 'number' ? maxHeight : 'unset'
							}),
							...PaperPropsSx
						}
					}
				}
			}}
			sx={{
				...sx,
				'& .MuiSelect-select': {
					color: selectedColor || 'inherit',
					textTransform: 'capitalize'
				}
			}}
			{...other}
		>
			{checkItem}
		</TextField>
	);
};

export default NormalDropdown;
