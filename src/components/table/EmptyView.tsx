import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import { Box, TableCell, TableRow, Typography } from '@mui/material';

interface EmptyViewProps {
	colSpan: number;
	message?: string;
}

export const EmptyView = ({ colSpan, message = 'Không có dữ liệu' }: EmptyViewProps) => {
	return (
		<TableRow>
			<TableCell sx={{ textAlign: 'center', py: 5 }} colSpan={colSpan}>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center'
					}}
				>
					<SentimentDissatisfiedIcon color="action" style={{ fontSize: 60, opacity: 0.6 }} />
					<Typography color="text.secondary">{message}</Typography>
				</Box>
			</TableCell>
		</TableRow>
	);
};

export default EmptyView;
