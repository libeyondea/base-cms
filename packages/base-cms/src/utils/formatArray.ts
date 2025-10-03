import { isArray, isEmpty, isObject } from 'lodash-es';

export const isNonEmptyArray = (arr: any): arr is any[] => {
	return isArray(arr) && !isEmpty(arr);
};

export const isNonEmptyObject = (obj: any): obj is object => {
	return isObject(obj) && !isEmpty(obj);
};

export const formatArray = <T = any>(arr: any): T[] => {
	return isNonEmptyArray(arr) ? arr : [];
};

export const formatObject = <T extends object = any>(obj: any): T | null => {
	return isNonEmptyObject(obj) ? (obj as T) : null;
};
