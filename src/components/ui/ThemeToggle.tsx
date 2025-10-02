import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton, Tooltip } from '@mui/material';

import { useTheme } from '~/contexts/ThemeContext';

const ThemeToggle = () => {
	const { mode, toggleTheme } = useTheme();

	return (
		<Tooltip title={mode === 'light' ? 'Chuyển sang chế độ tối' : 'Chuyển sang chế độ sáng'}>
			<IconButton onClick={toggleTheme} color="inherit" size="small">
				{mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
			</IconButton>
		</Tooltip>
	);
};

export default ThemeToggle;
