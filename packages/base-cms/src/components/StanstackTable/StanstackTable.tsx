import { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Box,
	Checkbox,
	IconButton,
	SxProps,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TableSortLabel,
	Theme,
	useTheme
} from '@mui/material';
import {
	ColumnDef,
	ColumnFiltersState,
	ExpandedState,
	SortingState,
	Row as TanStackRow,
	VisibilityState,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable
} from '@tanstack/react-table';

import { DefaultColumnFilter } from './components/DefaultColumnFilter';
import { EmptyView } from './components/EmptyView';
import { Row, getStyleCellAction } from './components/Row';
import { TableSkeletonRow } from './components/TableSkeletonRow';

export interface CustomAction<T> {
	label: string;
	icon: React.ReactNode;
	onClick: (params: { ids: string[]; row: T }) => void;
	show?: (params: { ids: string[]; row: T }) => boolean;
	color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
	disabled?: (params: { ids: string[]; row: T }) => boolean;
	tooltip?: string;
}

export interface MenuActionProps<T> {
	// Row action handlers
	onEdit?: (params: { ids: string[]; row: T }) => void;
	onDelete?: (params: { ids: string[]; row: T }) => void;
	onView?: (params: { ids: string[]; row: T }) => void;
	onApprove?: (params: { ids: string[]; row: T }) => void;
	onDeny?: (params: { ids: string[]; row: T }) => void;
	onToggleBlock?: (params: { ids: string[]; row: T }) => void;
	onPermission?: (params: { ids: string[]; row: T }) => void;
	onDownLoad?: (params: { ids: string[]; row: T }) => void;
	onChangePassword?: (params: { ids: string[]; row: T }) => void;
	onViewCamera?: (params: { ids: string[]; row: T }) => void;
	onAssign?: (params: { ids: string[]; row: T }) => void;
	onGenerateFaceModel?: (params: { ids: string[]; row: T }) => void;

	// Show action functions
	showEdit?: (params: { ids: string[]; row: T }) => boolean;
	showDelete?: (params: { ids: string[]; row: T }) => boolean;
	showView?: (params: { ids: string[]; row: T }) => boolean;
	showApprove?: (params: { ids: string[]; row: T }) => boolean;
	showDeny?: (params: { ids: string[]; row: T }) => boolean;
	showToggleBlock?: (params: { ids: string[]; row: T }) => boolean;
	showPermission?: (params: { ids: string[]; row: T }) => boolean;
	showDownload?: (params: { ids: string[]; row: T }) => boolean;
	showChangePassword?: (params: { ids: string[]; row: T }) => boolean;
	showViewCamera?: (params: { ids: string[]; row: T }) => boolean;
	showAssign?: (params: { ids: string[]; row: T }) => boolean;
	showGenerateFaceModel?: (params: { ids: string[]; row: T }) => boolean;

	// Custom actions array
	customActions?: CustomAction<T>[];
}

export interface StanstackTableProps<T extends Record<string, any>> {
	columns: ColumnDef<T, any>[];
	data: T[];
	isLoading?: boolean;
	isFetching?: boolean;
	onRowClick?: (row: TanStackRow<T>) => void;
	toolbarProps?: {
		title?: string;
		subtitle?: string;
		actions?: React.ReactNode;
	};
	keyName: string;
	disableCheckbox?: boolean;
	enableExpand?: boolean;
	hiddenColumns?: string[];
	onSelectedRows?: (selectedRows: T[]) => void;
	hidePagination?: boolean;
	keySubRow?: string;
	renderSubTable?: (row: T) => React.ReactNode;
	initRowSelected?: Record<string, boolean>;
	onFetchData?: (options: { pageIndex: number; pageSize: number; sortBy: SortingState; filters: ColumnFiltersState; otherFilters?: any[] }) => void;
	filterOptions?: {
		none?: string[];
		selectMultiple?: { key: string[]; value: { id: string; value: any[] }[] };
		selectType?: { key: string[]; value: { id: string; value: any[]; defaultValue?: any }[]; labelName?: string };
		selectFilter?: { key: string[]; value: { id: string; value: any[] }[] };
		dateType?: string[];
		fromToDateType?: string[];
	};
	renderCustomFilter?: (key: string, props: any) => React.ReactNode;
	customPageSize?: number;
	keepPreviousSearchAndFilter?: boolean;
	headerColors?: string;
	isSortedColumn?: boolean;
	isRowAction?: boolean;
	rowId?: string;
	totalCount?: number;
	manualPagination?: boolean;
	manualSortBy?: boolean;
	manualFilters?: boolean;
	menuActions?: MenuActionProps<T>;
	sxTableContainer?: SxProps<Theme>;
	enableMultiRowSelection?: boolean;
	enableLoadingUpdate?: boolean;
}

export const StanstackTable = <T extends Record<string, any>>({
	columns,
	data,
	isLoading = false,
	isFetching = false,
	onRowClick,
	// toolbarProps,
	// keyName,
	disableCheckbox = false,
	enableExpand = false,
	hiddenColumns = [],
	onSelectedRows,
	hidePagination = false,
	keySubRow = '',
	// renderSubTable,
	initRowSelected = {},
	onFetchData,
	filterOptions,
	renderCustomFilter,
	customPageSize = 10,
	headerColors,
	isSortedColumn = true,
	isRowAction = true,
	rowId = 'id',
	totalCount = 0,
	manualPagination = true,
	manualSortBy = true,
	manualFilters = true,
	menuActions = {},
	sxTableContainer = {},
	enableMultiRowSelection = true,
	enableLoadingUpdate = false
}: StanstackTableProps<T>) => {
	const theme = useTheme();

	// Auto determine header color based on theme if not provided
	const dynamicHeaderColors = headerColors || theme.palette.primary.main;
	const tableRef = useRef<HTMLDivElement>(null);

	// State
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [rowSelection, setRowSelection] = useState({});
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: customPageSize
	});
	const [expanded, setExpanded] = useState<ExpandedState>({});
	const [clickedRowId, setClickedRowId] = useState<string | null>(null);

	// Build dynamic columns: selection and expand
	const tableColumns = useMemo(() => {
		const result: ColumnDef<T, any>[] = [...columns];

		// Selection column
		if (!disableCheckbox) {
			const hasSelectColumn = result.some((col) => col.id === 'select');
			if (!hasSelectColumn) {
				const selectionColumn: ColumnDef<T> = {
					id: 'select',
					header: ({ table }) =>
						enableMultiRowSelection ? (
							<Checkbox
								indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
								checked={table.getIsAllPageRowsSelected()}
								onChange={table.getToggleAllPageRowsSelectedHandler()}
							/>
						) : null,
					cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} onClick={(e) => e.stopPropagation()} />
				};

				result.unshift(selectionColumn);
			}
		}

		// Expand column
		if (enableExpand) {
			const hasExpandColumn = result.some((col) => col.id === 'expand');
			if (!hasExpandColumn) {
				const expandColumn: ColumnDef<T> = {
					id: 'expand',
					header: () => null,
					cell: ({ row }) => {
						const canExpand = row?.getCanExpand?.() ?? false;
						const toggle = row.getToggleExpandedHandler?.() ?? (() => {});
						return (
							<IconButton
								size="small"
								onClick={(e) => {
									e.stopPropagation();
									toggle();
								}}
								disabled={!canExpand}
								style={{ marginLeft: (row.depth ?? 0) * 16 }}
							>
								{row.getIsExpanded() ? <ExpandLessIcon fontSize="small" /> : canExpand ? <ExpandMoreIcon fontSize="small" /> : null}
							</IconButton>
						);
					}
				};

				result.unshift(expandColumn);
			}
		}

		return result;
	}, [columns, disableCheckbox, enableExpand, enableMultiRowSelection]);

	// Initialize column visibility based on hidden columns
	useEffect(() => {
		// Tạo một đối tượng mới cho column visibility
		const newColumnVisibility = { ...columnVisibility };
		let hasChanges = false;

		// Đặt cờ hiddenColumns
		hiddenColumns.forEach((col) => {
			if (newColumnVisibility[col] !== false) {
				newColumnVisibility[col] = false;
				hasChanges = true;
			}
		});

		// Hide checkbox column if needed
		if (disableCheckbox && newColumnVisibility.select !== false) {
			newColumnVisibility.select = false;
			hasChanges = true;
		}

		// Hide expand column if needed
		if (!enableExpand && newColumnVisibility.expand !== false) {
			newColumnVisibility.expand = false;
			hasChanges = true;
		}

		// Chỉ cập nhật state nếu có thay đổi
		if (hasChanges) {
			setColumnVisibility(newColumnVisibility);
		}
	}, [hiddenColumns, disableCheckbox, enableExpand, columnVisibility]);

	// Initialize row selection from props
	useEffect(() => {
		if (Object.keys(initRowSelected).length) {
			setRowSelection(initRowSelected);
		}
	}, [initRowSelected]);

	// Setup table instance with TanStack Table
	const table = useReactTable({
		data,
		columns: tableColumns,
		state: {
			sorting,
			columnFilters,
			rowSelection,
			columnVisibility,
			pagination,
			expanded
		},
		enableRowSelection: true,
		enableMultiRowSelection,
		manualPagination,
		manualSorting: manualSortBy,
		manualFiltering: manualFilters,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		onRowSelectionChange: setRowSelection,
		onColumnVisibilityChange: setColumnVisibility,
		onPaginationChange: setPagination,
		onExpandedChange: setExpanded,
		getRowId: (row) => row[rowId],
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSubRows: (row) => (enableExpand && keySubRow ? (row?.[keySubRow] ?? []) : []),
		getExpandedRowModel: getExpandedRowModel(),
		pageCount: manualPagination ? Math.ceil(totalCount / pagination.pageSize) : undefined
	});

	// Fetch data when table state changes
	useEffect(() => {
		if (onFetchData) {
			onFetchData({
				pageIndex: pagination.pageIndex,
				pageSize: pagination.pageSize,
				sortBy: sorting,
				filters: columnFilters
			});
		}
	}, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters, onFetchData]);

	// Notify on row selection change
	useEffect(() => {
		if (onSelectedRows) {
			const selectedRows = table.getSelectedRowModel().rows.map((row) => row.original);
			onSelectedRows(selectedRows);
		}
	}, [rowSelection, onSelectedRows, table]);

	// Handle row click
	const handleRowClick = (row: TanStackRow<T>) => {
		const rowId = row.id;
		setClickedRowId(rowId);
		onRowClick?.(row);
	};

	// Get visible columns
	const visibleColumns = table.getAllColumns().filter((column) => column.getIsVisible());

	return (
		<Box sx={{ width: '100%' }} position="relative">
			{/* Table */}
			<TableContainer
				sx={{
					// minHeight: data.length ? Math.min(data.length * 45 + 60, window.innerHeight - (hidePagination ? 152 : 206)) : 200,
					maxHeight: 'calc(100vh - 64px - 76px - 64px - 2px)',
					borderRadius: 1,
					...sxTableContainer
				}}
				ref={tableRef}
			>
				<Table size="small" stickyHeader>
					<TableHead>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									// Handle different column types
									if (header.id === 'select') {
										return (
											<TableCell
												key={header.id}
												padding="checkbox"
												sx={{
													backgroundColor: theme.palette.background.paper,
													'&.MuiTableCell-paddingCheckbox': {
														pl: '0px !important',
														pr: '0px !important'
													}
												}}
												align="center"
											>
												<Checkbox
													indeterminate={table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
													checked={table.getIsAllPageRowsSelected()}
													onChange={table.getToggleAllPageRowsSelectedHandler()}
												/>
											</TableCell>
										);
									}

									if (header.id === 'expand') {
										return <TableCell key={header.id} padding="checkbox" sx={{ backgroundColor: theme.palette.background.paper }} />;
									}

									if (header.id === 'actions') {
										return (
											<TableCell
												className="cell-fix-last"
												key={header.id}
												align="center"
												sx={{
													...getStyleCellAction(theme),
													backgroundColor: theme.palette.background.paper,
													whiteSpace: 'nowrap',
													minWidth: 120
												}}
											>
												{flexRender(header.column.columnDef.header, header.getContext())}
											</TableCell>
										);
									}

									return (
										<TableCell
											key={header.id}
											sx={{
												backgroundColor: theme.palette.background.paper,
												whiteSpace: 'nowrap'
											}}
										>
											{header.column.getCanSort() && isSortedColumn ? (
												<TableSortLabel
													active={header.column.getIsSorted() !== false}
													direction={header.column.getIsSorted() === 'desc' ? 'desc' : 'asc'}
													onClick={header.column.getToggleSortingHandler()}
												>
													<span style={{ color: dynamicHeaderColors }}>
														{flexRender(header.column.columnDef.header, header.getContext())}
													</span>
												</TableSortLabel>
											) : (
												<span style={{ color: dynamicHeaderColors }}>
													{flexRender(header.column.columnDef.header, header.getContext())}
												</span>
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))}

						{/* Filter row */}
						{filterOptions && (
							<TableRow>
								{visibleColumns.map((column) => {
									if (column.id === 'select' || column.id === 'expand' || column.id === 'actions') {
										return (
											<TableCell
												key={column.id}
												padding="none"
												className="cell-fix-last"
												sx={column.id === 'actions' ? getStyleCellAction(theme) : {}}
											/>
										);
									}

									// Render custom filter based on column type
									return (
										<TableCell key={column.id} padding="normal">
											{renderCustomFilter ? (
												renderCustomFilter(column.id, { column })
											) : filterOptions.none?.includes(column.id) ? (
												<></>
											) : (
												<DefaultColumnFilter column={column} filterOptions={filterOptions} />
											)}
										</TableCell>
									);
								})}
							</TableRow>
						)}
					</TableHead>

					<TableBody>
						{/* Fetching state */}
						{(isFetching || (enableLoadingUpdate && isLoading)) && <TableSkeletonRow colSpan={visibleColumns.length} />}

						{/* Empty state */}
						{!isFetching && data.length === 0 && <EmptyView colSpan={visibleColumns.length} />}

						{/* Table data */}
						{!isFetching &&
							table.getRowModel().rows.map((row, index) => (
								<Fragment key={row.id || index}>
									<Row<T> row={row} onRowClick={handleRowClick} isRowAction={isRowAction} clickedRowId={clickedRowId} {...menuActions} />
								</Fragment>
							))}
					</TableBody>
				</Table>
			</TableContainer>

			{/* Pagination */}
			{!hidePagination && (
				<TablePagination
					component="div"
					rowsPerPageOptions={[10, 20, 50, 100, 200]}
					count={manualPagination ? totalCount : data.length}
					rowsPerPage={pagination.pageSize}
					page={pagination.pageIndex}
					onPageChange={(_, newPage) => {
						setPagination((prev) => ({ ...prev, pageIndex: newPage }));
					}}
					onRowsPerPageChange={(event) => {
						setPagination({
							pageIndex: 0,
							pageSize: parseInt(event.target.value, 10)
						});
					}}
					labelRowsPerPage="Hiển thị mỗi trang:"
					labelDisplayedRows={({ from, to, count }) => `${from}-${to} trong ${count !== -1 ? count : `hơn ${to}`}`}
				/>
			)}
		</Box>
	);
};
