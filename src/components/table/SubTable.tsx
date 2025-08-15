import { Box, Collapse, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import { Row } from '@tanstack/react-table';

interface SubTableProps<T> {
	parentRow: Row<T>;
	data: any[];
	colSpan: number;
	renderSubTable?: (row: any) => React.ReactNode;
}

export function SubTable<T extends Record<string, any>>({ parentRow, data = [], colSpan, renderSubTable }: SubTableProps<T>) {
	const theme = useTheme();

	if (!data.length) return null;

	return (
		<TableRow sx={{ height: 0 }}>
			{/* Spacer cell for expand icon */}
			<TableCell sx={{ p: 0, border: 0 }} />
			{/* Content cell for expanded row */}
			<TableCell
				colSpan={colSpan - 1}
				sx={{
					paddingTop: 0,
					paddingBottom: 0,
					paddingLeft: '1rem',
					paddingRight: 0,
					background: parentRow.getIsSelected() ? theme.palette.primary.main : '#212B36'
				}}
			>
				<Collapse in={true} timeout="auto" unmountOnExit>
					<Box
						sx={{
							borderLeft: '2px solid',
							borderLeftColor: theme.palette.primary.main,
							py: 2
						}}
					>
						{renderSubTable ? (
							// Custom rendering
							renderSubTable(data)
						) : (
							// Default table rendering
							<DefaultSubTable data={data} parentRowIsSelected={parentRow.getIsSelected()} />
						)}
					</Box>
				</Collapse>
			</TableCell>
		</TableRow>
	);
}

interface DefaultSubTableProps {
	data: any[];
	parentRowIsSelected: boolean;
}

function DefaultSubTable({ data, parentRowIsSelected }: DefaultSubTableProps) {
	const theme = useTheme();

	// Get all keys from the first data item to use as columns
	const columns = data.length > 0 ? Object.keys(data[0]).filter((key) => !key.startsWith('_')) : [];

	if (columns.length === 0) return null;

	return (
		<Table size="small">
			<TableHead>
				<TableRow>
					{columns.map((column) => (
						<TableCell
							key={column}
							sx={{
								color: theme.palette.primary.main,
								py: 1,
								whiteSpace: 'nowrap',
								fontWeight: 'bold'
							}}
						>
							{column.charAt(0).toUpperCase() + column.slice(1).replace(/([A-Z])/g, ' $1')}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.map((row, rowIndex) => (
					<TableRow
						key={rowIndex}
						hover
						sx={{
							backgroundColor: parentRowIsSelected ? alpha(theme.palette.primary.main, 0.1) : 'inherit'
						}}
					>
						{columns.map((column, colIndex) => (
							<TableCell
								key={`${rowIndex}-${colIndex}`}
								sx={{
									py: 1,
									whiteSpace: 'nowrap'
								}}
							>
								<Typography variant="body2">{row[column]}</Typography>
							</TableCell>
						))}
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}

// Utility function for styling
const alpha = (color: string, opacity: number) => {
	const _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
	return color + _opacity.toString(16).toUpperCase().padStart(2, '0');
};

export default SubTable;
