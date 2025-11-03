import { useCallback, useEffect, useRef } from 'react';

import { Autocomplete, AutocompleteProps, ChipTypeMap, SxProps, TextField } from '@mui/material';
import { debounce, get } from 'lodash-es';
import { Controller, useFormContext } from 'react-hook-form';

type DataProp = {
	id?: string | number;
	[key: string]: any;
};

type Props<T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> = Omit<
	AutocompleteProps<T, false, false, false, ChipComponent>,
	'multiple'
> & {
	name: string;
	label?: string;
	valueKey?: string;
	labelKey?: string;
	helperText?: React.ReactNode;
	isObject?: boolean;
	hiddenKeys?: string;
	isIconSelect?: boolean;
	loadChildren?: boolean;
	childrenKey?: string;
	onInputChange?: (e: any, value: any) => void;
	handleOnchange?: (value: any) => void;
	renderOptionStart?: (option: T) => React.ReactNode;
	renderOptionEnd?: (option: T) => React.ReactNode;
	startAdornment?: (option: T | null) => React.ReactNode;
	endAdornment?: (option: T | null) => React.ReactNode;
};

export const RHFAutocomplete = <T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>({
	valueKey = 'id',
	labelKey = 'name',
	isObject = false,
	label,
	name,
	disabled = false,
	loading = false,
	size = 'medium',
	helperText,
	onInputChange,
	handleOnchange,
	options,
	loadChildren = false,
	childrenKey = 'children',
	disableCloseOnSelect = false,
	renderOptionStart,
	renderOptionEnd,
	startAdornment,
	endAdornment,
	hiddenKeys,
	sx,
	isIconSelect = true,
	...rest
}: Omit<Props<T, ChipComponent>, 'renderInput'>) => {
	const { control, setValue, trigger, watch } = useFormContext();
	const debouncedFnRef = useRef<ReturnType<typeof debounce> | null>(null);

	// Get current form value for this field
	const formValue = watch(name);

	// Flatten options including children with level tracking
	const flattenOptions = useCallback(
		(opts: readonly T[], level: number = 0): T[] => {
			if (!loadChildren) return opts.map((item) => ({ ...item, _level: 0 }));
			return opts.reduce((acc: T[], item: T) => {
				acc.push({ ...item, _level: level });
				if (item[childrenKey] && Array.isArray(item[childrenKey]) && item[childrenKey].length > 0) {
					acc.push(...flattenOptions(item[childrenKey] as T[], level + 1));
				}
				return acc;
			}, []);
		},
		[loadChildren, childrenKey]
	);

	const allOptions = flattenOptions(options || []);

	const handleChange = (newVal: T | null) => {
		const newValue = isObject ? newVal : newVal ? newVal[valueKey] : null;
		setValue(name, newValue, { shouldValidate: true });
	};

	const onChange = (event: React.SyntheticEvent, newVal: T | null) => {
		handleOnchange?.(newVal);
		handleChange(newVal);
		trigger(name);
	};

	// Debounce để tối ưu hóa việc gọi API
	const debouncedInputChange = useCallback(
		(event: any, value: any) => {
			if (debouncedFnRef.current) {
				debouncedFnRef.current.cancel();
			}

			debouncedFnRef.current = debounce((e: any, val: any) => {
				// Kiểm tra xem giá trị có trong allOptions hay chưa
				const isExist = allOptions.some((option: any) => option?.[labelKey]?.toLowerCase() === val?.toLowerCase());
				// Chỉ gọi API khi giá trị chưa có trong danh sách
				if (!isExist) {
					onInputChange?.(e, val);
				}
			}, 300);

			debouncedFnRef.current(event, value);
		},
		[allOptions, labelKey, onInputChange]
	);

	// Get selected option from form value
	const getSelectedOption = (): T | null => {
		if (isObject) {
			return formValue || null;
		}

		if (!formValue) {
			return null;
		}

		return allOptions.find((option: T) => option[valueKey] === formValue) || null;
	};

	useEffect(() => {
		return () => {
			if (debouncedFnRef.current) {
				debouncedFnRef.current.cancel();
			}
		};
	}, []);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState }) => {
				// Get the selected option object from form value
				const value = getSelectedOption();

				return (
					<Autocomplete
						{...rest}
						fullWidth
						sx={{
							...sx,
							'& .MuiInputBase-root': {
								paddingRight: isIconSelect ? '65px !important' : '14px !important'
							}
						}}
						isOptionEqualToValue={(option, value) => {
							if (!value) return false;
							return option?.[valueKey] === value?.[valueKey];
						}}
						value={value}
						onChange={onChange}
						disablePortal={false}
						onInputChange={(e, value) => debouncedInputChange(e, value)}
						onBlur={field.onBlur}
						disabled={disabled}
						options={
							loading
								? []
								: allOptions?.filter((opt) => {
										if (!hiddenKeys) return true;
										return Boolean(opt?.[hiddenKeys]) !== false;
									})
						}
						loading={loading}
						getOptionLabel={(option) => get(option, [labelKey], '')}
						disableCloseOnSelect={disableCloseOnSelect}
						renderOption={(props, option) => {
							const { key, ...otherProps } = props;
							const level = (option as any)._level || 0;
							const paddingLeft = loadChildren ? 16 + level * 24 : 16;
							return (
								<li key={option?.[valueKey]} {...otherProps} style={{ paddingLeft: `${paddingLeft}px` }}>
									{renderOptionStart?.(option)}
									{option?.[labelKey]}
									{renderOptionEnd?.(option)}
								</li>
							);
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								size={size}
								label={label}
								error={!!fieldState.error}
								helperText={fieldState.error ? fieldState.error.message : helperText}
								slotProps={{
									input: {
										...params.InputProps,
										startAdornment: startAdornment?.(value),
										endAdornment: (
											<>
												{isIconSelect && params.InputProps.endAdornment}
												{endAdornment?.(value)}
											</>
										)
									}
								}}
							/>
						)}
						slotProps={{
							listbox: {
								sx: {
									maxHeight: '300px',
									overflowY: 'auto'
								}
							}
						}}
					/>
				);
			}}
		/>
	);
};
