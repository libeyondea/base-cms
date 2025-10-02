import { useContext } from 'react';

import { Box } from '@mui/material';

import Links from './Links';
import { SidebarContext } from './Sidebar';

type LogoProps = {
	img: string;
	href?: string;
	component?: React.ElementType;
};

const Logo = ({ img, href = '/', component }: LogoProps) => {
	const customizer = useContext(SidebarContext);

	return (
		<Links href={href} component={component} to={href}>
			<Box
				component="span"
				sx={{
					whiteSpace: 'nowrap',
					overflow: customizer.isCollapse ? 'hidden' : 'visible',
					WebkitLineClamp: 1,
					display: 'block',
					p: 1,
					textOverflow: 'ellipsis',
					textAlign: 'center'
				}}
			>
				<img src={img} alt="logo" width="70" height="60" />
			</Box>
		</Links>
	);
};

export { Logo };
