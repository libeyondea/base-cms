/**
 * Color utility functions for the application
 */

/**
 * Converts a color (hex, rgb, or rgba) to rgba format with specified opacity
 * @param color - The color to convert (hex, rgb, or rgba)
 * @param opacity - The opacity value (0-1)
 * @returns rgba color string
 */
export const hexToRgba = (color: string, opacity: number): string => {
	// If already in rgba format, return it with the new opacity
	if (color.startsWith('rgba')) {
		// Extract the RGB values from the existing rgba string
		const rgbMatch = color.match(/\d+,\s*\d+,\s*\d+/);
		if (rgbMatch) {
			return `rgba(${rgbMatch[0]}, ${opacity})`;
		}
		// If we can't parse it, return the original
		return color;
	}

	// If in rgb format, convert to rgba with the new opacity
	if (color.startsWith('rgb(')) {
		// Extract the RGB values from the rgb string
		const rgbMatch = color.match(/\d+,\s*\d+,\s*\d+/);
		if (rgbMatch) {
			return `rgba(${rgbMatch[0]}, ${opacity})`;
		}
		// If we can't parse it, return the original
		return color;
	}

	// Remove # if present
	color = color.replace('#', '');

	// Handle shorthand hex (e.g., #fff)
	if (color.length === 3) {
		color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
	}

	// Check if it's a valid hex color
	if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
		// Return a default color if the hex is invalid
		return `rgba(158, 158, 158, ${opacity})`; // #9e9e9e in rgba
	}

	// Parse the hex values
	const r = parseInt(color.substring(0, 2), 16);
	const g = parseInt(color.substring(2, 4), 16);
	const b = parseInt(color.substring(4, 6), 16);

	// Return rgba string
	return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

/**
 * Lightens a color by a percentage
 * @param color - The color to lighten (hex format)
 * @param percent - The percentage to lighten (0-100)
 * @returns Lightened hex color
 */
export const lightenColor = (color: string, percent: number): string => {
	// Remove # if present
	color = color.replace('#', '');

	// Handle shorthand hex (e.g., #fff)
	if (color.length === 3) {
		color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
	}

	// Check if it's a valid hex color
	if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
		return '#9e9e9e'; // Default gray
	}

	// Parse the hex values
	let r = parseInt(color.substring(0, 2), 16);
	let g = parseInt(color.substring(2, 4), 16);
	let b = parseInt(color.substring(4, 6), 16);

	// Lighten the color
	r = Math.min(255, Math.floor(r + (255 - r) * (percent / 100)));
	g = Math.min(255, Math.floor(g + (255 - g) * (percent / 100)));
	b = Math.min(255, Math.floor(b + (255 - b) * (percent / 100)));

	// Convert back to hex
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Darkens a color by a percentage
 * @param color - The color to darken (hex format)
 * @param percent - The percentage to darken (0-100)
 * @returns Darkened hex color
 */
export const darkenColor = (color: string, percent: number): string => {
	// Remove # if present
	color = color.replace('#', '');

	// Handle shorthand hex (e.g., #fff)
	if (color.length === 3) {
		color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
	}

	// Check if it's a valid hex color
	if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
		return '#9e9e9e'; // Default gray
	}

	// Parse the hex values
	let r = parseInt(color.substring(0, 2), 16);
	let g = parseInt(color.substring(2, 4), 16);
	let b = parseInt(color.substring(4, 6), 16);

	// Darken the color
	r = Math.max(0, Math.floor(r * (1 - percent / 100)));
	g = Math.max(0, Math.floor(g * (1 - percent / 100)));
	b = Math.max(0, Math.floor(b * (1 - percent / 100)));

	// Convert back to hex
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

/**
 * Checks if a color is light or dark
 * @param color - The color to check (hex, rgb, or rgba format)
 * @returns boolean - true if the color is light, false if dark
 */
export const isLightColor = (color: string): boolean => {
	let r: number, g: number, b: number;

	// Handle rgb and rgba formats
	if (color.startsWith('rgb')) {
		// Extract RGB values using regex
		const rgbMatch = color.match(/(\d+),\s*(\d+),\s*(\d+)/);
		if (rgbMatch) {
			r = parseInt(rgbMatch[1], 10);
			g = parseInt(rgbMatch[2], 10);
			b = parseInt(rgbMatch[3], 10);
		} else {
			return true; // Default to light if we can't parse
		}
	} else {
		// Handle hex format
		// Remove # if present
		color = color.replace('#', '');

		// Handle shorthand hex (e.g., #fff)
		if (color.length === 3) {
			color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
		}

		// Check if it's a valid hex color
		if (!/^[0-9A-Fa-f]{6}$/.test(color)) {
			return true; // Default to light
		}

		// Parse the hex values
		r = parseInt(color.substring(0, 2), 16);
		g = parseInt(color.substring(2, 4), 16);
		b = parseInt(color.substring(4, 6), 16);
	}

	// Calculate the relative luminance
	// Formula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
	const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

	// Return true if light, false if dark
	return luminance > 0.5;
};
