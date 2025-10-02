import { createContext, useContext, useEffect, useState } from 'react';

import { CssBaseline } from '@mui/material';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { createCustomTheme } from '~/theme';

interface ThemeContextType {
	mode: PaletteMode;
	toggleTheme: () => void;
	setThemeMode: (mode: PaletteMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
	children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
	// Initialize with light theme to prevent hydration mismatch
	const [mode, setMode] = useState<PaletteMode>('light');
	const [isInitialized, setIsInitialized] = useState(false);
	const theme = createTheme(createCustomTheme(mode));

	// Initialize theme from localStorage or system preference
	useEffect(() => {
		const initializeTheme = () => {
			try {
				// First check localStorage
				const savedTheme = localStorage.getItem('themeMode') as PaletteMode;

				if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
					setMode(savedTheme);
				} else {
					// Fallback to system preference
					const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					const systemTheme: PaletteMode = systemPrefersDark ? 'dark' : 'light';
					setMode(systemTheme);
					// Save system preference to localStorage
					localStorage.setItem('themeMode', systemTheme);
				}
			} catch (error) {
				console.warn('Failed to initialize theme:', error);
				// Fallback to light theme
				setMode('light');
			} finally {
				setIsInitialized(true);
			}
		};

		initializeTheme();
	}, []);

	// Save theme changes to localStorage
	useEffect(() => {
		if (isInitialized) {
			try {
				localStorage.setItem('themeMode', mode);
			} catch (error) {
				console.warn('Failed to save theme:', error);
			}
		}
	}, [mode, isInitialized]);

	const toggleTheme = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	const setThemeMode = (newMode: PaletteMode) => {
		setMode(newMode);
	};

	const value = {
		mode,
		toggleTheme,
		setThemeMode
	};

	return (
		<ThemeContext.Provider value={value}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a CustomThemeProvider');
	}
	return context;
};
