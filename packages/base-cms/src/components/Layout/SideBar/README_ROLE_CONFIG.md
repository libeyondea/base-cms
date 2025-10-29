# Cấu hình Role-Based Access Control cho Sidebar

## Tổng quan

Hệ thống sidebar của base-cms giờ đây hỗ trợ nhiều cấu trúc dữ liệu role khác nhau, cho phép bạn tùy chỉnh cách extract role từ user object để phù hợp với nhiều dự án khác nhau.

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

## Cách sử dụng

### Sử dụng mặc định (không cần config)

Nếu API của bạn trả về user với `role` (string) hoặc `roles` (array), bạn không cần config gì:

```tsx
import { Sidebar } from 'base-cms';

function Layout() {
	const sidebarItems = [
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
					roles: ['admin', 'manager'] // Chỉ admin và manager được xem
				},
				{
					id: '1-2',
					title: 'Users',
					href: '/users',
					icon: UsersIcon,
					roles: ['admin'] // Chỉ admin được xem
				}
			]
		}
	];

	return <Sidebar items={sidebarItems} logoUrl="/logo.png" />;
}
```

### Sử dụng với custom config

#### Ví dụ 1: Role là object với custom key

Nếu API trả về:

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

```tsx
import { RoleConfig, Sidebar } from 'base-cms';

const roleConfig: RoleConfig = {
	userRoleKey: 'roles', // Key để lấy roles từ user
	roleValueKey: 'ten_vai_tro' // Key để extract giá trị từ object
};

function Layout() {
	return <Sidebar items={sidebarItems} logoUrl="/logo.png" roleConfig={roleConfig} />;
}
```

#### Ví dụ 2: Custom role key name

Nếu API trả về:

```typescript
{
  id: 1,
  name: "John Doe",
  user_role: "admin"
}
```

Cấu hình:

```tsx
const roleConfig: RoleConfig = {
	userRoleKey: 'user_role'
};
```

#### Ví dụ 3: Multiple possible keys

Nếu bạn muốn hệ thống thử nhiều keys (ưu tiên key đầu tiên):

```tsx
const roleConfig: RoleConfig = {
	userRoleKey: ['role', 'user_role', 'permissions'], // Thử lần lượt các keys này
	roleValueKey: 'name' // Nếu là object, lấy giá trị từ key 'name'
};
```

#### Ví dụ 4: Role phức tạp

Nếu API trả về:

```typescript
{
  id: 1,
  name: "John Doe",
  permissions: [
    { role_name: "admin", department: "IT" },
    { role_name: "manager", department: "HR" }
  ]
}
```

Cấu hình:

```tsx
const roleConfig: RoleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

## API Reference

### RoleConfig Interface

```typescript
interface RoleConfig {
	/**
	 * Key để lấy role từ user object
	 * Có thể là string hoặc array of strings (thử lần lượt)
	 * @example 'role' | 'roles' | ['role', 'roles', 'user_role']
	 * @default ['role', 'roles']
	 */
	userRoleKey?: string | string[];

	/**
	 * Key để extract giá trị role từ object (nếu role là array of objects)
	 * @example 'ten_vai_tro' | 'role_name' | 'name'
	 * @default undefined (coi như role là string hoặc array of strings)
	 */
	roleValueKey?: string;
}
```

### extractUserRoles Function

Function này được sử dụng nội bộ, nhưng bạn có thể sử dụng nếu cần:

```typescript
import { extractUserRoles } from 'base-cms';

const user = {
	roles: [{ ten_vai_tro: 'admin' }]
};

const roleConfig = {
	roleValueKey: 'ten_vai_tro'
};

const userRoles = extractUserRoles(user, roleConfig);
// Output: ['admin']
```

## Best Practices

1. **Định nghĩa roleConfig một lần**: Tạo một file config riêng và export roleConfig để sử dụng xuyên suốt ứng dụng:

```typescript
// src/config/roleConfig.ts
import { RoleConfig } from 'base-cms';

export const roleConfig: RoleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};
```

2. **Sử dụng TypeScript**: Định nghĩa type cho user của bạn:

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

3. **Test với nhiều role**: Đảm bảo sidebar hoạt động đúng với các role khác nhau:

```typescript
// Test cases
const testUsers = [
	{ role: 'admin' }, // Single string
	{ roles: ['admin', 'user'] }, // Array of strings
	{ roles: [{ ten_vai_tro: 'admin' }] }, // Array of objects
	{ user_role: 'manager' } // Custom key
];
```

## Ví dụ thực tế

### Dự án với roles là array of objects

```tsx
// src/config/roleConfig.ts
export const roleConfig = {
  userRoleKey: 'roles',
  roleValueKey: 'ten_vai_tro'
};

// src/layouts/MainLayout.tsx
import { Sidebar } from 'base-cms';
import { roleConfig } from '@/config/roleConfig';
import { sidebarItems } from './sidebarConfig';

export function MainLayout() {
  return (
    <div>
      <Sidebar
        items={sidebarItems}
        logoUrl="/logo.png"
        roleConfig={roleConfig}
      />
      {/* ... rest of layout */}
    </div>
  );
}

// src/layouts/sidebarConfig.tsx
export const sidebarItems = [
  {
    id: '1',
    navlabel: true,
    title: 'Quản lý',
    subMenu: [
      {
        id: '1-1',
        title: 'Dashboard',
        href: '/dashboard',
        icon: DashboardIcon,
        roles: ['admin', 'manager']
      },
      {
        id: '1-2',
        title: 'Người dùng',
        href: '/users',
        icon: UsersIcon,
        roles: ['admin']
      },
      {
        id: '1-3',
        title: 'Báo cáo',
        href: '/reports',
        icon: ReportIcon,
        // Không có roles = tất cả đều truy cập được
      }
    ]
  }
];
```

## Migration Guide

Nếu bạn đang sử dụng phiên bản cũ, không cần thay đổi gì. Phiên bản mới vẫn tương thích ngược:

```tsx
// Cách cũ - vẫn hoạt động
<Sidebar items={items} logoUrl="/logo.png" />

// Cách mới - với roleConfig
<Sidebar
  items={items}
  logoUrl="/logo.png"
  roleConfig={{ roleValueKey: 'ten_vai_tro' }}
/>
```
