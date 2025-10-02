import { styled } from '@mui/material';
import { Link } from 'react-router-dom';

const LinkStyled = styled(Link)(() => ({
	height: '70px',
	width: 'auto',
	overflow: 'hidden',
	display: 'block'
}));

const Logo = () => {
	return (
		<LinkStyled to="/">
			<img src="/images/logo.png" alt="logo" height={70} />
		</LinkStyled>
	);
};

export default Logo;
