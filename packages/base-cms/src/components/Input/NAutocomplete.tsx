import { useCallback, useEffect, useRef, useState } from 'react';

import { Autocomplete, AutocompleteProps, AutocompleteValue, ChipTypeMap, TextField } from '@mui/material';
import { debounce, get } from 'lodash-es';

type DataProp = {
	id?: string | number;
	[key: string]: any;
};

type Props<T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> = Omit<
	AutocompleteProps<T, false, false, false, ChipComponent>,
	'multiple' | 'onChange'
> & {
	name?: string;
	label?: string;
	valueKey?: string;
	labelKey?: string;
	helperText?: React.ReactNode;
	isObject?: boolean;
	hiddenKeys?: string;
	onInputChange?: (e: any, value: any) => void;
	handleOnchange?: (value: any) => void;
	renderOptionStart?: (option: T) => React.ReactNode;
	renderOptionEnd?: (option: T) => React.ReactNode;
	startAdornment?: (option: T | null) => React.ReactNode;
	endAdornment?: (option: T | null) => React.ReactNode;
	value?: T | (string | number) | null;
	onChange?: (event: React.SyntheticEvent, value: T | (string | number) | null) => void;
	error?: boolean;
	errorMessage?: string;
};

export const NAutocomplete = <T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>({
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
	disableCloseOnSelect = false,
	renderOptionStart,
	renderOptionEnd,
	startAdornment,
	endAdornment,
	hiddenKeys,
	value: externalValue,
	onChange: externalOnChange,
	error = false,
	errorMessage,
	...rest
}: Omit<Props<T, ChipComponent>, 'renderInput'>) => {
	const [internalValue, setInternalValue] = useState<T | (string | number) | null>(externalValue || null);
	const debouncedFnRef = useRef<ReturnType<typeof debounce> | null>(null);

	// Sync with external value if provided
	useEffect(() => {
		if (externalValue !== undefined) {
			setInternalValue(externalValue);
		}
	}, [externalValue]);

	const handleChange = (newVal: T | null) => {
		const newValue = isObject ? newVal : newVal ? newVal[valueKey] : null;
		setInternalValue(newValue);
		// Tạo một synthetic event giả để truyền vào onChange
		const fakeEvent = {} as React.SyntheticEvent;
		externalOnChange?.(fakeEvent, newValue);
	};

	const onChange = (event: React.SyntheticEvent, newVal: AutocompleteValue<T, false, false, false>) => {
		handleOnchange?.(newVal);
		handleChange(newVal as T | null);
	};

	// Debounce để tối ưu hóa việc gọi API
	const debouncedInputChange = useCallback(
		(event: React.SyntheticEvent, value: any) => {
			if (debouncedFnRef.current) {
				debouncedFnRef.current.cancel();
			}

			debouncedFnRef.current = debounce((e: React.SyntheticEvent, val: any) => {
				// Kiểm tra xem giá trị có trong options hay chưa
				const isExist = options.some((option: any) => option?.[labelKey]?.toLowerCase() === val?.toLowerCase());
				// Chỉ gọi API khi giá trị chưa có trong danh sách
				if (!isExist) {
					onInputChange?.(e, val);
				}
			}, 300);

			debouncedFnRef.current(event, value);
		},
		[options, labelKey, onInputChange]
	);

	// Map internal value ID to actual option object
	const getSelectedOption = (): T | null => {
		if (isObject || !internalValue) {
			return internalValue as T | null;
		}

		return options.find((option: T) => option[valueKey] === internalValue) || null;
	};

	useEffect(() => {
		return () => {
			if (debouncedFnRef.current) {
				debouncedFnRef.current.cancel();
			}
		};
	}, []);

	// For non-object mode, we need to convert the numeric/string ID to actual option object
	const value = isObject ? (internalValue as T) : getSelectedOption();

	return (
		<Autocomplete
			{...rest}
			fullWidth
			isOptionEqualToValue={(option, value) => {
				if (!value) return false;
				return option?.[valueKey] === value?.[valueKey];
			}}
			value={value}
			onChange={onChange}
			disablePortal={false}
			onInputChange={(e, value) => debouncedInputChange(e, value)}
			disabled={disabled}
			options={
				loading
					? []
					: options?.filter((opt) => {
							if (!hiddenKeys) return true;
							return Boolean(opt?.[hiddenKeys]) !== false;
						})
			}
			loading={loading}
			getOptionLabel={(option) => get(option, [labelKey], '')}
			disableCloseOnSelect={false}
			renderOption={(props, option) => {
				const { key, ...otherProps } = props;
				return (
					<li key={option?.[valueKey]} {...otherProps}>
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
					error={error}
					helperText={error ? errorMessage : helperText}
					slotProps={{
						input: {
							...params.InputProps,
							startAdornment: startAdornment?.(value),
							endAdornment: endAdornment?.(value)
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
};
