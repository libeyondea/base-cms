export { createCustomTheme } from './theme';

// Theme utilities
export const getThemeSpacing = (factor: number) => `${8 * factor}px`;

// Common theme values for easy access
export const themeValues = {
	borderRadius: {
		small: 8,
		medium: 12,
		large: 16,
		xlarge: 24
	},
	shadows: {
		light: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
		medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
		heavy: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
	},
	transitions: {
		fast: '150ms ease-in-out',
		normal: '250ms ease-in-out',
		slow: '350ms ease-in-out'
	}
};
