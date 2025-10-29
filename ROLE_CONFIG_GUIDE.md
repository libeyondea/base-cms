# Hướng dẫn cấu hình Role-Based Access Control

## Tổng quan

Base-CMS giờ đây hỗ trợ linh hoạt nhiều cấu trúc dữ liệu role khác nhau, cho phép bạn tùy chỉnh cách extract role từ user object để phù hợp với bất kỳ API backend nào.

## Các thay đổi chính

### 1. Interface RoleConfig mới

```typescript
interface RoleConfig {
	userRoleKey?: string | string[]; // Key để lấy role từ user
	roleValueKey?: string; // Key để extract giá trị từ object
}
```

### 2. Component Sidebar hỗ trợ roleConfig prop

```typescript
<Sidebar
  items={sidebarItems}
  logoUrl="/logo.png"
  roleConfig={roleConfig}  // ← Prop mới
/>
```

### 3. Function extractUserRoles

Function mới để extract roles từ user object với cấu hình linh hoạt.

## Các cấu trúc Role được hỗ trợ

### ✅ Cấu trúc 1: Single Role (String)

```typescript
const user = {
	role: 'admin'
};

// Config: Không cần (mặc định)
const roleConfig = undefined;
```

### ✅ Cấu trúc 2: Multiple Roles (Array of Strings)

```typescript
const user = {
	roles: ['admin', 'manager', 'user']
};

// Config: Không cần (mặc định)
const roleConfig = undefined;
```

### ✅ Cấu trúc 3: Roles as Objects (Array of Objects)

```typescript
const user = {
	roles: [{ ten_vai_tro: 'admin' }, { ten_vai_tro: 'manager' }]
};

// Config: Cần chỉ định roleValueKey
const roleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};
```

### ✅ Cấu trúc 4: Custom Key Name

```typescript
const user = {
	user_role: 'admin'
};

// Config: Chỉ định custom key
const roleConfig = {
	userRoleKey: 'user_role'
};
```

### ✅ Cấu trúc 5: Permissions Array

```typescript
const user = {
	permissions: [
		{ role_name: 'admin', department: 'IT' },
		{ role_name: 'manager', department: 'HR' }
	]
};

// Config: Chỉ định key và value key
const roleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

### ✅ Cấu trúc 6: Multiple Possible Keys (Fallback)

```typescript
const user = {
	// Có thể là bất kỳ trong các keys này
	roles: ['admin']
	// hoặc role: "admin",
	// hoặc user_role: "admin",
	// hoặc permissions: [...]
};

// Config: Array of keys - thử lần lượt
const roleConfig = {
	userRoleKey: ['roles', 'role', 'user_role', 'permissions'],
	roleValueKey: 'name'
};
```

## Cách sử dụng từng bước

### Bước 1: Xác định cấu trúc user object

Kiểm tra API của bạn trả về user object như thế nào:

```typescript
// Ví dụ: API /api/profile trả về:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Nguyen Van A",
    "email": "admin@example.com",
    "roles": [
      { "ten_vai_tro": "admin" },
      { "ten_vai_tro": "manager" }
    ]
  }
}
```

### Bước 2: Tạo file config

Tạo file `src/config/roleConfig.ts`:

```typescript
import { RoleConfig } from '@libeyondea/base-cms';

export const roleConfig: RoleConfig = {
	userRoleKey: 'roles', // Lấy từ user.roles
	roleValueKey: 'ten_vai_tro' // Extract giá trị từ object
};
```

### Bước 3: Sử dụng trong Layout

```typescript
import { Sidebar } from '@libeyondea/base-cms';
import { roleConfig } from '~/config/roleConfig';

function PrivateLayout() {
  return (
    <Sidebar
      items={menuItems}
      logoUrl="/logo.png"
      roleConfig={roleConfig}
    />
  );
}
```

### Bước 4: Định nghĩa roles cho sidebar items

```typescript
const menuItems = [
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
				roles: ['admin', 'manager'] // ← Chỉ admin và manager xem được
			},
			{
				id: '1-2',
				title: 'Người dùng',
				href: '/users',
				icon: UsersIcon,
				roles: ['admin'] // ← Chỉ admin xem được
			},
			{
				id: '1-3',
				title: 'Báo cáo',
				href: '/reports',
				icon: ReportIcon
				// ← Không có roles = tất cả đều xem được
			}
		]
	}
];
```

## Ví dụ thực tế

### Ví dụ 1: API backend của Việt Nam

**API Response:**

```json
{
	"data": {
		"id": 1,
		"ten": "Nguyen Van A",
		"email": "admin@example.com",
		"danh_sach_vai_tro": [{ "ten_vai_tro": "quan_tri_vien" }, { "ten_vai_tro": "quan_ly" }]
	}
}
```

**Config:**

```typescript
export const roleConfig: RoleConfig = {
	userRoleKey: 'danh_sach_vai_tro',
	roleValueKey: 'ten_vai_tro'
};
```

**Sidebar Items:**

```typescript
const menuItems = [
	{
		id: '1',
		title: 'Dashboard',
		href: '/dashboard',
		roles: ['quan_tri_vien', 'quan_ly']
	}
];
```

### Ví dụ 2: API backend chuẩn REST

**API Response:**

```json
{
	"user": {
		"id": 1,
		"name": "John Doe",
		"roles": ["admin", "editor"]
	}
}
```

**Config:**

```typescript
// Không cần config, sử dụng mặc định
export const roleConfig = undefined;
```

### Ví dụ 3: API với permissions system

**API Response:**

```json
{
	"user": {
		"id": 1,
		"name": "Jane Smith",
		"permissions": [
			{
				"role_name": "admin",
				"scope": "global",
				"granted_at": "2024-01-01"
			}
		]
	}
}
```

**Config:**

```typescript
export const roleConfig: RoleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

## API Reference

### RoleConfig

```typescript
interface RoleConfig {
	/**
	 * Key để lấy role từ user object
	 * Có thể là string hoặc array (thử lần lượt)
	 */
	userRoleKey?: string | string[];

	/**
	 * Key để extract giá trị từ object (nếu role là array of objects)
	 */
	roleValueKey?: string;
}
```

### Sidebar Props

```typescript
interface SidebarProps {
	items: SidebarItem[];
	logoUrl: string;
	logoWidth?: string | number;
	logoHeight?: string | number;
	roleConfig?: RoleConfig; // ← Prop mới
}
```

### SidebarItem

```typescript
interface SidebarItem {
	id: string;
	title: string;
	href?: string;
	icon?: React.ComponentType;
	navlabel?: boolean;
	subMenu?: SidebarItem[];
	roles?: string[]; // ← Định nghĩa quyền truy cập
}
```

### extractUserRoles Function

```typescript
function extractUserRoles(user: any, roleConfig?: RoleConfig): string[];
```

**Parameters:**

- `user`: User object từ API
- `roleConfig`: Cấu hình optional để extract roles

**Returns:**

- Array of string roles

**Example:**

```typescript
import { extractUserRoles } from '@libeyondea/base-cms';

const user = {
	roles: [{ ten_vai_tro: 'admin' }]
};

const roles = extractUserRoles(user, {
	roleValueKey: 'ten_vai_tro'
});
// Output: ['admin']
```

## Best Practices

### 1. Tạo file config tập trung

```typescript
// src/config/roleConfig.ts
import { RoleConfig } from '@libeyondea/base-cms';

export const roleConfig: RoleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};
```

### 2. Type-safe với TypeScript

```typescript
// src/types/user.ts
interface UserRole {
	ten_vai_tro: string;
}

export interface User {
	id: number;
	name: string;
	roles: UserRole[];
}
```

### 3. Tái sử dụng role constants

```typescript
// src/constants/roles.ts
export const ROLES = {
	ADMIN: 'admin',
	MANAGER: 'manager',
	USER: 'user'
} as const;

// Sử dụng
const menuItems = [
	{
		id: '1',
		title: 'Dashboard',
		roles: [ROLES.ADMIN, ROLES.MANAGER]
	}
];
```

### 4. Kiểm tra roles trong components

```typescript
import { useAuth, extractUserRoles } from '@libeyondea/base-cms';
import { roleConfig } from '~/config/roleConfig';
import { ROLES } from '~/constants/roles';

function MyComponent() {
  const { user } = useAuth();
  const userRoles = extractUserRoles(user, roleConfig);

  const isAdmin = userRoles.includes(ROLES.ADMIN);

  return (
    <div>
      {isAdmin && <AdminPanel />}
    </div>
  );
}
```

## Migration Guide

### Từ phiên bản cũ

Phiên bản mới hoàn toàn tương thích ngược. Không cần thay đổi gì nếu API của bạn sử dụng `user.role` hoặc `user.roles` với array of strings.

**Trước:**

```typescript
<Sidebar items={items} logoUrl="/logo.png" />
```

**Sau (optional):**

```typescript
<Sidebar
  items={items}
  logoUrl="/logo.png"
  roleConfig={roleConfig}  // Chỉ cần thêm nếu dùng custom structure
/>
```

## Testing

### Test extractUserRoles

```typescript
import { extractUserRoles } from '@libeyondea/base-cms';

describe('extractUserRoles', () => {
	it('should extract from single role string', () => {
		const user = { role: 'admin' };
		const roles = extractUserRoles(user);
		expect(roles).toEqual(['admin']);
	});

	it('should extract from roles array', () => {
		const user = { roles: ['admin', 'user'] };
		const roles = extractUserRoles(user);
		expect(roles).toEqual(['admin', 'user']);
	});

	it('should extract from object array with custom key', () => {
		const user = { roles: [{ ten_vai_tro: 'admin' }] };
		const roles = extractUserRoles(user, { roleValueKey: 'ten_vai_tro' });
		expect(roles).toEqual(['admin']);
	});
});
```

## Troubleshooting

### Sidebar không hiển thị menu items

**Nguyên nhân:** RoleConfig không đúng hoặc user không có roles

**Giải pháp:**

1. Log user object để kiểm tra cấu trúc:

```typescript
const { user } = useAuth();
console.log('User:', user);
```

2. Test extractUserRoles:

```typescript
import { extractUserRoles } from '@libeyondea/base-cms';

const roles = extractUserRoles(user, roleConfig);
console.log('Extracted roles:', roles);
```

3. Kiểm tra sidebar items có roles match không:

```typescript
console.log('Menu roles:', menuItems[0].subMenu[0].roles);
```

### Type error với roleConfig

**Nguyên nhân:** Package chưa được build lại

**Giải pháp:**

```bash
cd packages/base-cms
npm run build
```

### Roles không được extract đúng

**Nguyên nhân:** roleConfig không match với cấu trúc API

**Giải pháp:**

1. Kiểm tra API response chính xác
2. Adjust roleConfig cho phù hợp
3. Test với nhiều user objects khác nhau

## Files thay đổi

- ✅ `packages/base-cms/src/config.ts` - Interface RoleConfig
- ✅ `packages/base-cms/src/components/Layout/SideBar/utils.ts` - extractUserRoles function
- ✅ `packages/base-cms/src/components/Layout/SideBar/Sidebar.tsx` - roleConfig prop
- ✅ `packages/base-cms/src/components/Layout/SideBar/SidebarItems.tsx` - sử dụng extractUserRoles
- ✅ `examples/base-cms-react/src/config/roleConfig.ts` - Example config
- ✅ `examples/base-cms-react/src/layouts/private/PrivateLayout.tsx` - Example usage

## Tài liệu tham khảo

- [README_ROLE_CONFIG.md](./packages/base-cms/src/components/Layout/SideBar/README_ROLE_CONFIG.md) - Chi tiết về Sidebar config
- [roleConfig.example.ts](./packages/base-cms/src/components/Layout/SideBar/roleConfig.example.ts) - Nhiều ví dụ config khác nhau

## Hỗ trợ

Nếu bạn gặp vấn đề hoặc cần hỗ trợ thêm, vui lòng tạo issue trên GitHub repository.
