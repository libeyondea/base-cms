import { SxProps, TextField, TextFieldProps, Theme } from '@mui/material';

type NTextFieldProps = TextFieldProps & {
	value: any;
	sx?: SxProps<Theme>;
};

const NTextField = ({ value, fullWidth = true, size = 'medium', sx, ...props }: NTextFieldProps) => {
	return (
		<TextField
			{...props}
			value={value}
			fullWidth={fullWidth}
			size={size}
			sx={{
				...sx
			}}
		/>
	);
};

export default NTextField;
