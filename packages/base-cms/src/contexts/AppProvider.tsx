import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode, Theme, ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import '~/assets/styles/globals.css';
import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';
import { Routes, RoutesConfig } from '~/routes';
import { createCustomTheme } from '~/theme';

// Default QueryClient instance
const defaultQueryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			refetchOnWindowFocus: false
		}
	}
});

// ============================================================
// Theme Context
// ============================================================
interface ThemeContextType {
	theme: Theme;
	mode: PaletteMode;
	toggleTheme: () => void;
	setThemeMode: (mode: PaletteMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeContextProvider = ({ children, customTheme }: { children: ReactNode; customTheme?: (mode: PaletteMode) => any }) => {
	const [mode, setMode] = useState<PaletteMode>('light');
	const [isInitializedTheme, setIsInitializedTheme] = useState(false);

	const themeConfig = customTheme ? customTheme(mode) : createCustomTheme(mode);
	const theme = createTheme(themeConfig);

	// Initialize theme from localStorage or system preference
	useEffect(() => {
		const initializeTheme = () => {
			try {
				const savedTheme = localStorage.getItem('themeMode') as PaletteMode;

				if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
					setMode(savedTheme);
				} else {
					const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
					const systemTheme: PaletteMode = systemPrefersDark ? 'dark' : 'light';
					setMode(systemTheme);
					localStorage.setItem('themeMode', systemTheme);
				}
			} catch (error) {
				console.warn('Failed to initialize theme:', error);
				setMode('light');
			} finally {
				setIsInitializedTheme(true);
			}
		};

		initializeTheme();
	}, []);

	// Save theme changes to localStorage
	useEffect(() => {
		if (isInitializedTheme) {
			try {
				localStorage.setItem('themeMode', mode);
			} catch (error) {
				console.warn('Failed to save theme:', error);
			}
		}
	}, [mode, isInitializedTheme]);

	const toggleTheme = useCallback(() => {
		setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
	}, []);

	const setThemeMode = useCallback((newMode: PaletteMode) => {
		setMode(newMode);
	}, []);

	const value = useMemo<ThemeContextType>(
		() => ({
			theme,
			mode,
			toggleTheme,
			setThemeMode
		}),
		[theme, mode, toggleTheme, setThemeMode]
	);

	return (
		<ThemeContext.Provider value={value}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};

// ============================================================
// Sidebar Context
// ============================================================
interface SidebarContextType {
	drawerOpen: boolean;
	toggleDrawer: () => void;
	setDrawerOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const SidebarContextProvider = ({ children }: { children: ReactNode }) => {
	const [drawerOpen, setDrawerOpen] = useState(false);

	const toggleDrawer = useCallback(() => {
		setDrawerOpen((prev) => !prev);
	}, []);

	const value = useMemo<SidebarContextType>(
		() => ({
			drawerOpen,
			toggleDrawer,
			setDrawerOpen
		}),
		[drawerOpen, toggleDrawer]
	);

	return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

// ============================================================
// Table Context
// ============================================================
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

const TableContext = createContext<TableContextType | undefined>(undefined);

const TableContextProvider = ({ children }: { children: ReactNode }) => {
	const [filters, setFilters] = useState<{
		[key: string]: {
			query: {
				[key: string]: string | number;
			};
		};
	}>({});

	const setFilterTable = useCallback((payload: { type: string; value: Record<string, string | number> }) => {
		setFilters((prevFilters) => {
			const query = payload?.value || {};

			return {
				...prevFilters,
				[payload.type]: {
					query: { ...prevFilters[payload.type]?.query, ...query }
				}
			};
		});
	}, []);

	const value = useMemo<TableContextType>(
		() => ({
			filters,
			setFilterTable
		}),
		[filters, setFilterTable]
	);

	return <TableContext.Provider value={value}>{children}</TableContext.Provider>;
};

// ============================================================
// Auth Context
// ============================================================
interface AuthContextType {
	isAuthenticated: boolean;
	isInitialized: boolean;
	user: any;
	token: string | null;
	signin: (payload: { user: any; token: string }) => void;
	signout: () => void;
	signup: (payload: { user: any }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isInitialized, setIsInitialized] = useState(false);
	const [user, setUser] = useState<any>(null);
	const [token, setToken] = useState<string | null>(null);

	const signin = useCallback((payload: { user: any; token: string }) => {
		setIsAuthenticated(true);
		setIsInitialized(true);
		setUser(payload.user);
		setToken(payload.token);
	}, []);

	const signout = useCallback(() => {
		setIsInitialized(true);
		setIsAuthenticated(false);
		setUser(null);
		setToken(null);
	}, []);

	const signup = useCallback((payload: { user: any }) => {
		setUser(payload.user);
	}, []);

	const value = useMemo<AuthContextType>(
		() => ({
			isAuthenticated,
			isInitialized,
			user,
			token,
			signin,
			signout,
			signup
		}),
		[isAuthenticated, isInitialized, user, token, signin, signout, signup]
	);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// ============================================================
// Custom Context
// ============================================================
interface CustomContextType {
	state: Record<string, any>;
	setCustom: (next: Record<string, any> | ((prev: Record<string, any>) => Record<string, any>)) => void;
	resetCustom: () => void;
}

const CustomContext = createContext<CustomContextType | undefined>(undefined);

const CustomContextProvider = ({ children, initialCustom }: { children: ReactNode; initialCustom?: Record<string, any> }) => {
	const [customState, setCustomState] = useState<Record<string, any>>(initialCustom || {});

	const setCustom: CustomContextType['setCustom'] = useCallback((next) => {
		setCustomState((prev) => (typeof next === 'function' ? (next as (p: Record<string, any>) => Record<string, any>)(prev) : next));
	}, []);

	const resetCustom = useCallback(() => {
		setCustomState(initialCustom || {});
	}, [initialCustom]);

	const value = useMemo<CustomContextType>(
		() => ({
			state: customState,
			setCustom,
			resetCustom
		}),
		[customState, setCustom, resetCustom]
	);

	return <CustomContext.Provider value={value}>{children}</CustomContext.Provider>;
};

// ============================================================
// AppProvider - Compose all contexts
// ============================================================
interface AppProviderProps {
	children?: ReactNode;
	customTheme?: (mode: PaletteMode) => any;
	queryClient?: QueryClient;
	initialCustom?: Record<string, any>;
	// Routes configuration
	routesConfig?: RoutesConfig;
	basename?: string;
	profileAPI?: string;
	redirectPrivateTo?: string;
	redirectAuthTo?: string;
	keyDataProfile?: string;
	/**
	 * @deprecated Sử dụng routesConfig.roleConfig thay vì prop này
	 */
	roleConfig?: RoleConfig;
}

export const AppProvider = ({
	children,
	customTheme,
	queryClient,
	initialCustom,
	routesConfig,
	basename,
	profileAPI = '/profile',
	redirectPrivateTo = '/signin',
	redirectAuthTo = '/',
	keyDataProfile = 'data',
	roleConfig
}: AppProviderProps) => {
	const client = queryClient || defaultQueryClient;

	return (
		<QueryClientProvider client={client}>
			<AuthContextProvider>
				<ThemeContextProvider customTheme={customTheme}>
					<SidebarContextProvider>
						<TableContextProvider>
							<CustomContextProvider initialCustom={initialCustom}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									{routesConfig && (
										<Routes
											config={routesConfig}
											basename={basename}
											profileAPI={profileAPI}
											redirectPrivateTo={redirectPrivateTo}
											redirectAuthTo={redirectAuthTo}
											keyDataProfile={keyDataProfile}
											roleConfig={roleConfig}
										/>
									)}
									{children}
								</LocalizationProvider>
							</CustomContextProvider>
						</TableContextProvider>
					</SidebarContextProvider>
				</ThemeContextProvider>
			</AuthContextProvider>
		</QueryClientProvider>
	);
};

// ============================================================
// Hooks (backward-compatible public API)
// ============================================================

// Theme hook
export const useTheme = (): ThemeContextType => {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within an AppProvider');
	}
	return context;
};

// Sidebar hook
export const useSidebar = (): SidebarContextType => {
	const context = useContext(SidebarContext);
	if (!context) {
		throw new Error('useSidebar must be used within an AppProvider');
	}
	return context;
};

// Table hook
export const useTableContext = (): TableContextType => {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error('useTable must be used within an AppProvider');
	}
	return context;
};

// Auth hook
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AppProvider');
	}
	return context;
};

// Custom hook
export const useCustom = (): CustomContextType => {
	const context = useContext(CustomContext);
	if (!context) {
		throw new Error('useCustom must be used within an AppProvider');
	}
	return context;
};
