import { RoleConfig } from '@libeyondea/base-cms';

/**
 * Cấu hình role cho dự án example
 *
 * Nếu API của bạn trả về user với cấu trúc:
 * - user.role = "admin" (string) -> không cần config
 * - user.roles = ["admin", "user"] (array of strings) -> không cần config
 * - user.roles = [{ ten_vai_tro: "admin" }] -> cần config roleValueKey
 *
 * Ví dụ này demo cho trường hợp API trả về roles là array of objects
 */

/**
 * Ví dụ 1: Sử dụng mặc định (không config)
 * Phù hợp với cấu trúc: user.role hoặc user.roles
 */
export const defaultRoleConfig: RoleConfig | undefined = undefined;

/**
 * Ví dụ 2: API trả về roles với custom key
 * Phù hợp với cấu trúc:
 * user.roles = [
 *   { ten_vai_tro: "admin" },
 *   { ten_vai_tro: "manager" }
 * ]
 */
export const vietnameseRoleConfig: RoleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};

/**
 * Ví dụ 3: API trả về permissions
 * Phù hợp với cấu trúc:
 * user.permissions = [
 *   { role_name: "admin" },
 *   { role_name: "user" }
 * ]
 */
export const permissionsRoleConfig: RoleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};

/**
 * Config đang được sử dụng trong project
 * Thay đổi này để match với cấu trúc API của bạn
 */
export const roleConfig: RoleConfig | undefined = defaultRoleConfig;

// Hoặc nếu cần custom:
// export const roleConfig: RoleConfig = {
//   userRoleKey: 'roles',
//   roleValueKey: 'ten_vai_tro'
// };
