export type FilterObject = Record<string, number | number[] | string | string[] | null | undefined>;

export type IUniqueId = number | string | undefined | null;

export interface IApi {
	id?: string | null | number | undefined;
	filter?: FilterObject;
	createSuccess?: (data?: any) => void;
	createError?: (error?: any) => void;
	updateSuccess?: (data?: any) => void;
	updateError?: (error?: any) => void;
	deleteSuccess?: (data?: any) => void;
	deleteError?: (error?: any) => void;
}
