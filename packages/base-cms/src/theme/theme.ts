import { PaletteMode, ThemeOptions } from '@mui/material';

// Font configuration - MUI v7 compatible
const fontFamily = {
	primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
	headings: '"Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif'
};

// Light theme colors
const lightColors = {
	primary: {
		main: '#2563eb', // Modern blue
		light: '#3b82f6',
		dark: '#1d4ed8',
		contrastText: '#ffffff'
	},
	secondary: {
		main: '#7c3aed', // Modern purple
		light: '#8b5cf6',
		dark: '#6d28d9',
		contrastText: '#ffffff'
	},
	success: {
		main: '#059669', // Modern green
		light: '#10b981',
		dark: '#047857',
		contrastText: '#ffffff'
	},
	warning: {
		main: '#d97706', // Modern orange
		light: '#f59e0b',
		dark: '#b45309',
		contrastText: '#ffffff'
	},
	error: {
		main: '#dc2626', // Modern red
		light: '#ef4444',
		dark: '#b91c1c',
		contrastText: '#ffffff'
	},
	info: {
		main: '#0891b2', // Modern cyan
		light: '#06b6d4',
		dark: '#0e7490',
		contrastText: '#ffffff'
	},
	grey: {
		50: '#f8fafc',
		100: '#f1f5f9',
		200: '#e2e8f0',
		300: '#cbd5e1',
		400: '#94a3b8',
		500: '#64748b',
		600: '#475569',
		700: '#334155',
		800: '#1e293b',
		900: '#0f172a'
	},
	background: {
		default: '#ffffff',
		paper: '#ffffff'
	},
	text: {
		primary: '#0f172a',
		secondary: '#475569',
		disabled: '#94a3b8'
	},
	divider: '#e2e8f0'
};

// Dark theme colors
const darkColors = {
	primary: {
		main: '#3b82f6', // Lighter blue for dark mode
		light: '#60a5fa',
		dark: '#2563eb',
		contrastText: '#ffffff'
	},
	secondary: {
		main: '#a855f7', // Lighter purple for dark mode
		light: '#c084fc',
		dark: '#9333ea',
		contrastText: '#ffffff'
	},
	success: {
		main: '#10b981', // Lighter green for dark mode
		light: '#34d399',
		dark: '#059669',
		contrastText: '#ffffff'
	},
	warning: {
		main: '#f59e0b', // Lighter orange for dark mode
		light: '#fbbf24',
		dark: '#d97706',
		contrastText: '#000000'
	},
	error: {
		main: '#ef4444', // Lighter red for dark mode
		light: '#f87171',
		dark: '#dc2626',
		contrastText: '#ffffff'
	},
	info: {
		main: '#06b6d4', // Lighter cyan for dark mode
		light: '#22d3ee',
		dark: '#0891b2',
		contrastText: '#ffffff'
	},
	grey: {
		50: '#0f172a',
		100: '#1e293b',
		200: '#334155',
		300: '#475569',
		400: '#64748b',
		500: '#94a3b8',
		600: '#cbd5e1',
		700: '#e2e8f0',
		800: '#f1f5f9',
		900: '#f8fafc'
	},
	background: {
		default: '#0f172a', // Dark background
		paper: '#1e293b' // Dark paper
	},
	text: {
		primary: '#f8fafc', // Light text on dark background
		secondary: '#cbd5e1', // Lighter secondary text
		disabled: '#64748b'
	},
	divider: '#334155' // Dark divider
};

// Theme factory function
export const createCustomTheme = (mode: PaletteMode): ThemeOptions => {
	const colors = mode === 'light' ? lightColors : darkColors;

	return {
		palette: {
			mode,
			primary: colors.primary,
			secondary: colors.secondary,
			success: colors.success,
			warning: colors.warning,
			error: colors.error,
			info: colors.info,
			grey: colors.grey,
			background: colors.background,
			text: colors.text,
			divider: colors.divider
		},
		typography: {
			fontFamily: fontFamily.primary,
			h1: {
				fontFamily: fontFamily.headings,
				fontSize: '2.5rem',
				fontWeight: 700,
				lineHeight: 1.2,
				letterSpacing: '-0.02em'
			},
			h2: {
				fontFamily: fontFamily.headings,
				fontSize: '2rem',
				fontWeight: 600,
				lineHeight: 1.3,
				letterSpacing: '-0.01em'
			},
			h3: {
				fontFamily: fontFamily.headings,
				fontSize: '1.75rem',
				fontWeight: 600,
				lineHeight: 1.4
			},
			h4: {
				fontFamily: fontFamily.headings,
				fontSize: '1.5rem',
				fontWeight: 600,
				lineHeight: 1.4
			},
			h5: {
				fontFamily: fontFamily.headings,
				fontSize: '1.25rem',
				fontWeight: 600,
				lineHeight: 1.5
			},
			h6: {
				fontFamily: fontFamily.headings,
				fontSize: '1.125rem',
				fontWeight: 600,
				lineHeight: 1.5
			},
			body1: {
				fontSize: '1rem',
				lineHeight: 1.6
			},
			body2: {
				fontSize: '0.875rem',
				lineHeight: 1.6
			},
			button: {
				fontFamily: fontFamily.primary,
				fontWeight: 600,
				textTransform: 'none',
				letterSpacing: '0.025em'
			},
			caption: {
				fontSize: '0.75rem',
				lineHeight: 1.5
			},
			overline: {
				fontSize: '0.75rem',
				fontWeight: 600,
				textTransform: 'uppercase',
				letterSpacing: '0.1em'
			}
		},
		shape: {
			borderRadius: 12
		},
		spacing: 8,
		breakpoints: {
			values: {
				xs: 0,
				sm: 600,
				md: 960,
				lg: 1280,
				xl: 1920
			}
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						borderRadius: 8,
						fontSize: '0.875rem',
						fontWeight: 600,
						boxShadow: 'none',
						'&:hover': {
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
						}
					},
					contained: {
						'&:hover': {
							boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)'
						}
					},
					outlined: {
						borderWidth: '2px',
						'&:hover': {
							borderWidth: '2px'
						}
					},
					text: {
						'&:hover': {
							backgroundColor: mode === 'light' ? 'rgba(37, 99, 235, 0.04)' : 'rgba(59, 130, 246, 0.08)'
						}
					}
				}
			},
			MuiCard: {
				styleOverrides: {
					root: {
						borderRadius: 16,
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
					}
				}
			},
			MuiPaper: {
				styleOverrides: {
					root: {
						borderRadius: 12
					},
					elevation1: {
						boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
					},
					elevation2: {
						boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
					},
					elevation3: {
						boxShadow: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
					}
				}
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						'&:hover .MuiOutlinedInput-notchedOutline': {
							borderColor: colors.primary.light
						},
						'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
							borderColor: colors.primary.main,
							borderWidth: '2px'
						}
					}
				}
			},
			MuiFilledInput: {
				styleOverrides: {
					root: {
						'&:hover': {
							'&:not(.Mui-disabled, .Mui-error)': {
								'&::before': {
									borderBottomColor: colors.primary.light
								}
							}
						},
						'&.Mui-focused': {
							'&::before': {
								borderBottomColor: colors.primary.main,
								borderBottomWidth: '2px'
							},
							'&::after': {
								borderBottomColor: colors.primary.main
							}
						}
					}
				}
			},
			MuiInputBase: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						'&.Mui-focused': {
							'& .MuiInputAdornment-root': {
								color: colors.primary.main
							}
						}
					}
				}
			},
			MuiTextField: {
				styleOverrides: {
					root: {
						'& .MuiInputLabel-root': {
							'&.Mui-focused': {
								color: colors.primary.main
							}
						}
					}
				}
			},
			MuiSelect: {
				styleOverrides: {
					root: {
						'& .MuiInputLabel-root': {
							'&.Mui-focused': {
								color: colors.primary.main
							}
						}
					}
				}
			},
			MuiAutocomplete: {
				styleOverrides: {
					root: {
						'& .MuiInputLabel-root': {
							'&.Mui-focused': {
								color: colors.primary.main
							}
						}
					}
				}
			},
			MuiFormControl: {
				styleOverrides: {
					root: {
						'& .MuiInputLabel-root': {
							'&.Mui-focused': {
								color: colors.primary.main
							}
						}
					}
				}
			},
			MuiChip: {
				styleOverrides: {
					root: {
						borderRadius: 16,
						fontWeight: 500
					}
				}
			},
			MuiAvatar: {
				styleOverrides: {
					root: {
						borderRadius: 12
					}
				}
			},
			MuiDialog: {
				styleOverrides: {
					paper: {
						borderRadius: 16
					}
				}
			},
			MuiSnackbar: {
				styleOverrides: {
					root: {
						'& .MuiAlert-root': {
							borderRadius: 8
						}
					}
				}
			},
			MuiAlert: {
				styleOverrides: {
					root: {
						borderRadius: 8,
						fontWeight: 500
					}
				}
			},
			MuiTableHead: {
				styleOverrides: {
					root: {
						'& .MuiTableCell-root': {
							fontWeight: 600,
							backgroundColor: colors.grey[mode === 'light' ? 50 : 100],
							borderBottom: `2px solid ${colors.grey[mode === 'light' ? 200 : 300]}`
						}
					}
				}
			},
			MuiTableCell: {
				styleOverrides: {
					root: {
						borderBottom: `1px solid ${colors.grey[mode === 'light' ? 200 : 300]}`,
						padding: '8px'
					}
				}
			},
			MuiTooltip: {
				styleOverrides: {
					tooltip: {
						borderRadius: 8,
						fontSize: '0.75rem',
						color: mode === 'light' ? '#fff' : '#000',
						backgroundColor: colors.grey[mode === 'light' ? 800 : 700]
					}
				}
			},
			MuiLinearProgress: {
				styleOverrides: {
					root: {
						borderRadius: 4,
						backgroundColor: colors.grey[mode === 'light' ? 200 : 300]
					},
					bar: {
						borderRadius: 4
					}
				}
			},
			MuiCircularProgress: {
				styleOverrides: {
					root: {
						color: colors.primary.main
					}
				}
			}
		}
	};
};
