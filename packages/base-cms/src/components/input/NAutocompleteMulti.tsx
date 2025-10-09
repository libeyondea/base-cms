import { useCallback, useEffect, useRef, useState } from 'react';

import { Autocomplete, AutocompleteProps, AutocompleteValue, Checkbox, Chip, ChipTypeMap, TextField, Typography } from '@mui/material';
import { debounce, get } from 'lodash-es';

type DataProp = {
	id?: string | number;
	[key: string]: any;
};

type Props<T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> = Omit<
	AutocompleteProps<T, true, false, false, ChipComponent>,
	'multiple' | 'onChange'
> & {
	name?: string;
	label?: string;
	valueKey?: string;
	labelKey?: string;
	helperText?: React.ReactNode;
	isObject?: boolean;
	hiddenKeys?: string;
	maxItems?: number;
	onInputChange?: (e: any, value: any) => void;
	handleOnchange?: (value: any) => void;
	renderOptionStart?: (option: T) => React.ReactNode;
	renderOptionEnd?: (option: T) => React.ReactNode;
	value?: T[] | (string | number)[];
	onChange?: (event: React.SyntheticEvent, value: T[] | (string | number)[]) => void;
	error?: boolean;
	errorMessage?: string;
};

export const NAutocompleteMulti = <T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>({
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
	maxItems,
	disableCloseOnSelect = true,
	renderOptionStart,
	renderOptionEnd,
	hiddenKeys,
	value: externalValue,
	onChange: externalOnChange,
	error = false,
	errorMessage,
	...rest
}: Omit<Props<T, ChipComponent>, 'renderInput'>) => {
	const [internalValue, setInternalValue] = useState<T[] | (string | number)[]>(externalValue || []);
	const debouncedFnRef = useRef<ReturnType<typeof debounce> | null>(null);

	// Sync with external value if provided
	useEffect(() => {
		if (externalValue !== undefined) {
			setInternalValue(externalValue);
		}
	}, [externalValue]);

	const handleChange = (newVal: T[]) => {
		// Apply limit only if maxItems is provided
		const limitedVal = maxItems && newVal.length > maxItems ? newVal.slice(0, maxItems) : newVal;
		const newArray = isObject ? limitedVal : limitedVal.map((item) => item?.[valueKey]);

		setInternalValue(newArray);
		// Tạo một synthetic event giả để truyền vào onChange
		const fakeEvent = {} as React.SyntheticEvent;
		externalOnChange?.(fakeEvent, newArray);
	};

	const onChange = (event: React.SyntheticEvent, newVal: AutocompleteValue<T, true, false, false>) => {
		handleOnchange?.(newVal);
		handleChange(newVal as T[]);
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

	// Map internal value IDs to actual option objects
	const getSelectedOptions = (): T[] => {
		if (isObject || !internalValue || !Array.isArray(internalValue) || internalValue.length === 0) {
			return [];
		}

		return options.filter((option: T) => internalValue.includes(option[valueKey]));
	};

	useEffect(() => {
		return () => {
			if (debouncedFnRef.current) {
				debouncedFnRef.current.cancel();
			}
		};
	}, []);

	// For non-object mode, we need to convert the numeric/string IDs to actual option objects
	const value = isObject ? (internalValue as T[]) : getSelectedOptions();

	return (
		<Autocomplete
			{...rest}
			multiple
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
			disableCloseOnSelect={disableCloseOnSelect}
			renderOption={(props, option, { selected }) => {
				const { key, ...otherProps } = props;
				return (
					<li key={option?.[valueKey]} {...otherProps}>
						<Checkbox style={{ marginRight: 8 }} checked={selected} />
						{renderOptionStart?.(option)}
						{option?.[labelKey]}
						{renderOptionEnd?.(option)}
					</li>
				);
			}}
			renderValue={(value: any[], getTagProps) => {
				return value?.map((optionSelect: any, index: number) => (
					<Chip
						{...getTagProps({ index })}
						key={optionSelect?.[valueKey]}
						variant="outlined"
						label={optionSelect?.[labelKey]}
						sx={(theme) => ({
							backgroundColor: theme.palette.background.paper,
							borderRadius: '16px !important',
							borderColor: `${theme.palette.primary.main} !important`,
							padding: '0px !important',
							margin: '2px !important',
							color: `${theme.palette.text.primary} !important`
						})}
						size="small"
					/>
				));
			}}
			renderInput={(params) => <TextField {...params} size={size} label={label} error={error} helperText={error ? errorMessage : helperText} />}
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
