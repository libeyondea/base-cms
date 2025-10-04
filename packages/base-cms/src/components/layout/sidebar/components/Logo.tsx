import { useContext } from 'react';

import { Box, SxProps } from '@mui/material';

import Links from './Links';
import { SidebarContext } from './Sidebar';

type LogoProps = {
	img: string;
	href?: string;
	component?: React.ElementType;
	sx?: SxProps;
	width?: string | number;
	height?: string | number;
};

const Logo = ({ img, href = '/', component, sx, width, height }: LogoProps) => {
	const customizer = useContext(SidebarContext);

	return (
		<Links href={href} component={component} to={href}>
			<Box
				component="span"
				sx={{
					...sx,
					whiteSpace: 'nowrap',
					overflow: 'hidden',
					WebkitLineClamp: 1,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					p: 1,
					textOverflow: 'ellipsis',
					textAlign: 'center',
					width: width || '100%',
					height: height || '64px',
					'& img': {
						maxWidth: '100%',
						maxHeight: '100%',
						width: 'auto',
						height: 'auto',
						objectFit: 'contain',
						display: 'block'
					}
				}}
			>
				<img src={img} alt="logo" />
			</Box>
		</Links>
	);
};

export { Logo };
