import { useCallback, useEffect, useMemo, useState } from 'react';

import { Clear, FilterList as FilterListIcon } from '@mui/icons-material';
import { IconButton, InputAdornment, InputAdornmentProps, MenuItem, Select, TextField, useTheme } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Column } from '@tanstack/react-table';
import dayjs, { Dayjs } from 'dayjs';
import { debounce } from 'lodash-es';

interface DefaultColumnFilterProps {
	column: Column<any, any>;
	filterOptions?: {
		none?: string[];
		selectMultiple?: { key: string[]; value: { id: string; value: any[] }[] };
		selectType?: { key: string[]; value: { id: string; value: any[]; defaultValue?: any }[]; labelName?: string };
		selectFilter?: { key: string[]; value: { id: string; value: any[] }[] };
		dateType?: string[];
		fromToDateType?: string[];
	};
}

export const DefaultColumnFilter = ({ column, filterOptions }: DefaultColumnFilterProps) => {
	// If the column is part of a select filter, render SelectFilter
	if (
		filterOptions?.selectType?.key?.includes(column.id) ||
		filterOptions?.selectMultiple?.key?.includes(column.id) ||
		filterOptions?.selectFilter?.key?.includes(column.id)
	) {
		return <SelectFilter column={column} filterOptions={filterOptions} />;
	}

	// If the column is part of a date filter, render DateFilter
	if (filterOptions?.dateType?.includes(column.id)) {
		return <DateFilter column={column} />;
	}

	// Default text filter
	return <TextFilter column={column} />;
};

const TextFilter = ({ column }: { column: Column<any, any> }) => {
	const [value, setValue] = useState((column.getFilterValue() as string) || '');
	const theme = useTheme();

	// Create a function to update the filter value
	const handleFilterChange = useCallback(
		(val: string) => {
			column.setFilterValue(val || undefined);
		},
		[column]
	);

	// Create a memoized debounced version of the filter change handler
	const updateFilter = useMemo(() => debounce(handleFilterChange, 300), [handleFilterChange]);

	useEffect(() => {
		// This is needed to sync the value if the filter is reset externally
		setValue((column.getFilterValue() as string) || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column.getFilterValue()]);

	return (
		<TextField
			variant="filled"
			size="small"
			fullWidth
			value={value}
			onChange={(e) => {
				const val = e.target.value;
				setValue(val);
				updateFilter(val);
			}}
			placeholder="Tìm kiếm..."
			sx={{
				'& .MuiFilledInput-root': {
					padding: 0,
					borderStartStartRadius: 12,
					borderStartEndRadius: 12,
					borderEndStartRadius: 0,
					borderEndEndRadius: 0,
					backgroundColor: theme.palette.grey[100],
					'&:hover': {
						backgroundColor: theme.palette.grey[100]
					},
					'&.Mui-focused': {
						backgroundColor: theme.palette.grey[200]
					}
				},
				'& .MuiInputBase-input': {
					padding: 1,
					fontSize: '0.875rem'
				},
				'& .MuiInputAdornment-root': {
					margin: '0 !important'
				}
			}}
			slotProps={{
				input: {
					startAdornment: (
						<InputAdornment position="start">
							<IconButton size="small">
								<FilterListIcon color="primary" fontSize="small" sx={{ opacity: 0.7 }} />
							</IconButton>
						</InputAdornment>
					)
				}
			}}
		/>
	);
};

const SelectFilter = ({ column, filterOptions }: DefaultColumnFilterProps) => {
	const [value, setValue] = useState((column.getFilterValue() as string) || '');
	const theme = useTheme();

	useEffect(() => {
		setValue((column.getFilterValue() as string) || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column.getFilterValue()]);

	// Find options for this column
	const options = useMemo(() => {
		if (filterOptions?.selectType?.key?.includes(column.id)) {
			return filterOptions.selectType.value.find((v) => v.id === column.id)?.value || [];
		}

		if (filterOptions?.selectMultiple?.key?.includes(column.id)) {
			return filterOptions.selectMultiple.value.find((v) => v.id === column.id)?.value || [];
		}

		if (filterOptions?.selectFilter?.key?.includes(column.id)) {
			return filterOptions.selectFilter.value.find((v) => v.id === column.id)?.value || [];
		}

		return [];
	}, [column.id, filterOptions]);

	const defaultValue = useMemo(() => {
		if (filterOptions?.selectType?.key?.includes(column.id)) {
			return filterOptions.selectType.value.find((v) => v.id === column.id)?.defaultValue;
		}
		return undefined;
	}, [column.id, filterOptions]);

	return (
		<Select
			variant="filled"
			size="small"
			fullWidth
			value={value || defaultValue || ''}
			onChange={(e) => {
				const val = e.target.value;
				setValue(val);
				column.setFilterValue(val === '' ? undefined : val);
			}}
			displayEmpty
			sx={{
				padding: 0,
				borderStartStartRadius: 12,
				borderStartEndRadius: 12,
				borderEndStartRadius: 0,
				borderEndEndRadius: 0,
				backgroundColor: theme.palette.grey[100],
				'&:hover': {
					backgroundColor: theme.palette.grey[100]
				},
				'&.Mui-focused': {
					backgroundColor: theme.palette.grey[200]
				},
				'& .MuiSelect-select': {
					padding: 1,
					fontSize: '0.875rem'
				}
			}}
		>
			<MenuItem value="">
				<em>Tất cả</em>
			</MenuItem>
			{options.map((option: any) => (
				<MenuItem key={option.id} value={option.id?.toString()}>
					{option.name}
				</MenuItem>
			))}
		</Select>
	);
};

const DateFilter = ({ column }: { column: Column<any, any> }) => {
	const [value, setValue] = useState<Dayjs | null>((column.getFilterValue() as string) ? dayjs(column.getFilterValue() as string, 'DD/MM/YYYY') : null);
	const theme = useTheme();

	useEffect(() => {
		const filterValue = column.getFilterValue() as string;
		setValue(filterValue ? dayjs(filterValue, 'DD/MM/YYYY') : null);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column.getFilterValue()]);

	const handleDateChange = (newValue: Dayjs | null) => {
		setValue(newValue);
		const stringValue = newValue ? newValue.format('DD/MM/YYYY') : '';
		column.setFilterValue(stringValue || undefined);
	};

	const handleClear = () => {
		setValue(null);
		column.setFilterValue(undefined);
	};

	return (
		<DatePicker
			format="DD/MM/YYYY"
			value={value}
			onChange={handleDateChange}
			slots={{
				inputAdornment: (adornProps: InputAdornmentProps) => (
					<InputAdornment {...adornProps} sx={{ gap: 1, margin: '0 !important' }}>
						{adornProps.children}
						{value && (
							<IconButton size="small" onClick={handleClear} aria-label="Xóa ngày">
								<Clear fontSize="small" />
							</IconButton>
						)}
					</InputAdornment>
				)
			}}
			slotProps={{
				textField: {
					variant: 'filled',
					size: 'small',
					fullWidth: true,
					placeholder: 'Chọn ngày...',
					sx: {
						'& .MuiPickersInputBase-root': {
							borderStartStartRadius: 12,
							borderStartEndRadius: 12,
							borderEndStartRadius: 0,
							borderEndEndRadius: 0,
							backgroundColor: theme.palette.grey[100],
							'&:hover': {
								backgroundColor: theme.palette.grey[100]
							},
							'&.Mui-focused': {
								backgroundColor: theme.palette.grey[200]
							},
							'& .MuiPickersSectionList-root': {
								padding: 1
							},
							'& .MuiInputAdornment-root': {
								margin: '0 !important'
							}
						},
						'& .MuiPickersFilledInput-root': {
							'&:hover:not(.Mui-disabled, .Mui-error)': {
								'&::before': {
									borderBottomColor: theme.palette.primary.light
								}
							}
						}
					}
				}
			}}
		/>
	);
};
