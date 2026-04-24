import { FormControl, FormHelperText, FormLabel, InputLabel, Switch, SwitchProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { renderLabelWithInfo } from './InfoTooltip';

type RHFSwitchProps = SwitchProps & {
	label?: string;
	name: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	helperText?: string;
};

export const RHFSwitch = ({ name, helperText, label, size = 'medium', info, ...props }: RHFSwitchProps) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				return (
					<FormControl>
						{label && <FormLabel>{renderLabelWithInfo(label, info)}</FormLabel>}
						<Switch {...field} {...props} checked={field.value} />
						{(!!fieldState.error || helperText) && (
							<FormHelperText error={!!fieldState.error}>{fieldState.error ? fieldState.error.message : helperText}</FormHelperText>
						)}
					</FormControl>
				);
			}}
		/>
	);
};
