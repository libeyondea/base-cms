import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

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

// Table Context Types
interface TableContextType {
	filters: {
		[key: string]: {
			query: {
				[key: string]: string | number;
			};
		};
	};
	setFilterTable: (payload: { type: string; value: Record<string, string | number> }) => void;
}

// Combined App Context Type
interface AppContextType {
	// Theme
	theme: ThemeContextType;
	// Sidebar
	sidebar: SidebarContextType;
	// Table
	table: TableContextType;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
	children: ReactNode;
	customTheme?: (mode: PaletteMode) => any;
}

export const AppProvider = ({ children, customTheme }: AppProviderProps) => {
	// Theme state
	const [mode, setMode] = useState<PaletteMode>('light');
	const [isInitialized, setIsInitialized] = useState(false);

	// Use custom theme if provided, otherwise use default theme
	const themeConfig = customTheme ? customTheme(mode) : createCustomTheme(mode);
	const theme = createTheme(themeConfig);

	// Sidebar state
	const [drawerOpen, setDrawerOpen] = useState(false);

	// Table state
	const [filters, setFilters] = useState<{
		[key: string]: {
			query: {
				[key: string]: string | number;
			};
		};
	}>({});

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

	// Table functions
	const setFilterTable = (payload: { type: string; value: Record<string, string | number> }) => {
		setFilters((prevFilters) => {
			const isExistKey = Object.prototype.hasOwnProperty.call(prevFilters, payload?.type);
			const query = payload?.value || {};

			if (isExistKey) {
				return {
					...prevFilters,
					[payload.type]: {
						query: { ...prevFilters[payload.type]?.query, ...query }
					}
				};
			} else {
				return {
					...prevFilters,
					[payload.type]: {
						query
					}
				};
			}
		});
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

	const tableContextValue: TableContextType = {
		filters,
		setFilterTable
	};

	const appContextValue: AppContextType = {
		theme: themeContextValue,
		sidebar: sidebarContextValue,
		table: tableContextValue
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

// Table hook
export const useTableContext = (): TableContextType => {
	const context = useContext(AppContext);
	if (!context) {
		throw new Error('useTable must be used within an AppProvider');
	}
	return context.table;
};
