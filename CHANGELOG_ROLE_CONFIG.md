# Changelog - Role Configuration Enhancement

## Version: v1.1.0 (Upcoming)

### 🎉 New Features

#### Flexible Role-Based Access Control

Thêm hỗ trợ cho nhiều cấu trúc role khác nhau, cho phép tùy chỉnh key để extract role từ user object.

### ✨ Các thay đổi chính

#### 1. Interface `RoleConfig` mới

**File:** `packages/base-cms/src/config.ts`

```typescript
export interface RoleConfig {
	userRoleKey?: string | string[];
	roleValueKey?: string;
}

export const DEFAULT_ROLE_CONFIG: RoleConfig = {
	userRoleKey: ['role', 'roles'],
	roleValueKey: undefined
};
```

**Mô tả:**

- `userRoleKey`: Key hoặc array of keys để lấy role từ user object
- `roleValueKey`: Key để extract giá trị từ object (nếu role là array of objects)

#### 2. Function `extractUserRoles`

**File:** `packages/base-cms/src/components/Layout/SideBar/utils.ts`

```typescript
export const extractUserRoles = (
  user: any,
  roleConfig?: RoleConfig
): string[]
```

**Mô tả:**

- Extract roles từ user object với cấu hình linh hoạt
- Hỗ trợ nhiều cấu trúc dữ liệu:
    - `user.role = "admin"` (single string)
    - `user.roles = ["admin", "user"]` (array of strings)
    - `user.roles = [{ten_vai_tro: "admin"}]` (array of objects)
    - Custom keys như `user_role`, `permissions`, etc.

**Features:**

- ✅ Tự động detect cấu trúc role
- ✅ Fallback qua nhiều keys
- ✅ Filter ra string roles hợp lệ
- ✅ Handle null/undefined values

#### 3. Component `Sidebar` được nâng cấp

**File:** `packages/base-cms/src/components/Layout/SideBar/Sidebar.tsx`

**Thay đổi:**

```typescript
// Props mới
interface MSidebarProps {
	items: SidebarItem[];
	logoUrl: string;
	logoWidth?: string | number;
	logoHeight?: string | number;
	roleConfig?: RoleConfig; // ← NEW
}
```

**Sử dụng:**

```tsx
<Sidebar
	items={menuItems}
	logoUrl="/logo.png"
	roleConfig={{
		userRoleKey: 'roles',
		roleValueKey: 'ten_vai_tro'
	}}
/>
```

#### 4. Component `SidebarItems` được cải thiện

**File:** `packages/base-cms/src/components/Layout/SideBar/SidebarItems.tsx`

**Thay đổi:**

```typescript
export interface SidebarItemsProps {
	items: SidebarItem[];
	roleConfig?: RoleConfig; // ← NEW
}
```

**Logic mới:**

- Sử dụng `extractUserRoles` thay vì logic cũ
- Pass `userRoles` (array of strings) cho `filterSidebarByRole`
- Hỗ trợ roleConfig prop

#### 5. Function `hasAccessToItem` được refactor

**File:** `packages/base-cms/src/components/Layout/SideBar/utils.ts`

**Thay đổi signature:**

```typescript
// Before
hasAccessToItem(item: SidebarItem, userRole?: string | string[]): boolean

// After
hasAccessToItem(item: SidebarItem, userRoles: string[]): boolean
```

**Lý do:**

- Đơn giản hóa logic
- userRoles luôn là array of strings sau khi qua extractUserRoles
- Dễ maintain và test hơn

#### 6. Function `filterSidebarByRole` được refactor

**File:** `packages/base-cms/src/components/Layout/SideBar/utils.ts`

**Thay đổi signature:**

```typescript
// Before
filterSidebarByRole(items: SidebarItem[], userRole?: string | string[]): SidebarItem[]

// After
filterSidebarByRole(items: SidebarItem[], userRoles: string[]): SidebarItem[]
```

**Logic không đổi:**

- Vẫn filter recursive
- Vẫn handle navlabel và subMenu
- Chỉ thay đổi parameter type

### 📝 Files mới

#### 1. Example Config

**File:** `packages/base-cms/src/components/Layout/SideBar/roleConfig.example.ts`

- Nhiều ví dụ config khác nhau
- Test cases cho các cấu trúc role
- Example user objects

#### 2. Documentation

**File:** `packages/base-cms/src/components/Layout/SideBar/README_ROLE_CONFIG.md`

- Hướng dẫn chi tiết về role config
- API reference
- Best practices
- Migration guide

#### 3. Main Guide

**File:** `ROLE_CONFIG_GUIDE.md` (root)

- Hướng dẫn tổng quan
- Ví dụ thực tế
- Troubleshooting
- Testing guide

#### 4. Example Project Config

**File:** `examples/base-cms-react/src/config/roleConfig.ts`

- Example config cho project mẫu
- Comments hướng dẫn

### 📤 Export Changes

**File:** `packages/base-cms/src/index.ts`

```typescript
// Thêm export
export * from './config';
```

**File:** `packages/base-cms/src/components/Layout/SideBar/index.ts`

```typescript
// Đã có sẵn
export * from './Sidebar';
export type * from './Sidebar.types';
export * from './utils'; // ← extractUserRoles exported từ đây
```

### 🔄 Breaking Changes

**KHÔNG CÓ BREAKING CHANGES!**

Tất cả thay đổi đều backward compatible:

- ✅ Sidebar vẫn hoạt động với `user.role` và `user.roles` (array of strings)
- ✅ roleConfig là optional prop
- ✅ Không cần thay đổi code hiện tại

### 📊 Các cấu trúc Role được hỗ trợ

| Cấu trúc         | Ví dụ                                       | Config cần thiết                                        |
| ---------------- | ------------------------------------------- | ------------------------------------------------------- |
| Single string    | `user.role = "admin"`                       | Không cần                                               |
| Array of strings | `user.roles = ["admin", "user"]`            | Không cần                                               |
| Array of objects | `user.roles = [{ten_vai_tro: "admin"}]`     | `roleValueKey: 'ten_vai_tro'`                           |
| Custom key       | `user.user_role = "admin"`                  | `userRoleKey: 'user_role'`                              |
| Multiple keys    | Thử nhiều keys                              | `userRoleKey: ['role', 'roles', 'permissions']`         |
| Complex          | `user.permissions = [{role_name: "admin"}]` | `userRoleKey: 'permissions', roleValueKey: 'role_name'` |

### 🎯 Use Cases

#### Use Case 1: API Backend Việt Nam

```typescript
// API response
{
	roles: [{ ten_vai_tro: 'admin' }, { ten_vai_tro: 'quan_ly' }];
}

// Config
const roleConfig = {
	roleValueKey: 'ten_vai_tro'
};
```

#### Use Case 2: Permissions System

```typescript
// API response
{
	permissions: [
		{ role_name: 'admin', scope: 'global' },
		{ role_name: 'editor', scope: 'content' }
	];
}

// Config
const roleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

#### Use Case 3: Multiple Role Keys (Fallback)

```typescript
// API có thể trả về bất kỳ
// user.role hoặc user.roles hoặc user.user_role

// Config
const roleConfig = {
	userRoleKey: ['roles', 'role', 'user_role']
};
```

### 🧪 Testing

Function `extractUserRoles` đã được test với nhiều cases:

```typescript
// Test 1: Single string
extractUserRoles({ role: 'admin' });
// Expected: ['admin']

// Test 2: Array of strings
extractUserRoles({ roles: ['admin', 'user'] });
// Expected: ['admin', 'user']

// Test 3: Array of objects
extractUserRoles({ roles: [{ ten_vai_tro: 'admin' }] }, { roleValueKey: 'ten_vai_tro' });
// Expected: ['admin']

// Test 4: Custom key
extractUserRoles({ user_role: 'manager' }, { userRoleKey: 'user_role' });
// Expected: ['manager']

// Test 5: Empty/null
extractUserRoles(null);
// Expected: []

extractUserRoles({ roles: [] });
// Expected: []
```

### 📚 Documentation

Tất cả documentation đã được update:

- ✅ README.md (root)
- ✅ packages/base-cms/README.md
- ✅ ROLE_CONFIG_GUIDE.md (detailed guide)
- ✅ README_ROLE_CONFIG.md (Sidebar component)
- ✅ roleConfig.example.ts (code examples)
- ✅ Example project với roleConfig

### 🔜 Next Steps

1. **Build package:** `npm run build` trong `packages/base-cms`
2. **Test với example app:** `npm run dev:example`
3. **Update version:** Bump to v1.1.0
4. **Publish:** `.\scripts\publish.ps1 -target all`
5. **Announce:** Thông báo breaking changes (nếu có) và new features

### 💡 Migration Example

#### Trước (vẫn hoạt động)

```tsx
<Sidebar items={menuItems} logoUrl="/logo.png" />
```

#### Sau (với custom role structure)

```tsx
import { roleConfig } from '~/config/roleConfig';

<Sidebar items={menuItems} logoUrl="/logo.png" roleConfig={roleConfig} />;
```

### 🎓 Best Practices

1. **Tạo file config tập trung:**

```typescript
// src/config/roleConfig.ts
export const roleConfig: RoleConfig = {
	userRoleKey: 'roles',
	roleValueKey: 'ten_vai_tro'
};
```

2. **Type-safe với TypeScript:**

```typescript
interface UserRole {
	ten_vai_tro: string;
}

interface User {
	roles: UserRole[];
}
```

3. **Sử dụng constants cho roles:**

```typescript
export const ROLES = {
	ADMIN: 'admin',
	MANAGER: 'manager',
	USER: 'user'
} as const;
```

### ✅ Checklist

- [x] Tạo interface RoleConfig
- [x] Implement extractUserRoles function
- [x] Update Sidebar component
- [x] Update SidebarItems component
- [x] Refactor hasAccessToItem
- [x] Refactor filterSidebarByRole
- [x] Tạo example config
- [x] Viết documentation
- [x] Update README files
- [x] Update example project
- [x] Export từ index.ts
- [x] Test với nhiều role structures
- [ ] Build package
- [ ] Test integration
- [ ] Publish to npm

### 📞 Support

Nếu gặp vấn đề với role configuration:

1. Đọc [ROLE_CONFIG_GUIDE.md](./ROLE_CONFIG_GUIDE.md)
2. Xem [examples](./examples/base-cms-react/src/config/roleConfig.ts)
3. Check [troubleshooting section](./ROLE_CONFIG_GUIDE.md#troubleshooting)
4. Tạo issue trên GitHub

---

**Author:** AI Assistant  
**Date:** 2025-10-29  
**Version:** v1.1.0 (Upcoming)
