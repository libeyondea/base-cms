import { useCallback, useEffect, useMemo, useState } from 'react';

import { MenuItem, Select, TextField } from '@mui/material';
import { Column } from '@tanstack/react-table';
import { debounce } from 'lodash';

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

export const DefaultColumnFilter: React.FC<DefaultColumnFilterProps> = ({ column, filterOptions }) => {
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
			variant="outlined"
			size="small"
			fullWidth
			value={value}
			onChange={(e) => {
				const val = e.target.value;
				setValue(val);
				updateFilter(val);
			}}
			placeholder={`Tìm kiếm...`}
		/>
	);
};

const SelectFilter = ({ column, filterOptions }: DefaultColumnFilterProps) => {
	const [value, setValue] = useState((column.getFilterValue() as string) || '');

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
			variant="outlined"
			size="small"
			fullWidth
			value={value || defaultValue || ''}
			onChange={(e) => {
				const val = e.target.value;
				setValue(val);
				column.setFilterValue(val === '' ? undefined : val);
			}}
			displayEmpty
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
	const [value, setValue] = useState<any>((column.getFilterValue() as string) || '');

	useEffect(() => {
		setValue((column.getFilterValue() as string) || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [column.getFilterValue()]);

	return (
		<TextField
			type="date"
			variant="outlined"
			size="small"
			fullWidth
			value={value}
			onChange={(e) => {
				const val = e.target.value;
				setValue(val);
				column.setFilterValue(val || undefined);
			}}
		/>
	);
};

export default DefaultColumnFilter;
