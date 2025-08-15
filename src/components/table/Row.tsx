import React, { useRef, useState } from 'react';

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import BlockIcon from '@mui/icons-material/Block';
import CheckIcon from '@mui/icons-material/Check';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
// MUI Icons
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Box, CircularProgress, IconButton, Popover, TableCell, TableRow, Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import { flexRender } from '@tanstack/react-table';
import type { Row as TanStackRow } from '@tanstack/react-table';

import { MenuActionProps } from './StanstackTable';

// Styling for action cell
export const styleCellAction = {
	position: 'sticky',
	backgroundColor: '#fff',
	top: 0,
	right: 0,
	zIndex: 2,
	'&.cell-fix-last': {
		background: '#fff',
		'&::after': {
			boxShadow: 'inset -10px 0 8px -8px #00000026',
			position: 'absolute',
			top: 0,
			left: 0,
			bottom: -1,
			width: 30,
			transform: 'translate(-100%)',
			transition: 'box-shadow .5s',
			pointerEvents: 'none',
			content: '""'
		}
	}
};

export interface RowProps<T> extends MenuActionProps<T> {
	row: TanStackRow<T>;
	onRowClick?: (row: TanStackRow<T>) => void;
	isRowAction?: boolean;
	rowSelected?: { key: string; value: any };
	toolipTitle?: string;
}

export function Row<T extends Record<string, any>>({ row, onRowClick, isRowAction = true, rowSelected, toolipTitle = '', ...menuProps }: RowProps<T>) {
	const theme = useTheme();
	const rowRef = useRef<HTMLTableRowElement>(null);

	// Check if row is selected based on external criteria
	const isSelected = rowSelected && row.original ? row.original[rowSelected.key] === rowSelected.value : false;

	return (
		<Tooltip title={toolipTitle || ''} placement="bottom">
			<TableRow
				ref={rowRef}
				hover
				role="checkbox"
				tabIndex={-1}
				selected={row.getIsSelected() || isSelected}
				onClick={(e) => {
					if (onRowClick?.(row)) {
						e.preventDefault();
						e.stopPropagation();
						onRowClick?.(row);
					}
				}}
				sx={{
					textDecoration: 'none',
					cursor: onRowClick ? 'pointer' : 'auto',
					height: 'auto',
					position: 'relative',
					'&:hover': {
						backgroundColor:
							row.original?.errorCode === '0' || row.original.errorCode === undefined ? 'rgba(0, 131, 69, 0.05) !important' : '#ffe5cc!important'
					},
					backgroundColor:
						row.getIsSelected() || isSelected
							? alpha(theme.palette.primary.main, 0.2)
							: row.original?.errorCode === '0' || row.original.errorCode === undefined
								? 'white'
								: '#ffe5cc'
				}}
			>
				{row.getVisibleCells().map((cell) => {
					// Special handling for action cell
					if (cell.column.id === 'actions') {
						return (
							<TableCell key={cell.id} size="small" className="cell-fix-last" sx={{ ...styleCellAction, height: 45, textAlign: 'center' }}>
								<ActionMenu cell={cell} isRowAction={isRowAction} {...menuProps} />
							</TableCell>
						);
					}

					// Regular cell
					return (
						<TableCell
							key={cell.id}
							size="small"
							sx={{
								whiteSpace: 'nowrap',
								height: 45,
								...((cell.column.columnDef.meta as any)?.sx || {})
							}}
							align="left"
							padding={cell.column.id === 'select' || cell.column.id === 'expand' ? 'none' : 'normal'}
						>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</TableCell>
					);
				})}
			</TableRow>
		</Tooltip>
	);
}

interface ActionMenuProps<T> extends MenuActionProps<T> {
	cell: any;
	isRowAction: boolean;
}

function ActionMenu<T>({
	cell,
	isRowAction,
	onEdit,
	onDelete,
	onView,
	onApprove,
	onDeny,
	onToggleBlock,
	onPermission,
	onDownLoad,
	onChangePassword,
	showEdit = () => true,
	showDelete = () => true,
	showView = () => true,
	showApprove = () => true,
	showDeny = () => true,
	showToggleBlock = () => true,
	showPermission = () => true,
	showDownload = () => true,
	showChangePassword = () => true
}: ActionMenuProps<T>) {
	const [item] = useState<T>(cell.row.original);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isOpen, setIsOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsOpen(!isOpen);
		setAnchorEl(e.currentTarget as HTMLElement);
	};

	const handleClose = () => {
		setIsOpen(false);
		setAnchorEl(null);
	};

	const id = cell.row.original.id;

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onDelete?.({ ids: [id], row: item });
		handleClose();
	};

	const handleEdit = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onEdit?.({ ids: [id], row: item });
		handleClose();
	};

	const handleView = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onView?.({ ids: [id], row: item });
		handleClose();
	};

	const handleApprove = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onApprove?.({ ids: [id], row: item });
		handleClose();
	};

	const handleDeny = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onDeny?.({ ids: [id], row: item });
		handleClose();
	};

	const handleToggleBlock = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onToggleBlock?.({ ids: [id], row: item });
		handleClose();
	};

	const handlePermission = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onPermission?.({ ids: [id], row: item });
		handleClose();
	};

	const handleDownload = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			onDownLoad?.({ ids: [id], row: item });
			setIsLoading(false);
			handleClose();
		}, 1500);
	};

	const handleChangePassword = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		onChangePassword?.({ ids: [id], row: item });
		handleClose();
	};

	const menuContent = (
		<Box display="flex" alignItems="center" gap={1} px={1}>
			{onChangePassword && (
				<IconButton
					onClick={handleChangePassword}
					title="Thay đổi mật khẩu"
					size="small"
					color="primary"
					disabled={!showChangePassword({ ids: [id], row: item })}
				>
					<VpnKeyIcon fontSize="small" />
				</IconButton>
			)}

			{onDelete && (
				<IconButton onClick={handleDelete} title="Xóa" size="small" color="error" disabled={!showDelete({ ids: [id], row: item })}>
					<DeleteIcon fontSize="small" />
				</IconButton>
			)}

			{onToggleBlock && (
				<IconButton
					onClick={handleToggleBlock}
					title="Khóa hoặc kích hoạt tài khoản"
					size="small"
					color="secondary"
					disabled={!showToggleBlock({ ids: [id], row: item })}
				>
					{(item as any).status ? <BlockIcon fontSize="small" /> : <CheckCircleIcon fontSize="small" />}
				</IconButton>
			)}

			{onPermission && (
				<IconButton onClick={handlePermission} title="Phân quyền" size="small" color="warning" disabled={!showPermission({ ids: [id], row: item })}>
					<AdminPanelSettingsIcon fontSize="small" />
				</IconButton>
			)}

			{onEdit && (
				<IconButton onClick={handleEdit} title="Chỉnh sửa" size="small" color="info" disabled={!showEdit({ ids: [id], row: item })}>
					<EditIcon fontSize="small" />
				</IconButton>
			)}

			{onDownLoad && (
				<IconButton onClick={handleDownload} title="Tải" size="small" color="primary" disabled={isLoading || !showDownload({ ids: [id], row: item })}>
					{isLoading ? <CircularProgress color="inherit" size={24} /> : <DownloadIcon fontSize="small" />}
				</IconButton>
			)}

			{onApprove && (
				<IconButton onClick={handleApprove} title="Duyệt" size="small" color="success" disabled={!showApprove({ ids: [id], row: item })}>
					<CheckIcon fontSize="medium" />
				</IconButton>
			)}

			{onDeny && (
				<IconButton onClick={handleDeny} title="Từ chối" size="small" color="error" disabled={!showDeny({ ids: [id], row: item })}>
					<CloseIcon fontSize="medium" />
				</IconButton>
			)}

			{onView && (
				<IconButton onClick={handleView} title="Xem chi tiết" size="small" color="warning" disabled={!showView({ ids: [id], row: item })}>
					<VisibilityIcon fontSize="small" />
				</IconButton>
			)}
		</Box>
	);

	return (
		<>
			{isRowAction && (
				<IconButton onClick={toggleMenu} size="small">
					<MoreVertIcon />
				</IconButton>
			)}

			<Popover
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				sx={{ zIndex: 1300 }}
			>
				{menuContent}
			</Popover>
		</>
	);
}

export default Row;
