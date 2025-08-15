import { SxProps, TextField, TextFieldProps, Theme } from '@mui/material';

type IProps = {
	value?: any;
	onChange: (value: any) => void;
	sx?: SxProps<Theme>;
};

type NormalTextFieldProps = IProps & TextFieldProps;

const NormalTextField = ({ value, onChange, size = 'small', sx, fullWidth = false, ...other }: NormalTextFieldProps) => {
	return (
		<TextField
			fullWidth={fullWidth}
			size={size}
			autoComplete="off"
			value={value}
			onChange={onChange}
			sx={{
				...sx
			}}
			{...other}
		/>
	);
};

export default NormalTextField;
