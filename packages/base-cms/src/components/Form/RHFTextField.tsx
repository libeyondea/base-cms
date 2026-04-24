import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { renderLabelWithInfo } from './InfoTooltip';

type RHFTextFieldProps = TextFieldProps & {
	name: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	startAdornment?: (value: any) => React.ReactNode;
	endAdornment?: (value: any) => React.ReactNode;
};

export const RHFTextField = ({ name, helperText, fullWidth = true, size = 'medium', startAdornment, endAdornment, info, ...props }: RHFTextFieldProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<TextField
						{...field}
						{...props}
						fullWidth={fullWidth}
						size={size}
						label={renderLabelWithInfo(props.label as string, info)}
						value={field.value}
						error={!!fieldState.error}
						helperText={fieldState.error ? fieldState.error.message : helperText}
						slotProps={{
							input: {
								startAdornment: startAdornment ? <InputAdornment position="start">{startAdornment?.(field.value)}</InputAdornment> : null,
								endAdornment: endAdornment ? <InputAdornment position="end">{endAdornment?.(field.value)}</InputAdornment> : null
							}
						}}
					/>
				);
			}}
		/>
	);
};
