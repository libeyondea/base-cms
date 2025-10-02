import { Skeleton, TableCell, TableRow } from '@mui/material';

interface TableSkeletonRowProps {
	colSpan: number;
	rowCount?: number;
}

export const TableSkeletonRow: React.FC<TableSkeletonRowProps> = ({ colSpan, rowCount = 5 }) => {
	return (
		<>
			{Array(rowCount)
				.fill(null)
				.map((_, index) => (
					<TableRow key={index}>
						<TableCell colSpan={colSpan}>
							<Skeleton animation="wave" height={40} width="100%" sx={{ my: 0.5 }} />
						</TableCell>
					</TableRow>
				))}
		</>
	);
};

export default TableSkeletonRow;
