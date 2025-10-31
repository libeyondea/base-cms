# Role-Based Access Control cho Routes

## Tổng quan

Hệ thống routing của base-cms giờ đây hỗ trợ role-based access control tương tự như Sidebar, cho phép bạn kiểm soát quyền truy cập vào các routes dựa trên roles của user.

## Tính năng

- ✅ Kiểm tra phân quyền tự động cho từng route
- ✅ Hỗ trợ nhiều cấu trúc dữ liệu role khác nhau
- ✅ Kế thừa roles từ parent route
- ✅ Tùy chỉnh redirect path khi không có quyền
- ✅ Tích hợp hoàn toàn với guards hiện có (private, auth, public)

## Cách sử dụng

### 1. Cấu hình cơ bản

Thêm thuộc tính `roles` vào route config:

```typescript
import { RoutesConfig } from 'base-cms';

const routesConfig: RoutesConfig = {
	private: [
		{
			path: '/admin',
			element: AdminPage,
			roles: ['admin'] // Chỉ admin mới truy cập được
		},
		{
			path: '/dashboard',
			element: DashboardPage,
			roles: ['admin', 'manager'] // Admin hoặc manager mới truy cập được
		},
		{
			path: '/profile',
			element: ProfilePage
			// Không có roles = tất cả user đã đăng nhập đều truy cập được
		}
	]
};
```

### 2. Cấu hình với RoleConfig

Nếu API của bạn trả về user với cấu trúc role khác nhau, bạn cần cấu hình `roleConfig`:

#### Ví dụ 1: Role là object với custom key

API trả về:

```typescript
{
  id: 1,
  name: "John Doe",
  roles: [
    { ten_vai_tro: "admin" },
    { ten_vai_tro: "manager" }
  ]
}
```

Cấu hình:

```typescript
import { RoleConfig, RoutesConfig } from 'base-cms';

const roleConfig: RoleConfig = {
	userRoleKey: 'roles', // Key để lấy roles từ user
	roleValueKey: 'ten_vai_tro' // Key để extract giá trị từ object
};

const routesConfig: RoutesConfig = {
	roleConfig, // Thêm roleConfig vào đây
	private: [
		{
			path: '/admin',
			element: AdminPage,
			roles: ['admin']
		}
	]
};
```

#### Ví dụ 2: Custom role key name

API trả về:

```typescript
{
  id: 1,
  name: "John Doe",
  user_role: "admin"
}
```

Cấu hình:

```typescript
const roleConfig: RoleConfig = {
	userRoleKey: 'user_role'
};
```

#### Ví dụ 3: Multiple possible keys

```typescript
const roleConfig: RoleConfig = {
	userRoleKey: ['role', 'user_role', 'permissions'], // Thử lần lượt các keys này
	roleValueKey: 'name' // Nếu là object, lấy giá trị từ key 'name'
};
```

### 3. Kế thừa roles từ parent route

Các child routes sẽ kế thừa roles từ parent nếu không có roles riêng:

```typescript
const routesConfig: RoutesConfig = {
	private: [
		{
			path: '/admin',
			layout: AdminLayout,
			roles: ['admin'], // Parent role
			children: [
				{
					path: 'users',
					element: UsersPage
					// Kế thừa roles: ['admin'] từ parent
				},
				{
					path: 'settings',
					element: SettingsPage,
					roles: ['admin', 'super_admin'] // Override parent roles
				}
			]
		}
	]
};
```

### 4. Sử dụng với route groups

```typescript
const routesConfig: RoutesConfig = {
	groups: [
		{
			prefix: '/management',
			guard: 'private',
			layout: ManagementLayout,
			routes: [
				{
					path: 'users',
					element: UsersPage,
					roles: ['admin']
				},
				{
					path: 'reports',
					element: ReportsPage,
					roles: ['admin', 'manager']
				}
			]
		}
	]
};
```

### 5. Khởi tạo Routes component

```typescript
import { Routes } from 'base-cms';

function App() {
  return (
    <Routes
      config={routesConfig}
      basename="/"
      profileAPI="/api/profile"
      redirectPrivateTo="/signin"
      redirectAuthTo="/"
    />
  );
}
```

## Các cấu trúc Role được hỗ trợ

### 1. Single Role (String)

```typescript
const user = {
	id: 1,
	name: 'John Doe',
	role: 'admin'
};
```

### 2. Multiple Roles (Array of Strings)

```typescript
const user = {
	id: 1,
	name: 'John Doe',
	roles: ['admin', 'manager']
};
```

### 3. Roles as Objects (Array of Objects)

```typescript
const user = {
	id: 1,
	name: 'John Doe',
	roles: [{ ten_vai_tro: 'admin' }, { ten_vai_tro: 'manager' }]
};
```

### 4. Custom Key Structure

```typescript
const user = {
	id: 1,
	name: 'John Doe',
	user_role: 'admin',
	// hoặc
	permissions: [{ role_name: 'admin' }, { role_name: 'user' }]
};
```

## API Reference

### RouteConfig Interface

```typescript
interface RouteConfig {
	path?: string;
	element?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
	guard?: GuardType;
	layout?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
	children?: RouteConfig[];
	index?: boolean;
	meta?: {
		title?: string;
		icon?: any;
		[key: string]: any;
	};
	/**
	 * Danh sách các roles được phép truy cập route này
	 * Nếu không có hoặc là mảng rỗng thì tất cả roles đều có thể truy cập
	 */
	roles?: string[];
}
```

### RoutesConfig Interface

```typescript
interface RoutesConfig {
	auth?: RouteConfig[];
	private?: RouteConfig[];
	public?: RouteConfig[];
	groups?: RouteGroupConfig[];
	notFound?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
	error?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
	basePath?: string;
	/**
	 * Cấu hình để extract role từ user object
	 */
	roleConfig?: RoleConfig;
}
```

### RoleConfig Interface

```typescript
interface RoleConfig {
	/**
	 * Key để lấy role từ user object
	 * Có thể là string hoặc array of strings (thử lần lượt)
	 * @default ['role', 'roles']
	 */
	userRoleKey?: string | string[];

	/**
	 * Key để extract giá trị role từ object (nếu role là array of objects)
	 * @default undefined (coi như role là string hoặc array of strings)
	 */
	roleValueKey?: string;
}
```

## Best Practices

### 1. Định nghĩa roleConfig một lần

Tạo một file config riêng:

```typescript
// src/config/roleConfig.ts
import { RoleConfig } from 'base-cms';

export const roleConfig: RoleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};
```

### 2. Tổ chức routes theo roles

```typescript
// src/config/routes.ts
import { RoutesConfig } from 'base-cms';

import { roleConfig } from './roleConfig';

export const routesConfig: RoutesConfig = {
	roleConfig,
	private: [
		// Admin routes
		{
			path: '/admin',
			layout: AdminLayout,
			roles: ['admin'],
			children: [
				{ path: 'users', element: UsersPage },
				{ path: 'settings', element: SettingsPage }
			]
		},
		// Manager routes
		{
			path: '/management',
			layout: ManagementLayout,
			roles: ['admin', 'manager'],
			children: [
				{ path: 'reports', element: ReportsPage },
				{ path: 'analytics', element: AnalyticsPage }
			]
		},
		// Common routes (tất cả authenticated users)
		{
			path: '/profile',
			element: ProfilePage
		}
	]
};
```

### 3. Sử dụng TypeScript

Định nghĩa type cho user:

```typescript
interface UserRole {
	ten_vai_tro: string;
}

interface User {
	id: number;
	name: string;
	roles: UserRole[];
}
```

### 4. Test với nhiều role

```typescript
// Test cases
const testUsers = [
	{ role: 'admin' }, // Single string
	{ roles: ['admin', 'user'] }, // Array of strings
	{ roles: [{ ten_vai_tro: 'admin' }] }, // Array of objects
	{ user_role: 'manager' } // Custom key
];
```

## Xử lý khi không có quyền

### Mặc định

Khi user không có quyền truy cập, **mặc định sẽ redirect về route NotFound (`path: '*'`)** bằng cách redirect đến một path không tồn tại (`/404-not-found`). React Router sẽ tự động match với wildcard route và hiển thị trang NotFound.

### Tùy chỉnh fallback component

Có thể tùy chỉnh component hiển thị khi không có quyền:

```typescript
<RoleGuard
  requiredRoles={roles}
  roleConfig={roleConfig}
  fallback={<UnauthorizedPage />} // Hiển thị component tùy chỉnh
>
  {children}
</RoleGuard>
```

### Redirect về trang khác

Nếu muốn redirect về một trang cụ thể thay vì NotFound:

```typescript
// Trong utils.tsx
const wrapWithRoleGuard = (element: React.ReactNode, roles?: string[], options?: RouteGenerationOptions): React.ReactNode => {
  return (
    <RoleGuard
      requiredRoles={roles}
      roleConfig={options?.roleConfig}
      redirectTo="/unauthorized" // Redirect về trang unauthorized
    >
      {element}
    </RoleGuard>
  );
};
```

### Thứ tự ưu tiên

1. **Fallback component** (nếu có) - Hiển thị component tùy chỉnh
2. **Redirect** (nếu có `redirectTo`) - Redirect về trang chỉ định
3. **Mặc định** - Redirect về NotFound route (`/404-not-found` → match với `path: '*'`)

## So sánh với Sidebar

| Tính năng                  | Sidebar | Routes |
| -------------------------- | ------- | ------ |
| Role-based filtering       | ✅      | ✅     |
| RoleConfig support         | ✅      | ✅     |
| Role inheritance           | ✅      | ✅     |
| Default NotFound page      | ❌      | ✅     |
| Redirect when unauthorized | ❌      | ✅     |
| Fallback component         | ❌      | ✅     |

## Ví dụ hoàn chỉnh

```typescript
// src/config/roleConfig.ts
export const roleConfig = {
  userRoleKey: 'roles',
  roleValueKey: 'ten_vai_tro'
};

// src/config/routes.ts
import { lazy } from 'react';
import { RoutesConfig } from 'base-cms';
import { roleConfig } from './roleConfig';

const AdminLayout = lazy(() => import('@/layouts/AdminLayout'));
const DashboardLayout = lazy(() => import('@/layouts/DashboardLayout'));

const AdminPage = lazy(() => import('@/pages/admin/AdminPage'));
const UsersPage = lazy(() => import('@/pages/admin/UsersPage'));
const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));
const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const SignInPage = lazy(() => import('@/pages/SignInPage'));

export const routesConfig: RoutesConfig = {
  roleConfig,

  // Auth routes (không cần đăng nhập)
  auth: [
    {
      path: '/signin',
      element: SignInPage,
    },
  ],

  // Private routes (cần đăng nhập)
  private: [
    // Admin section
    {
      path: '/admin',
      layout: AdminLayout,
      roles: ['admin'],
      children: [
        {
          index: true,
          element: AdminPage,
        },
        {
          path: 'users',
          element: UsersPage,
        },
        {
          path: 'settings',
          element: SettingsPage,
          roles: ['admin', 'super_admin'], // Override parent
        },
      ],
    },

    // Dashboard section
    {
      path: '/',
      layout: DashboardLayout,
      children: [
        {
          index: true,
          element: DashboardPage,
          roles: ['admin', 'manager'],
        },
        {
          path: 'profile',
          element: ProfilePage,
          // Tất cả users đã đăng nhập
        },
      ],
    },
  ],
};

// src/App.tsx
import { Routes } from 'base-cms';
import { routesConfig } from '@/config/routes';

function App() {
  return (
    <Routes
      config={routesConfig}
      basename="/"
      profileAPI="/api/profile"
      redirectPrivateTo="/signin"
      redirectAuthTo="/"
    />
  );
}

export default App;
```

## Migration Guide

Nếu bạn đang sử dụng phiên bản cũ, không cần thay đổi gì. Phiên bản mới vẫn tương thích ngược:

```typescript
// Cách cũ - vẫn hoạt động
const routesConfig: RoutesConfig = {
  private: [
    {
      path: '/dashboard',
      element: DashboardPage,
    },
  ],
};

// Cách mới - với roles
const routesConfig: RoutesConfig = {
  roleConfig: {
    userRoleKey: 'roles',
    roleValueKey: 'ten_vai_tro'
  },
  private: [
    {
      path: '/dashboard',
      element: DashboardPage,
      roles: ['admin', 'manager'],
    },
  ],
};
```

## Troubleshooting

### User bị redirect về NotFound liên tục

Kiểm tra:

1. RoleConfig có đúng không?
2. API trả về user với role đúng format không?
3. Route có roles được cấu hình đúng không?

Debug:

```typescript
import { extractUserRoles } from 'base-cms';

const user = /* user từ API */;
const roleConfig = /* roleConfig của bạn */;
const userRoles = extractUserRoles(user, roleConfig);
console.log('User roles:', userRoles);
```

### Muốn redirect về trang khác thay vì NotFound

Thêm `roleRedirectTo` vào `RouteGenerationOptions`:

```typescript
// Trong generateRoutes
const options: RouteGenerationOptions = {
	...redirectOptions,
	roleConfig: config.roleConfig,
	roleRedirectTo: '/unauthorized' // Redirect về trang unauthorized
};
```

### Roles không kế thừa từ parent

Đảm bảo child route không có thuộc tính `roles` riêng. Nếu có, nó sẽ override parent roles.

### Lỗi TypeScript

Đảm bảo bạn đã import đúng types:

```typescript
import { RoleConfig, RouteConfig, RoutesConfig } from 'base-cms';
```
