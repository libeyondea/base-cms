# Quick Reference - Role Configuration

## 🚀 5-Minute Setup Guide

### Step 1: Xác định cấu trúc user của bạn

```typescript
// Kiểm tra API response của bạn
console.log(user);
```

### Step 2: Tạo roleConfig (nếu cần)

```typescript
// src/config/roleConfig.ts
import { RoleConfig } from '@libeyondea/base-cms';

export const roleConfig: RoleConfig = {
	userRoleKey: 'roles', // ← Key để lấy roles từ user
	roleValueKey: 'ten_vai_tro' // ← Key để lấy giá trị từ object (optional)
};
```

### Step 3: Sử dụng trong Sidebar

```typescript
import { Sidebar } from '@libeyondea/base-cms';
import { roleConfig } from '~/config/roleConfig';

<Sidebar
  items={menuItems}
  logoUrl="/logo.png"
  roleConfig={roleConfig}
/>
```

## 📋 Config Examples

### Không cần config

```typescript
// user.role = "admin"
// user.roles = ["admin", "user"]
const roleConfig = undefined; // ← Không cần config
```

### Array of objects với custom key

```typescript
// user.roles = [{ ten_vai_tro: "admin" }]
const roleConfig = {
	roleValueKey: 'ten_vai_tro'
};
```

### Custom key name

```typescript
// user.user_role = "admin"
const roleConfig = {
	userRoleKey: 'user_role'
};
```

### Permissions system

```typescript
// user.permissions = [{ role_name: "admin" }]
const roleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

### Multiple keys (fallback)

```typescript
// Thử lần lượt: roles -> role -> user_role
const roleConfig = {
	userRoleKey: ['roles', 'role', 'user_role']
};
```

## 🎯 Sidebar Items Config

```typescript
const menuItems = [
	{
		id: '1',
		navlabel: true,
		title: 'Menu chính',
		subMenu: [
			{
				id: '1-1',
				title: 'Dashboard',
				href: '/dashboard',
				icon: DashboardIcon,
				roles: ['admin', 'manager'] // ← Chỉ admin và manager xem được
			},
			{
				id: '1-2',
				title: 'Users',
				href: '/users',
				icon: UsersIcon,
				roles: ['admin'] // ← Chỉ admin
			},
			{
				id: '1-3',
				title: 'Reports',
				href: '/reports',
				icon: ReportIcon
				// ← Không có roles = tất cả xem được
			}
		]
	}
];
```

## 🔍 Debug Helper

```typescript
import { extractUserRoles } from '@libeyondea/base-cms';

import { roleConfig } from '~/config/roleConfig';

// Log để debug
const { user } = useAuth();
const roles = extractUserRoles(user, roleConfig);

console.log('User:', user);
console.log('Extracted roles:', roles);
console.log('Menu items:', menuItems);
```

## 📊 Common Patterns

### Pattern 1: Vietnamese API

```typescript
// API: { roles: [{ ten_vai_tro: "admin" }] }
const roleConfig = { roleValueKey: 'ten_vai_tro' };
```

### Pattern 2: Standard REST API

```typescript
// API: { roles: ["admin", "user"] }
const roleConfig = undefined; // Default works
```

### Pattern 3: Complex Permissions

```typescript
// API: {
//   permissions: [
//     { role_name: "admin", scope: "global" }
//   ]
// }
const roleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

## ⚡ Type Definitions

```typescript
interface RoleConfig {
	userRoleKey?: string | string[];
	roleValueKey?: string;
}

interface SidebarItem {
	id: string;
	title: string;
	href?: string;
	icon?: React.ComponentType;
	navlabel?: boolean;
	subMenu?: SidebarItem[];
	roles?: string[]; // ← Quyền truy cập
}

function extractUserRoles(user: any, roleConfig?: RoleConfig): string[];
```

## 🐛 Troubleshooting

### Menu không hiển thị

✅ Check: `extractUserRoles(user, roleConfig)` trả về gì?  
✅ Check: Menu items có `roles` match không?  
✅ Check: roleConfig đúng với API structure chưa?

### Type error

✅ Build lại package: `npm run build`  
✅ Restart TypeScript server

### Roles không được extract

✅ Log user object: `console.log(user)`  
✅ Verify roleConfig keys match với user object  
✅ Check roleValueKey có đúng không

## 📚 Full Documentation

- [ROLE_CONFIG_GUIDE.md](../../../../../ROLE_CONFIG_GUIDE.md)
- [README_ROLE_CONFIG.md](./README_ROLE_CONFIG.md)
- [roleConfig.example.ts](./roleConfig.example.ts)

---

**Tip:** Copy example configs từ `roleConfig.example.ts` và modify cho project của bạn!
