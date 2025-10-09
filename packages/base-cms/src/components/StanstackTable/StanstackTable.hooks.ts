import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table';
import qs from 'qs';

import { useTableContext } from '~/contexts/AppProvider';
import { axiosServices } from '~/utils/axios';

interface UseTableProps {
	apiUrl: string;
	queryKey: string;
	enabled?: boolean;
	multiQueryParam?: Record<string, any>;
	refetchOnWindowFocus?: boolean;
	defaultPageSize?: number;
}

export const useTable = ({ apiUrl, queryKey, enabled = true, multiQueryParam = {}, refetchOnWindowFocus = false, defaultPageSize = 10 }: UseTableProps) => {
	// Get filter state from context
	const { filters: filtersTable } = useTableContext();

	// Table state
	const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: defaultPageSize });
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState<any[]>([]);

	// Get filter current table
	const filterCurrentTable = useMemo(() => {
		return filtersTable?.[queryKey] || {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filtersTable?.[queryKey]]);

	// Data fetching
	const { data, isLoading, isFetching, error, refetch } = useQuery({
		queryKey: [queryKey, pagination, sorting, columnFilters, multiQueryParam, filterCurrentTable, apiUrl],
		enabled,
		queryFn: async () => {
			// Convert to order_by and sorted_by format
			const sortParams = sorting.length
				? {
						order_by: sorting?.[0]?.id || '',
						sorted_by: sorting?.[0]?.desc ? 'desc' : 'asc'
					}
				: {};

			// Build filter params
			const filterParams = columnFilters.reduce((obj: Record<string, any>, item: any) => {
				obj[item.id] = item.value;
				return obj;
			}, {});

			// Combine all params
			const queryParams = qs.stringify({
				...sortParams,
				...multiQueryParam,
				...filterParams,
				...filterCurrentTable.query,
				page: pagination.pageIndex + 1, // API usually expects 1-based index
				limit: pagination.pageSize
			});

			// Make API request
			const response = await axiosServices.get(`${apiUrl}?${queryParams}`);
			return response.data;
		},
		refetchOnWindowFocus,
		staleTime: 0
	});

	// Extract data and pagination info
	const tableData = useMemo(() => data?.data || [], [data?.data]);
	const defaultData = useMemo(() => data || [], [data]);
	const totalCount = useMemo(() => data?.total || 0, [data?.total]);
	const pageCount = Math.ceil(totalCount / pagination.pageSize);

	// Reset page when filters change
	useEffect(() => {
		if (columnFilters.length) {
			setPagination((prev) => ({ ...prev, pageIndex: 0 }));
		}
	}, [columnFilters]);

	// Reset page when filter current table change
	useEffect(() => {
		if (filterCurrentTable?.query) {
			setPagination((prev) => ({ ...prev, pageIndex: 0 }));
		}
	}, [filterCurrentTable?.query]);

	// Helper function to get selected rows data
	const getSelectedRowsData = useCallback(() => {
		return Object.keys(rowSelection)
			.map((id) => tableData.find((row: any) => String(row?.id) === id))
			.filter(Boolean);
	}, [rowSelection, tableData]);

	// Reset selection
	const resetRowSelection = useCallback(() => {
		setRowSelection([]);
	}, []);

	// Auto fetch data handler
	const handleFetchData = useCallback(
		({ pageIndex, pageSize, sortBy, filters }: { pageIndex: number; pageSize: number; sortBy: SortingState; filters: ColumnFiltersState }) => {
			setColumnFilters(filters);
			setSorting(sortBy);

			if (pageIndex !== pagination.pageIndex || pageSize !== pagination.pageSize) {
				setPagination({ pageIndex, pageSize });
			}
		},
		[pagination.pageIndex, pagination.pageSize]
	);

	const handleSetRowSelection = useCallback(
		(selectionModel: any[]) => {
			setRowSelection(selectionModel);
		},
		[setRowSelection]
	);

	return {
		// Data
		tableData,
		defaultData,
		isLoading,
		isFetching,
		error,
		refetch,
		totalCount,
		pageCount,

		// State
		pagination,
		setPagination,
		sorting,
		setSorting,
		columnFilters,
		setColumnFilters,

		rowSelection,
		setRowSelection,

		// Helpers
		getSelectedRowsData,
		resetRowSelection,
		selectedRowCount: Object.keys(rowSelection).length,

		// Auto fetch data handler
		handleFetchData,
		handleSetRowSelection
	};
};
