import { Box, Tooltip, Typography } from '@mui/material';

interface FormLabelProps {
	title: string;
	/** Thông tin mô tả, hiển thị khi hover vào label */
	info?: string;
	children: React.ReactNode;
}

export const FormLabel = ({ title, info, children }: FormLabelProps) => {
	const titleContent = (
		<Typography
			sx={{ fontSize: '14px', fontWeight: 600, cursor: info ? 'help' : 'default' }}
			color="rgba(30, 30, 30, 0.8)"
		>
			{title}
		</Typography>
	);

	return (
		<Box display="flex" justifyContent="center" flexDirection="column" alignItems="left" gap={0.5} width="100%">
			{info ? (
				<Tooltip
					title={info}
					placement="top"
					arrow
					slotProps={{
						tooltip: {
							sx: { fontSize: '13px', maxWidth: 300, padding: '8px 12px' }
						}
					}}
				>
					{titleContent}
				</Tooltip>
			) : (
				titleContent
			)}
			{children}
		</Box>
	);
};

