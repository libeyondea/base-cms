import { useCallback, useEffect, useRef } from 'react';

import { Autocomplete, AutocompleteProps, AutocompleteValue, Checkbox, Chip, ChipTypeMap, TextField } from '@mui/material';
import _ from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';

type DataProp = {
	id: string | number;
	[key: string]: any;
};

type Props<T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']> = Omit<
	AutocompleteProps<T, true, false, false, ChipComponent>,
	'multiple'
> & {
	keyLabel?: string;
	labelOption?: string;
	form?: any;
	label?: string;
	name: string;
	isObject?: boolean;
	helperText?: React.ReactNode;
	onInputChange?: (e: any, value: any) => void;
	handleOnchange?: (value: any) => void;
	renderOptionStart?: (option: T) => React.ReactNode;
	renderOptionEnd?: (option: T) => React.ReactNode;
	hiddenKeys?: string;
	maxItems?: number;
};

const RHFMutiSelect = <T extends DataProp, ChipComponent extends React.ElementType = ChipTypeMap['defaultComponent']>({
	keyLabel = 'id',
	labelOption = 'name',
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
	const debouncedFnRef = useRef<ReturnType<typeof _.debounce> | null>(null);

	// Get current form value for this field
	const formValue = watch(name);

	const handleChange = (newVal: T[]) => {
		// Apply limit only if maxItems is provided
		const limitedVal = maxItems && newVal.length > maxItems ? newVal.slice(0, maxItems) : newVal;
		const newArray = isObject ? limitedVal : limitedVal.map((item) => item?.[keyLabel]);
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

			debouncedFnRef.current = _.debounce((e: React.SyntheticEvent, val: any) => {
				// Kiểm tra xem giá trị có trong options hay chưa
				const isExist = options.some((option: any) => option?.[labelOption]?.toLowerCase() === val?.toLowerCase());
				// Chỉ gọi API khi giá trị chưa có trong danh sách
				if (!isExist) {
					onInputChange?.(e, val);
				}
			}, 300);

			debouncedFnRef.current(event, value);
		},
		[options, labelOption, onInputChange]
	);

	// Map form value IDs to actual option objects
	const getSelectedOptions = (): T[] => {
		if (isObject || !formValue || !Array.isArray(formValue) || formValue.length === 0) {
			return [];
		}

		return options.filter((option: T) => formValue.includes(option[keyLabel]));
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
			render={({ field, fieldState: { error } }) => {
				// For non-object mode, we need to convert the numeric/string IDs to actual option objects
				const value = isObject ? field.value : getSelectedOptions();

				return (
					<Autocomplete
						{...rest}
						multiple
						fullWidth
						isOptionEqualToValue={(option, value) => {
							if (!value) return false;
							return option?.[keyLabel] === value?.[keyLabel];
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
						getOptionLabel={(option) => _.get(option, [labelOption], '')}
						disableCloseOnSelect={disableCloseOnSelect}
						renderOption={(props, option, { selected }) => {
							const { key, ...otherProps } = props;
							return (
								<li key={option?.[keyLabel]} {...otherProps}>
									<Checkbox style={{ marginRight: 8 }} checked={selected} />
									{renderOptionStart?.(option)}
									{option?.[labelOption]}
									{renderOptionEnd?.(option)}
								</li>
							);
						}}
						renderValue={(value: any[], getTagProps) => {
							return value?.map((optionSelect: any, index: number) => (
								<Chip
									{...getTagProps({ index })}
									variant="outlined"
									label={optionSelect?.[labelOption]}
									sx={{
										background: 'white !important',
										borderRadius: '16px !important',
										borderColor: '#2496FE !important',
										padding: '10px 0 !important',
										margin: '5px 0 0 !important'
									}}
									key={optionSelect?.id}
								/>
							));
						}}
						renderInput={(params) => (
							<TextField {...params} size={size} label={label} error={!!error} helperText={error ? error?.message : helperText} />
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

export default RHFMutiSelect;
