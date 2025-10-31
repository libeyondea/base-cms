/**
 * File này chứa các ví dụ về cấu hình role-based routing
 * Sao chép và tùy chỉnh theo nhu cầu của dự án
 */
import { lazy } from 'react';

import { RoleConfig } from '~/components/Layout/SideBar/Sidebar.types';

import { RoutesConfig } from './types';

// ============================================================================
// EXAMPLE 1: Cấu hình cơ bản (không cần roleConfig)
// Phù hợp khi API trả về: { role: 'admin' } hoặc { roles: ['admin', 'user'] }
// ============================================================================

// const AdminLayout = lazy(() => import('~/layouts/AdminLayout'));
// const DashboardLayout = lazy(() => import('~/layouts/DashboardLayout'));

// const AdminPage = lazy(() => import('~/pages/admin/AdminPage'));
// const UsersPage = lazy(() => import('~/pages/admin/UsersPage'));
// const SettingsPage = lazy(() => import('~/pages/admin/SettingsPage'));
// const DashboardPage = lazy(() => import('~/pages/DashboardPage'));
// const ReportsPage = lazy(() => import('~/pages/ReportsPage'));
// const ProfilePage = lazy(() => import('~/pages/ProfilePage'));
// const SignInPage = lazy(() => import('~/pages/auth/SignInPage'));

export const basicRoutesConfig: RoutesConfig = {
	// Không cần roleConfig nếu API trả về role/roles đơn giản

	auth: [
		{
			path: '/signin'
			// element: SignInPage
		}
	],

	private: [
		// Admin routes - chỉ admin mới truy cập được
		{
			path: '/admin',
			// layout: AdminLayout,
			roles: ['admin'],
			children: [
				{
					index: true
					// element: AdminPage
				},
				{
					path: 'users'
					// element: UsersPage
					// Kế thừa roles: ['admin'] từ parent
				},
				{
					path: 'settings'
					// element: SettingsPage
					// Kế thừa roles: ['admin'] từ parent
				}
			]
		},

		// Dashboard routes - admin và manager truy cập được
		{
			path: '/',
			// layout: DashboardLayout,
			children: [
				{
					index: true,
					// element: DashboardPage,
					roles: ['admin', 'manager']
				},
				{
					path: 'reports',
					// element: ReportsPage,
					roles: ['admin', 'manager']
				},
				{
					path: 'profile'
					// element: ProfilePage
					// Không có roles = tất cả users đã đăng nhập
				}
			]
		}
	]
};

// ============================================================================
// EXAMPLE 2: Cấu hình với roleConfig - Array of Objects
// API trả về: { roles: [{ ten_vai_tro: 'admin' }, { ten_vai_tro: 'user' }] }
// ============================================================================

export const roleConfigForArrayOfObjects: RoleConfig = {
	userRoleKey: 'roles', // Key để lấy roles từ user object
	roleValueKey: 'ten_vai_tro' // Key để extract giá trị từ object
};

export const arrayOfObjectsRoutesConfig: RoutesConfig = {
	roleConfig: roleConfigForArrayOfObjects,

	auth: [
		{
			path: '/signin'
			// element: SignInPage
		}
	],

	private: [
		{
			path: '/admin',
			// layout: AdminLayout,
			roles: ['admin'],
			children: [
				{
					index: true
					// element: AdminPage
				},
				{
					path: 'users'
					// element: UsersPage
				},
				{
					path: 'settings'
					// element: SettingsPage
				}
			]
		}
	]
};

// ============================================================================
// EXAMPLE 3: Cấu hình với custom key
// API trả về: { user_role: 'admin' }
// ============================================================================

export const roleConfigForCustomKey: RoleConfig = {
	userRoleKey: 'user_role'
};

export const customKeyRoutesConfig: RoutesConfig = {
	roleConfig: roleConfigForCustomKey,

	auth: [
		{
			path: '/signin'
			// element: SignInPage
		}
	],

	private: [
		{
			path: '/admin',
			// element: AdminPage,
			roles: ['admin']
		}
	]
};

// ============================================================================
// EXAMPLE 4: Cấu hình với multiple possible keys
// API trả về: { role: 'admin' } HOẶC { user_role: 'admin' } HOẶC { permissions: [...] }
// ============================================================================

export const roleConfigForMultipleKeys: RoleConfig = {
	userRoleKey: ['role', 'user_role', 'permissions'], // Thử lần lượt các keys
	roleValueKey: 'name' // Nếu là object, lấy giá trị từ key 'name'
};

export const multipleKeysRoutesConfig: RoutesConfig = {
	roleConfig: roleConfigForMultipleKeys,

	auth: [
		{
			path: '/signin'
			// element: SignInPage
		}
	],

	private: [
		{
			path: '/admin',
			// element: AdminPage,
			roles: ['admin']
		}
	]
};

// ============================================================================
// EXAMPLE 5: Cấu hình phức tạp với route groups
// ============================================================================

export const complexRoutesConfig: RoutesConfig = {
	roleConfig: {
		userRoleKey: 'roles',
		roleValueKey: 'ten_vai_tro'
	},

	// Auth routes
	auth: [
		{
			path: '/signin'
			// element: SignInPage
		},
		{
			path: '/signup'
			// element: lazy(() => import('~/pages/auth/SignUpPage'))
		}
	],

	// Private routes
	private: [
		// Admin section
		{
			path: '/admin',
			// layout: AdminLayout,
			roles: ['admin'],
			children: [
				{
					index: true
					// element: AdminPage
				},
				{
					path: 'users'
					// element: UsersPage
				},
				{
					path: 'settings',
					// element: SettingsPage,
					roles: ['admin', 'super_admin'] // Override parent roles
				}
			]
		},

		// Main dashboard
		{
			path: '/',
			// layout: DashboardLayout,
			children: [
				{
					index: true,
					// element: DashboardPage,
					roles: ['admin', 'manager', 'user']
				},
				{
					path: 'profile'
					// element: ProfilePage
					// Tất cả users
				}
			]
		}
	],

	// Route groups
	groups: [
		{
			prefix: '/management',
			guard: 'private',
			// layout: lazy(() => import('~/layouts/ManagementLayout')),
			routes: [
				{
					path: 'reports',
					// element: ReportsPage,
					roles: ['admin', 'manager']
				},
				{
					path: 'analytics',
					// element: lazy(() => import('~/pages/management/AnalyticsPage')),
					roles: ['admin', 'manager']
				},
				{
					path: 'export',
					// element: lazy(() => import('~/pages/management/ExportPage')),
					roles: ['admin'] // Chỉ admin
				}
			]
		}
	]
};

// ============================================================================
// EXAMPLE 6: Multi-level role hierarchy
// Ví dụ: Super Admin > Admin > Manager > User
// ============================================================================

export const hierarchicalRoutesConfig: RoutesConfig = {
	roleConfig: {
		userRoleKey: 'roles',
		roleValueKey: 'ten_vai_tro'
	},

	auth: [
		{
			path: '/signin'
			// element: SignInPage
		}
	],

	private: [
		// Level 1: Super Admin only
		{
			path: '/super-admin',
			// layout: lazy(() => import('~/layouts/SuperAdminLayout')),
			roles: ['super_admin'],
			children: [
				{
					index: true
					// element: lazy(() => import('~/pages/super-admin/SuperAdminPage'))
				},
				{
					path: 'system'
					// element: lazy(() => import('~/pages/super-admin/SystemPage'))
				}
			]
		},

		// Level 2: Admin & Super Admin
		{
			path: '/admin',
			// layout: AdminLayout,
			roles: ['admin', 'super_admin'],
			children: [
				{
					index: true
					// element: AdminPage
				},
				{
					path: 'users'
					// element: UsersPage
				}
			]
		},

		// Level 3: Manager, Admin & Super Admin
		{
			path: '/management',
			// layout: lazy(() => import('~/layouts/ManagementLayout')),
			roles: ['manager', 'admin', 'super_admin'],
			children: [
				{
					path: 'reports'
					// element: ReportsPage
				},
				{
					path: 'team'
					// element: lazy(() => import('~/pages/management/TeamPage'))
				}
			]
		},

		// Level 4: All authenticated users
		{
			path: '/',
			// layout: DashboardLayout,
			children: [
				{
					index: true
					// element: DashboardPage
					// Tất cả users
				},
				{
					path: 'profile'
					// element: ProfilePage
				}
			]
		}
	]
};

// ============================================================================
// EXAMPLE 7: Cấu hình cho dự án thực tế
// Bao gồm: Admin, Manager, Staff, User
// ============================================================================

export const realWorldRoleConfig: RoleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};

export const realWorldRoutesConfig: RoutesConfig = {
	roleConfig: realWorldRoleConfig,

	auth: [
		{
			path: '/signin'
			// element: SignInPage
		},
		{
			path: '/forgot-password'
			// element: lazy(() => import('~/pages/auth/ForgotPasswordPage'))
		}
	],

	private: [
		// Admin Dashboard
		{
			path: '/admin',
			// layout: AdminLayout,
			roles: ['admin'],
			children: [
				{
					index: true,
					// element: AdminPage,
					meta: { title: 'Admin Dashboard' }
				},
				{
					path: 'users',
					// element: UsersPage,
					meta: { title: 'Quản lý người dùng' }
				},
				{
					path: 'roles',
					// element: lazy(() => import('~/pages/admin/RolesPage')),
					meta: { title: 'Quản lý phân quyền' }
				},
				{
					path: 'settings',
					// element: SettingsPage,
					meta: { title: 'Cài đặt hệ thống' }
				}
			]
		},

		// Manager Dashboard
		{
			path: '/manager',
			// layout: lazy(() => import('~/layouts/ManagerLayout')),
			roles: ['admin', 'manager'],
			children: [
				{
					index: true,
					// element: lazy(() => import('~/pages/manager/ManagerPage')),
					meta: { title: 'Manager Dashboard' }
				},
				{
					path: 'reports',
					// element: ReportsPage,
					meta: { title: 'Báo cáo' }
				},
				{
					path: 'analytics',
					// element: lazy(() => import('~/pages/manager/AnalyticsPage')),
					meta: { title: 'Phân tích' }
				},
				{
					path: 'team',
					// element: lazy(() => import('~/pages/manager/TeamPage')),
					meta: { title: 'Quản lý nhóm' }
				}
			]
		},

		// Staff Area
		{
			path: '/staff',
			// layout: lazy(() => import('~/layouts/StaffLayout')),
			roles: ['admin', 'manager', 'staff'],
			children: [
				{
					index: true,
					// element: lazy(() => import('~/pages/staff/StaffPage')),
					meta: { title: 'Staff Dashboard' }
				},
				{
					path: 'tasks',
					// element: lazy(() => import('~/pages/staff/TasksPage')),
					meta: { title: 'Công việc' }
				},
				{
					path: 'schedule',
					// element: lazy(() => import('~/pages/staff/SchedulePage')),
					meta: { title: 'Lịch làm việc' }
				}
			]
		},

		// Main Dashboard (All Users)
		{
			path: '/',
			// layout: DashboardLayout,
			children: [
				{
					index: true,
					// element: DashboardPage,
					meta: { title: 'Dashboard' }
				},
				{
					path: 'profile',
					// element: ProfilePage,
					meta: { title: 'Hồ sơ' }
				},
				{
					path: 'notifications',
					// element: lazy(() => import('~/pages/NotificationsPage')),
					meta: { title: 'Thông báo' }
				}
			]
		}
	],

	// Public routes
	public: [
		{
			path: '/about'
			// element: lazy(() => import('~/pages/public/AboutPage'))
		},
		{
			path: '/contact'
			// element: lazy(() => import('~/pages/public/ContactPage'))
		}
	]
};

// ============================================================================
// USAGE EXAMPLE
// ============================================================================

/*
// Trong file App.tsx hoặc main routing file:

import { Routes } from 'base-cms';
import { realWorldRoutesConfig } from './config/roleConfig.example';

function App() {
  return (
    <Routes
      config={realWorldRoutesConfig}
      basename="/"
      profileAPI="/api/profile"
      redirectPrivateTo="/signin"
      redirectAuthTo="/"
      keyData="data"
    />
  );
}

export default App;
*/
