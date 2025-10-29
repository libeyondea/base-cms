# 🎉 Tóm tắt nhanh - Role Configuration Enhancement

## ✨ Tính năng mới

Base-CMS giờ đây hỗ trợ **linh hoạt nhiều cấu trúc role** khác nhau!

### Các cấu trúc được hỗ trợ

✅ `role: 'admin'` - Single string  
✅ `roles: ['admin', 'user']` - Array of strings  
✅ `roles: [{ten_vai_tro: 'admin'}]` - Array of objects  
✅ `user_role: 'admin'` - Custom key name  
✅ `permissions: [{role_name: 'admin'}]` - Complex structures  
✅ Multiple keys fallback

## 🚀 Cách sử dụng

### Cách 1: Không cần config (mặc định)

Nếu API trả về `user.role` hoặc `user.roles` với array of strings:

```tsx
<Sidebar items={menuItems} logoUrl="/logo.png" />
```

### Cách 2: Với custom config

Nếu API trả về role là array of objects:

```tsx
// 1. Tạo file config
// src/config/roleConfig.ts
import { RoleConfig } from '@libeyondea/base-cms';

export const roleConfig: RoleConfig = {
  userRoleKey: 'roles',        // Key để lấy roles
  roleValueKey: 'ten_vai_tro'   // Key để extract từ object
};

// 2. Sử dụng trong Layout
import { roleConfig } from '~/config/roleConfig';

<Sidebar
  items={menuItems}
  logoUrl="/logo.png"
  roleConfig={roleConfig}
/>
```

## 📦 Interface mới

```typescript
export interface RoleConfig {
	userRoleKey?: string | string[]; // Key hoặc array of keys
	roleValueKey?: string; // Key để extract từ object
}
```

## 🎯 Ví dụ thực tế

### Ví dụ 1: API Việt Nam

```typescript
// API response:
{
	roles: [{ ten_vai_tro: 'admin' }, { ten_vai_tro: 'quan_ly' }];
}

// Config:
export const roleConfig = {
	roleValueKey: 'ten_vai_tro'
};
```

### Ví dụ 2: Permissions System

```typescript
// API response:
{
	permissions: [{ role_name: 'admin' }, { role_name: 'editor' }];
}

// Config:
export const roleConfig = {
	userRoleKey: 'permissions',
	roleValueKey: 'role_name'
};
```

## 📚 Tài liệu

📖 [ROLE_CONFIG_GUIDE.md](./ROLE_CONFIG_GUIDE.md) - Hướng dẫn chi tiết  
📖 [README_ROLE_CONFIG.md](./packages/base-cms/src/components/Layout/SideBar/README_ROLE_CONFIG.md) - API Reference  
📖 [roleConfig.example.ts](./packages/base-cms/src/components/Layout/SideBar/roleConfig.example.ts) - Code examples  
📖 [Example Project](./examples/base-cms-react/src/config/roleConfig.ts) - Implementation example

## 🔄 Backward Compatible

✅ **KHÔNG CÓ BREAKING CHANGES**  
✅ Code hiện tại vẫn hoạt động bình thường  
✅ roleConfig là optional  
✅ Mặc định vẫn support `user.role` và `user.roles`

## 🎁 Bonus: Function mới

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

## 📝 Files đã thay đổi

### Core Files

- ✅ `packages/base-cms/src/config.ts` - RoleConfig interface
- ✅ `packages/base-cms/src/components/Layout/SideBar/utils.ts` - extractUserRoles function
- ✅ `packages/base-cms/src/components/Layout/SideBar/Sidebar.tsx` - roleConfig prop
- ✅ `packages/base-cms/src/components/Layout/SideBar/SidebarItems.tsx` - Use extractUserRoles
- ✅ `packages/base-cms/src/index.ts` - Export config

### Documentation

- ✅ `ROLE_CONFIG_GUIDE.md` - Main guide
- ✅ `packages/base-cms/src/components/Layout/SideBar/README_ROLE_CONFIG.md` - Component guide
- ✅ `packages/base-cms/src/components/Layout/SideBar/roleConfig.example.ts` - Examples
- ✅ `CHANGELOG_ROLE_CONFIG.md` - Detailed changelog

### Example Project

- ✅ `examples/base-cms-react/src/config/roleConfig.ts` - Example config
- ✅ `examples/base-cms-react/src/layouts/private/PrivateLayout.tsx` - Usage example

### README Updates

- ✅ `README.md` - Root README
- ✅ `packages/base-cms/README.md` - Package README

## 🎓 Best Practices

1. **Tạo file config riêng**: `src/config/roleConfig.ts`
2. **Type-safe với TypeScript**: Define interface cho User và UserRole
3. **Sử dụng constants**: `ROLES.ADMIN`, `ROLES.MANAGER`, etc.
4. **Test với nhiều role structures**: Single, array, object, custom keys

## 🔜 Next Steps

1. Build package: `npm run build` trong `packages/base-cms`
2. Test với example: `npm run dev:example`
3. Publish: `.\scripts\publish.ps1 -target all`

## 💬 Feedback

Nếu bạn có ý kiến hoặc gặp vấn đề, hãy tạo issue trên GitHub!

---

**Version:** v1.1.0 (Upcoming)  
**Date:** 2025-10-29
