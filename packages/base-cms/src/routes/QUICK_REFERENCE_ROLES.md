# Quick Reference - Role-Based Routing

## 📋 Cheat Sheet

### 1. Route cơ bản với roles

```typescript
{
  path: '/admin',
  element: AdminPage,
  roles: ['admin']
}
```

### 2. Multiple roles

```typescript
{
  path: '/dashboard',
  element: DashboardPage,
  roles: ['admin', 'manager', 'supervisor']
}
```

### 3. Không có roles (tất cả users)

```typescript
{
  path: '/profile',
  element: ProfilePage,
  // Không có roles = tất cả users đã đăng nhập
}
```

### 4. Parent route với roles

```typescript
{
  path: '/admin',
  layout: AdminLayout,
  roles: ['admin'],
  children: [
    {
      path: 'users',
      element: UsersPage,
      // Kế thừa roles: ['admin']
    },
    {
      path: 'settings',
      element: SettingsPage,
      roles: ['super_admin'], // Override
    }
  ]
}
```

## 🔧 RoleConfig Examples

### Default (không cần config)

API trả về: `{ role: 'admin' }` hoặc `{ roles: ['admin'] }`

```typescript
// Không cần config gì
const routesConfig: RoutesConfig = {
  private: [...]
};
```

### Custom key

API trả về: `{ user_role: 'admin' }`

```typescript
const routesConfig: RoutesConfig = {
  roleConfig: {
    userRoleKey: 'user_role'
  },
  private: [...]
};
```

### Array of objects

API trả về: `{ roles: [{ ten_vai_tro: 'admin' }] }`

```typescript
const routesConfig: RoutesConfig = {
  roleConfig: {
    userRoleKey: 'roles',
    roleValueKey: 'ten_vai_tro'
  },
  private: [...]
};
```

### Multiple possible keys

```typescript
const routesConfig: RoutesConfig = {
  roleConfig: {
    userRoleKey: ['role', 'user_role', 'permissions'],
    roleValueKey: 'name'
  },
  private: [...]
};
```

## 📦 Complete Example

```typescript
import { RoutesConfig } from 'base-cms';

// 1. Định nghĩa roleConfig (nếu cần)
const roleConfig = {
  userRoleKey: 'roles',
  roleValueKey: 'ten_vai_tro'
};

// 2. Định nghĩa routes config
const routesConfig: RoutesConfig = {
  roleConfig,

  auth: [
    { path: '/signin', element: SignInPage }
  ],

  private: [
    // Admin only
    {
      path: '/admin',
      layout: AdminLayout,
      roles: ['admin'],
      children: [
        { path: 'users', element: UsersPage },
        { path: 'settings', element: SettingsPage }
      ]
    },

    // Admin + Manager
    {
      path: '/management',
      layout: ManagementLayout,
      roles: ['admin', 'manager'],
      children: [
        { path: 'reports', element: ReportsPage }
      ]
    },

    // All authenticated users
    {
      path: '/profile',
      element: ProfilePage
    }
  ]
};

// 3. Sử dụng Routes component
function App() {
  return (
    <Routes
      config={routesConfig}
      basename="/"
      profileAPI="/api/profile"
      redirectPrivateTo="/signin"
    />
  );
}
```

## 🎯 Common Patterns

### Pattern 1: Admin Section

```typescript
{
  path: '/admin',
  layout: AdminLayout,
  roles: ['admin'],
  children: [
    { index: true, element: AdminDashboard },
    { path: 'users', element: UsersPage },
    { path: 'settings', element: SettingsPage }
  ]
}
```

### Pattern 2: Multi-level roles

```typescript
{
  path: '/dashboard',
  layout: DashboardLayout,
  roles: ['admin', 'manager'], // Parent roles
  children: [
    {
      path: 'analytics',
      element: AnalyticsPage,
      // Kế thừa: ['admin', 'manager']
    },
    {
      path: 'advanced',
      element: AdvancedPage,
      roles: ['admin'] // Chỉ admin
    }
  ]
}
```

### Pattern 3: Route groups

```typescript
{
	groups: [
		{
			prefix: '/management',
			guard: 'private',
			layout: ManagementLayout,
			routes: [
				{ path: 'users', element: UsersPage, roles: ['admin'] },
				{ path: 'reports', element: ReportsPage, roles: ['admin', 'manager'] }
			]
		}
	];
}
```

## 🔍 Debug Helper

```typescript
import { extractUserRoles } from 'base-cms';

// Debug user roles
const user = /* user từ API */;
const roleConfig = {
  userRoleKey: 'roles',
  roleValueKey: 'ten_vai_tro'
};

const userRoles = extractUserRoles(user, roleConfig);
console.log('Current user roles:', userRoles);
```

## ⚡ Quick Tips

1. **Không có roles** = tất cả users (authenticated) có thể truy cập
2. **Child routes** kế thừa roles từ parent (trừ khi override)
3. **RoleConfig** chỉ cần định nghĩa một lần trong `RoutesConfig`
4. **Guard + Roles** hoạt động cùng nhau (auth check trước, roles check sau)
5. **Mặc định** redirect về NotFound route (`path: '*'`) khi không có quyền

## 📚 API Reference

```typescript
// RouteConfig
interface RouteConfig {
	path?: string;
	element?: Component;
	guard?: 'private' | 'auth' | 'public' | 'none';
	layout?: Component;
	children?: RouteConfig[];
	roles?: string[]; // 👈 New
}

// RoleConfig
interface RoleConfig {
	userRoleKey?: string | string[];
	roleValueKey?: string;
}

// RoutesConfig
interface RoutesConfig {
	auth?: RouteConfig[];
	private?: RouteConfig[];
	public?: RouteConfig[];
	groups?: RouteGroupConfig[];
	roleConfig?: RoleConfig; // 👈 New
}
```

## 🚀 Migration

### Before (không có roles)

```typescript
const routesConfig: RoutesConfig = {
	private: [{ path: '/admin', element: AdminPage }]
};
```

### After (với roles)

```typescript
const routesConfig: RoutesConfig = {
	roleConfig: {
		/* nếu cần */
	},
	private: [
		{
			path: '/admin',
			element: AdminPage,
			roles: ['admin']
		}
	]
};
```

## ❓ Troubleshooting

### User bị redirect về NotFound (404) liên tục

- Kiểm tra `roleConfig` có đúng không
- Kiểm tra API trả về user với roles đúng format
- Debug bằng `extractUserRoles(user, roleConfig)`

### Muốn redirect về trang khác thay vì NotFound

- Thêm `roleRedirectTo` vào route config options
- Hoặc custom `fallback` component cho từng route

### Roles không kế thừa

- Child route có thuộc tính `roles` riêng sẽ override parent
- Xóa `roles` ở child để kế thừa từ parent

### TypeScript errors

```typescript
import { RoleConfig, RoutesConfig } from 'base-cms';
```
