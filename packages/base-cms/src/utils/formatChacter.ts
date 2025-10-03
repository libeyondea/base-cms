/**
 * Lấy số hợp lệ
 * @param param
 * @param defaultValue mặc định là -1
 * @returns số hợp lệ
 */
export const getValidNumber = (param: any, defaultValue: number = -1): number => {
	if (param === null || param === undefined) return defaultValue; // Xử lý giá trị null/undefined

	if (typeof param === 'number') {
		return Number.isFinite(param) && param >= 0 ? Math.floor(param) : defaultValue;
	}

	if (typeof param === 'string') {
		const trimmed = param.trim();
		if (!/^\d+$/.test(trimmed)) return defaultValue; // Chỉ chấp nhận chuỗi số nguyên dương

		const num = parseInt(trimmed, 10);
		return num >= 0 ? num : defaultValue;
	}

	return defaultValue; // Nếu không thuộc kiểu hợp lệ, trả về mặc định
};

/**
 * Lấy số hợp lệ dạng float
 * @param param
 * @param defaultValue mặc định là 0
 * @returns số hợp lệ dạng float
 */
export const getValidFloat = (param: any, defaultValue: number = 0): number => {
	if (param === null || param === undefined) return defaultValue;

	if (typeof param === 'number') {
		return Number.isFinite(param) && param >= 0 ? param : defaultValue;
	}

	if (typeof param === 'string') {
		const trimmed = param.trim();
		if (!/^\d+(\.\d+)?$/.test(trimmed)) return defaultValue; // Hợp lệ: '123', '123.45'

		const num = parseFloat(trimmed);
		return num >= 0 ? num : defaultValue;
	}

	return defaultValue;
};

/**
 * Chuyển đổi chuỗi thành chuỗi thấp, loại bỏ khoảng trắng
 * @param str
 * @returns chuỗi thấp, loại bỏ khoảng trắng
 */
export const formatStringToLowerCase = (str: string) => {
	return String(str).trim().toLowerCase();
};
