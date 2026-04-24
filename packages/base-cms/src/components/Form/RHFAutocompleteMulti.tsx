import { useCallback, useEffect, useRef } from 'react';

import { Autocomplete, AutocompleteProps, AutocompleteValue, Checkbox, Chip, ChipTypeMap, TextField } from '@mui/material';
import { debounce, get } from 'lodash-es';
import { Controller, useFormContext } from 'react-hook-form';

import { renderLabelWithInfo } from './InfoTooltip';

type DataProp = {
	id?: string | number;
	[key: string]: any;
};

type Props<T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> = Omit<
	AutocompleteProps<T, true, false, false, ChipComponent>,
	'multiple'
> & {
	name: string;
	label?: string;
	/** Thông tin mô tả, hiển thị khi hover vào icon chấm than sau label */
	info?: string;
	valueKey?: string;
	labelKey?: string;
	helperText?: React.ReactNode;
	isObject?: boolean;
	hiddenKeys?: string;
	maxItems?: number;
	loadChildren?: boolean;
	childrenKey?: string;
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
	loadChildren = false,
	childrenKey = 'children',
	disableCloseOnSelect = true,
	renderOptionStart,
	renderOptionEnd,
	hiddenKeys,
	info,
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

	// Map form value IDs to actual option objects
	const getSelectedOptions = (): T[] => {
		if (isObject || !formValue || !Array.isArray(formValue) || formValue.length === 0) {
			return [];
		}

		return allOptions.filter((option: T) => formValue.includes(option[valueKey]));
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
								: allOptions?.filter((opt) => {
										if (!hiddenKeys) return true;
										return Boolean(opt?.[hiddenKeys]) !== false;
									})
						}
						loading={loading}
						getOptionLabel={(option) => get(option, [labelKey], '')}
						disableCloseOnSelect={disableCloseOnSelect}
						renderOption={(props, option, { selected }) => {
							const { key, ...otherProps } = props;
							const level = option?._level || 0;
							const paddingLeft = loadChildren ? 16 + level * 24 : 16;
							return (
								<li key={option?.[valueKey]} {...otherProps} style={{ paddingLeft: `${paddingLeft}px` }}>
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
									key={optionSelect?.[valueKey]}
								/>
							));
						}}
						renderInput={(params) => (
							<TextField
								{...params}
								size={size}
								label={renderLabelWithInfo(label, info)}
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
