import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { CssBaseline } from '@mui/material';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { createCustomTheme } from '~/theme';

// Theme Context Types
interface ThemeContextType {
	mode: PaletteMode;
	toggleTheme: () => void;
	setThemeMode: (mode: PaletteMode) => void;
}

// Sidebar Context Types
interface SidebarContextType {
	drawerOpen: boolean;
	toggleDrawer: () => void;
	setDrawerOpen: (open: boolean) => void;
}

// Combined App Context Type
interface AppContextType {
	// Theme
	theme: ThemeContextType;
	// Sidebar
	sidebar: SidebarContextType;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
	// Theme state
	const [mode, setMode] = useState<PaletteMode>('light');
	const [isInitialized, setIsInitialized] = useState(false);
	const theme = createTheme(createCustomTheme(mode));

	// Sidebar state
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Theme effects
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

	// Theme functions
	const toggleTheme = () => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	};

	const setThemeMode = (newMode: PaletteMode) => {
		setMode(newMode);
	};

	// Sidebar functions
	const toggleDrawer = () => {
		setDrawerOpen((prev) => !prev);
	};

	// Context values
	const themeContextValue: ThemeContextType = {
		mode,
		toggleTheme,
		setThemeMode
	};

	const sidebarContextValue: SidebarContextType = {
		drawerOpen,
		toggleDrawer,
		setDrawerOpen
	};

	const appContextValue: AppContextType = {
		theme: themeContextValue,
		sidebar: sidebarContextValue
	};

	return (
		<AppContext.Provider value={appContextValue}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<LocalizationProvider dateAdapter={AdapterMoment}>{children}</LocalizationProvider>
			</ThemeProvider>
		</AppContext.Provider>
	);
};

// Theme hook
export const useTheme = (): ThemeContextType => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useTheme must be used within an AppProvider');
	}
	return context.theme;
};

// Sidebar hook
export const useSidebar = (): SidebarContextType => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useSidebar must be used within an AppProvider');
	}
	return context.sidebar;
};
