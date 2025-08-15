import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { Box, IconButton, Stack, Toolbar, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface TableToolbarProps {
	title?: string;
	subtitle?: string;
	onDelete?: () => void;
	onResetFilter?: () => void;
	selectedRowCount?: number;
	actions?: React.ReactNode;
}

export const TableToolbar: React.FC<TableToolbarProps> = ({ title, subtitle, onDelete, onResetFilter, selectedRowCount = 0, actions }) => {
	const hasSelected = selectedRowCount > 0;

	return (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				py: 1,
				...(hasSelected && {
					bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.mode === 'light' ? 0.1 : 0.2)
				}),
				display: 'flex',
				flexDirection: { xs: 'column', md: 'row' },
				alignItems: { xs: 'flex-start', md: 'center' },
				justifyContent: 'space-between',
				gap: 1
			}}
		>
			{/* Left side: Title & selected count */}
			<Stack spacing={0.5}>
				{title && (
					<Typography variant="h6" component="div">
						{title}
					</Typography>
				)}

				{subtitle && !hasSelected && (
					<Typography variant="body2" color="text.secondary">
						{subtitle}
					</Typography>
				)}

				{hasSelected && (
					<Typography variant="subtitle1" component="div">
						{selectedRowCount} selected
					</Typography>
				)}
			</Stack>

			{/* Right side: Actions */}
			<Box display="flex" gap={1} alignItems="center" flexWrap="wrap">
				{/* Selected rows delete action */}
				{hasSelected && onDelete && (
					<Tooltip title="Delete">
						<IconButton onClick={onDelete}>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				)}

				{/* Reset filters */}
				{onResetFilter && (
					<Tooltip title="Reset filters">
						<IconButton onClick={onResetFilter}>
							<RefreshIcon />
						</IconButton>
					</Tooltip>
				)}

				{/* Custom actions */}
				{actions}
			</Box>
		</Toolbar>
	);
};

export default TableToolbar;
