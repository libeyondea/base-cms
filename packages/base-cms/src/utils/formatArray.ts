export const isNonEmptyArray = (arr: any): arr is any[] => {
	return Array.isArray(arr) && arr.length > 0;
};

export const isNonEmptyObject = (obj: any): obj is object => {
	return obj !== null && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length > 0;
};

export const formatArray = <T = any>(arr: any): T[] => {
	return isNonEmptyArray(arr) ? arr : [];
};

export const formatObject = <T extends object = any>(obj: any): T | null => {
	return isNonEmptyObject(obj) ? (obj as T) : null;
};
