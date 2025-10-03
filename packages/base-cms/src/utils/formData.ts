/**
 * Custom FormData Utility Functions by nguyenthucoffical
 * Các hàm tiện ích để tạo và quản lý FormData một cách dễ dàng
 */

/**
 * Tạo FormData mới
 * @returns {FormData}
 */
export const createFormData = (): FormData => {
	return new FormData();
};

/**
 * Append một giá trị đơn giản vào FormData
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @param {any} value - Giá trị
 * @returns {FormData} - FormData đã được modify
 */
export const appendValue = (formData: FormData, key: string, value: any): FormData => {
	formData.append(key, value);
	return formData;
};

/**
 * Append object vào FormData - tự động convert nested objects
 * @param {FormData} formData - FormData instance
 * @param {Object} obj - Object cần append
 * @param {string} prefix - Prefix cho key (optional)
 * @returns {FormData}
 */
export const appendObject = (formData: FormData, obj: Record<string, any>, prefix: string = ''): FormData => {
	Object.entries(obj).forEach(([key, value]) => {
		const fieldName = prefix ? `${prefix}[${key}]` : key;

		if (value === null || value === undefined) {
			formData.append(fieldName, '');
		} else if (value instanceof File || value instanceof Blob) {
			formData.append(fieldName, value);
		} else if (Array.isArray(value)) {
			appendArray(formData, value, fieldName);
		} else if (typeof value === 'object' && value !== null) {
			appendObject(formData, value, fieldName);
		} else {
			formData.append(fieldName, String(value));
		}
	});
	return formData;
};

/**
 * Append array vào FormData
 * @param {FormData} formData - FormData instance
 * @param {Array} array - Mảng cần append
 * @param {string} key - Tên field
 * @returns {FormData}
 */
export const appendArray = (formData: FormData, array: any[], key: string): FormData => {
	array.forEach((item, index) => {
		const fieldName = `${key}[${index}]`;

		if (item instanceof File || item instanceof Blob) {
			formData.append(fieldName, item);
		} else if (typeof item === 'object' && item !== null) {
			appendObject(formData, item, fieldName);
		} else {
			formData.append(fieldName, String(item));
		}
	});
	return formData;
};

/**
 * Append nhiều files vào FormData
 * @param {FormData} formData - FormData instance
 * @param {FileList|Array<File|Blob>} files - Danh sách files hoặc blobs
 * @param {string} key - Tên field (mặc định là 'files')
 * @returns {FormData}
 */
export const appendFiles = (formData: FormData, files: FileList | Array<File | Blob>, key: string = 'files'): FormData => {
	const fileArray = Array.from(files);
	fileArray.forEach((file, index) => {
		formData.append(`${key}[${index}]`, file);
	});
	return formData;
};

/**
 * Append file đơn lẻ vào FormData
 * @param {FormData} formData - FormData instance
 * @param {File|Blob} file - File hoặc Blob cần append
 * @param {string} key - Tên field
 * @param {string} filename - Tên file tùy chọn
 * @returns {FormData}
 */
export const appendFile = (formData: FormData, file: File | Blob, key: string, filename: string | null = null): FormData => {
	if (filename) {
		formData.append(key, file, filename);
	} else {
		formData.append(key, file);
	}
	return formData;
};

/**
 * Append JSON data vào FormData
 * @param {FormData} formData - FormData instance
 * @param {Object} data - Data cần append dưới dạng JSON
 * @param {string} key - Tên field
 * @returns {FormData}
 */
export const appendJSON = (formData: FormData, data: Record<string, any>, key: string): FormData => {
	formData.append(key, JSON.stringify(data));
	return formData;
};

/**
 * Set giá trị vào FormData (ghi đè nếu đã tồn tại)
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @param {any} value - Giá trị
 * @returns {FormData}
 */
export const setValue = (formData: FormData, key: string, value: any): FormData => {
	formData.set(key, value);
	return formData;
};

/**
 * Xóa một field khỏi FormData
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @returns {FormData}
 */
export const deleteField = (formData: FormData, key: string): FormData => {
	formData.delete(key);
	return formData;
};

/**
 * Kiểm tra field có tồn tại trong FormData không
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @returns {boolean}
 */
export const hasField = (formData: FormData, key: string): boolean => {
	return formData.has(key);
};

/**
 * Lấy giá trị của field từ FormData
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @returns {any}
 */
export const getValue = (formData: FormData, key: string): FormDataEntryValue | null => {
	return formData.get(key);
};

/**
 * Lấy tất cả giá trị của field (nếu có nhiều giá trị)
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @returns {Array}
 */
export const getAllValues = (formData: FormData, key: string): FormDataEntryValue[] => {
	return formData.getAll(key);
};

/**
 * Log tất cả entries trong FormData (để debug)
 * @param {FormData} formData - FormData instance
 */
export const logFormData = (formData: FormData): void => {
	console.log('FormData entries:');
	for (const [key, value] of formData.entries()) {
		console.log(`${key}:`, value);
	}
};

/**
 * Convert FormData thành Object (chỉ cho text values)
 * @param {FormData} formData - FormData instance
 * @returns {Object}
 */
export const formDataToObject = (formData: FormData): Record<string, string> => {
	const obj: Record<string, string> = {};
	for (const [key, value] of formData.entries()) {
		if (typeof value === 'string') {
			obj[key] = value;
		}
	}
	return obj;
};

/**
 * Convert Object thành FormData nhanh chóng
 * @param {Object} obj - Object cần convert
 * @returns {FormData}
 */
export const objectToFormData = (obj: Record<string, any>): FormData => {
	const formData = createFormData();
	return appendObject(formData, obj);
};

/**
 * Tạo FormData từ form element
 * @param {HTMLFormElement} form - Form element
 * @returns {FormData}
 */
export const formElementToFormData = (form: HTMLFormElement): FormData => {
	return new FormData(form);
};

/**
 * Merge nhiều FormData thành một
 * @param {...FormData} formDatas - Các FormData cần merge
 * @returns {FormData}
 */
export const mergeFormData = (...formDatas: FormData[]): FormData => {
	const result = createFormData();

	formDatas.forEach((formData) => {
		for (const [key, value] of formData.entries()) {
			result.append(key, value);
		}
	});

	return result;
};

/**
 * Clone FormData
 * @param {FormData} formData - FormData cần clone
 * @returns {FormData}
 */
export const cloneFormData = (formData: FormData): FormData => {
	const cloned = createFormData();
	for (const [key, value] of formData.entries()) {
		cloned.append(key, value);
	}
	return cloned;
};

/**
 * Đếm số lượng entries trong FormData
 * @param {FormData} formData - FormData instance
 * @returns {number}
 */
export const countEntries = (formData: FormData): number => {
	let count = 0;
	for (const [key, value] of formData.entries()) {
		count++;
	}
	return count;
};

/**
 * Kiểm tra FormData có rỗng không
 * @param {FormData} formData - FormData instance
 * @returns {boolean}
 */
export const isEmpty = (formData: FormData): boolean => {
	return countEntries(formData) === 0;
};

/**
 * Lấy tất cả keys từ FormData
 * @param {FormData} formData - FormData instance
 * @returns {Array<string>}
 */
export const getKeys = (formData: FormData): string[] => {
	return Array.from(formData.keys());
};

/**
 * Lấy tất cả values từ FormData
 * @param {FormData} formData - FormData instance
 * @returns {Array}
 */
export const getValues = (formData: FormData): FormDataEntryValue[] => {
	return Array.from(formData.values());
};

/**
 * Lấy tất cả entries từ FormData
 * @param {FormData} formData - FormData instance
 * @returns {Array<[string, any]>}
 */
export const getEntries = (formData: FormData): [string, FormDataEntryValue][] => {
	return Array.from(formData.entries());
};

/**
 * Chuyển đổi Data URL thành Blob
 * @param {string} dataURL - Data URL cần chuyển đổi (format: data:[<mediatype>][;base64],<data>)
 * @returns {Blob} - Blob được tạo từ Data URL
 */
export const dataURLtoBlob = (dataURL: string): Blob => {
	// Tách phần header và data
	const arr = dataURL.split(',');
	if (arr.length < 2) {
		throw new Error('Invalid Data URL format');
	}

	// Lấy mime type từ header
	const mime = arr[0].match(/:(.*?);/)?.[1] || 'application/octet-stream';

	// Kiểm tra xem có phải là base64 không
	const isBase64 = arr[0].indexOf('base64') !== -1;

	// Lấy dữ liệu
	const data = isBase64 ? atob(arr[1]) : decodeURIComponent(arr[1]);

	// Chuyển đổi thành mảng byte
	const length = data.length;
	const uint8Array = new Uint8Array(length);

	for (let i = 0; i < length; i++) {
		uint8Array[i] = data.charCodeAt(i);
	}

	// Tạo và trả về Blob
	return new Blob([uint8Array], { type: mime });
};

/**
 * Append Data URL vào FormData (tự động chuyển đổi thành Blob)
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @param {string} dataURL - Data URL cần append
 * @param {string} filename - Tên file tùy chọn
 * @returns {FormData}
 */
export const appendDataURL = (formData: FormData, key: string, dataURL: string, filename: string | null = null): FormData => {
	const blob = dataURLtoBlob(dataURL);

	// Lấy extension từ mime type nếu không có filename
	if (!filename) {
		const mime = blob.type;
		const ext = mime.split('/')[1] || 'bin';
		filename = `file.${ext}`;
	}

	formData.append(key, blob, filename);
	return formData;
};

/**
 * Append nhiều Data URL vào FormData (tự động chuyển đổi thành Blob)
 * @param {FormData} formData - FormData instance
 * @param {string} key - Tên field
 * @param {string[]} dataURLs - Danh sách Data URL cần append
 * @param {string} filename - Tên file tùy chọn
 * @returns {FormData}
 */
export const appendDataURLs = (formData: FormData, key: string, dataURLs: { url: string; filename: string }[]): FormData => {
	dataURLs.forEach((dataURL) => {
		appendDataURL(formData, key, dataURL.url, dataURL.filename);
	});
	return formData;
};
