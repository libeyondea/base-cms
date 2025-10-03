import { Box, Typography } from '@mui/material';

export interface IFormLabelProps {
	title: string;
	children: React.ReactNode;
}

const FormLabel = ({ title, children }: IFormLabelProps) => {
	return (
		<Box display="flex" justifyContent="center" flexDirection="column" alignItems="left" gap={0.5} width="100%">
			<Typography sx={{ fontSize: '14px', fontWeight: 600 }} color="rgba(30, 30, 30, 0.8)">
				{title}
			</Typography>
			{children}
		</Box>
	);
};

export default FormLabel;
