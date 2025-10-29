/**
 * File ví dụ về các cấu hình RoleConfig khác nhau
 * Copy và customize theo nhu cầu dự án của bạn
 */
import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';

/**
 * Ví dụ 1: Mặc định - không cần config
 * Dùng khi API trả về user với:
 * - user.role = "admin" (string)
 * - user.roles = ["admin", "user"] (array of strings)
 */
export const defaultRoleConfig: RoleConfig = {
	userRoleKey: ['role', 'roles'],
	roleValueKey: undefined
};

/**
 * Ví dụ 2: Role là array of objects với custom key
 * Dùng khi API trả về:
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
 * Ví dụ 3: Custom role key name
 * Dùng khi API trả về:
 * user.user_role = "admin"
 */
export const customKeyRoleConfig: RoleConfig = {
	userRoleKey: 'user_role',
	roleValueKey: undefined
};

/**
 * Ví dụ 4: Permissions array với role_name
 * Dùng khi API trả về:
 * user.permissions = [
 *   { role_name: "admin", department: "IT" },
 *   { role_name: "manager", department: "HR" }
 * ]
 */
export const permissionsRoleConfig: RoleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};

/**
 * Ví dụ 5: Thử nhiều keys (fallback)
 * Hệ thống sẽ thử lần lượt các keys cho đến khi tìm thấy
 */
export const multiKeyRoleConfig: RoleConfig = {
	userRoleKey: ['roles', 'role', 'user_roles', 'permissions'],
	roleValueKey: 'name'
};

/**
 * Ví dụ 6: Role structure phức tạp
 * Dùng khi API trả về:
 * user.user_permissions = [
 *   { permission_role: "admin" },
 *   { permission_role: "editor" }
 * ]
 */
export const complexRoleConfig: RoleConfig = {
	userRoleKey: 'user_permissions',
	roleValueKey: 'permission_role'
};

/**
 * Ví dụ 7: API trả về role trong nested object
 * Note: Hiện tại chưa support nested, cần flatten trước khi dùng
 * user.profile = {
 *   role: "admin"
 * }
 *
 * Workaround: Flatten trong signin callback:
 * signin({
 *   user: { ...response.data.user, role: response.data.user.profile.role },
 *   token: serviceToken
 * })
 */

// ==========================================
// USER OBJECT EXAMPLES
// ==========================================

/**
 * Example user objects tương ứng với từng config
 */

// For defaultRoleConfig
export const exampleUser1 = {
	id: 1,
	name: 'John Doe',
	email: 'john@example.com',
	role: 'admin' // Single string
};

export const exampleUser2 = {
	id: 2,
	name: 'Jane Smith',
	email: 'jane@example.com',
	roles: ['admin', 'manager'] // Array of strings
};

// For vietnameseRoleConfig
export const exampleUser3 = {
	id: 3,
	name: 'Nguyen Van A',
	email: 'nguyenvana@example.com',
	roles: [{ ten_vai_tro: 'admin' }, { ten_vai_tro: 'quan_ly' }]
};

// For customKeyRoleConfig
export const exampleUser4 = {
	id: 4,
	name: 'Test User',
	email: 'test@example.com',
	user_role: 'editor'
};

// For permissionsRoleConfig
export const exampleUser5 = {
	id: 5,
	name: 'Admin User',
	email: 'admin@example.com',
	permissions: [
		{ role_name: 'admin', department: 'IT', granted_at: '2024-01-01' },
		{ role_name: 'manager', department: 'HR', granted_at: '2024-01-15' }
	]
};

// ==========================================
// TESTING HELPERS
// ==========================================

/**
 * Helper function để test extractUserRoles
 */
export const testRoleExtraction = () => {
	// Import function này từ utils.ts để test
	// import { extractUserRoles } from './utils';

	console.log('Testing role extraction...');

	// Test case 1: Single string role
	// const roles1 = extractUserRoles(exampleUser1, defaultRoleConfig);
	// console.log('User 1 roles:', roles1); // Expected: ['admin']

	// Test case 2: Array of strings
	// const roles2 = extractUserRoles(exampleUser2, defaultRoleConfig);
	// console.log('User 2 roles:', roles2); // Expected: ['admin', 'manager']

	// Test case 3: Array of objects with custom key
	// const roles3 = extractUserRoles(exampleUser3, vietnameseRoleConfig);
	// console.log('User 3 roles:', roles3); // Expected: ['admin', 'quan_ly']

	// Test case 4: Custom key name
	// const roles4 = extractUserRoles(exampleUser4, customKeyRoleConfig);
	// console.log('User 4 roles:', roles4); // Expected: ['editor']

	// Test case 5: Permissions array
	// const roles5 = extractUserRoles(exampleUser5, permissionsRoleConfig);
	// console.log('User 5 roles:', roles5); // Expected: ['admin', 'manager']
};
