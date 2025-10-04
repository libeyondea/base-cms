import { Box, Typography } from '@mui/material';

interface FormLabelProps {
	title: string;
	children: React.ReactNode;
}

export const FormLabel = ({ title, children }: FormLabelProps) => {
	return (
		<Box display="flex" justifyContent="center" flexDirection="column" alignItems="left" gap={0.5} width="100%">
			<Typography sx={{ fontSize: '14px', fontWeight: 600 }} color="rgba(30, 30, 30, 0.8)">
				{title}
			</Typography>
			{children}
		</Box>
	);
};
