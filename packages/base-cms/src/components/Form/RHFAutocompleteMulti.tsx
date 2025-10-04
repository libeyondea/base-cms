import { useCallback, useEffect, useRef } from 'react';

import { Autocomplete, AutocompleteProps, AutocompleteValue, Checkbox, Chip, ChipTypeMap, TextField } from '@mui/material';
import { debounce, get } from 'lodash-es';
import { Controller, useFormContext } from 'react-hook-form';

type DataProp = {
	id: string | number;
	[key: string]: any;
};

type Props<T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> = Omit<
	AutocompleteProps<T, true, false, false, ChipComponent>,
	'multiple'
> & {
	name: string;
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
};

export const RHFAutocompleteMulti = <T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>({
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
	...rest
}: Omit<Props<T, ChipComponent>, 'renderInput'>) => {
	const { control, setValue, trigger, watch } = useFormContext();
	const debouncedFnRef = useRef<ReturnType<typeof debounce> | null>(null);

	// Get current form value for this field
	const formValue = watch(name);

	const handleChange = (newVal: T[]) => {
		// Apply limit only if maxItems is provided
		const limitedVal = maxItems && newVal.length > maxItems ? newVal.slice(0, maxItems) : newVal;
		const newArray = isObject ? limitedVal : limitedVal.map((item) => item?.[valueKey]);
		setValue(name, newArray.length > 0 ? newArray : [], { shouldValidate: true });
	};

	const onChange = (event: React.SyntheticEvent, newVal: AutocompleteValue<T, true, false, false>) => {
		handleOnchange?.(newVal);
		handleChange(newVal as T[]);
		trigger(name);
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

	// Map form value IDs to actual option objects
	const getSelectedOptions = (): T[] => {
		if (isObject || !formValue || !Array.isArray(formValue) || formValue.length === 0) {
			return [];
		}

		return options.filter((option: T) => formValue.includes(option[valueKey]));
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
				// For non-object mode, we need to convert the numeric/string IDs to actual option objects
				const value = isObject ? field.value : getSelectedOptions();

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
						onBlur={field.onBlur}
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
									variant="outlined"
									label={optionSelect?.[labelKey]}
									sx={(theme) => ({
										backgroundColor: theme.palette.background.paper,
										borderRadius: '16px !important',
										borderColor: `${theme.palette.primary.main} !important`,
										padding: '10px 0 !important',
										margin: '5px 0 0 !important',
										color: `${theme.palette.text.primary} !important`
									})}
									key={optionSelect?.id}
								/>
							));
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								size={size}
								label={label}
								error={!!fieldState.error}
								helperText={fieldState.error ? fieldState.error.message : helperText}
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
