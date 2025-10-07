# Sidebar với Phân Quyền theo Role

## Tổng quan

Component Sidebar hỗ trợ phân quyền tự động dựa trên role của user từ profile. Sidebar items sẽ được filter và chỉ hiển thị những items mà user có quyền truy cập.

## Cách sử dụng

### 1. Định nghĩa Sidebar Items với Roles

```typescript
import { SidebarItem } from '~/components/Layout/SideBar';

const sidebarItems: SidebarItem[] = [
	{
		id: 'dashboard',
		navlabel: true,
		title: 'Dashboard',
		subMenu: [
			{
				id: 'overview',
				title: 'Tổng quan',
				href: '/dashboard',
				icon: DashboardIcon
				// Tất cả roles đều có thể truy cập (không có roles hoặc mảng rỗng)
			},
			{
				id: 'analytics',
				title: 'Phân tích',
				href: '/dashboard/analytics',
				icon: AnalyticsIcon,
				roles: ['admin', 'manager'] // Chỉ admin và manager mới thấy
			}
		]
	},
	{
		id: 'users',
		navlabel: true,
		title: 'Quản lý',
		subMenu: [
			{
				id: 'user-list',
				title: 'Danh sách người dùng',
				href: '/users',
				icon: PeopleIcon,
				roles: ['admin'] // Chỉ admin mới thấy
			},
			{
				id: 'settings',
				title: 'Cài đặt',
				href: '/settings',
				icon: SettingsIcon,
				roles: ['admin', 'manager', 'user'] // Nhiều roles
			}
		]
	}
];
```

### 2. Sử dụng Sidebar Component

```typescript
import { Sidebar } from '~/components/Layout/SideBar';

function Layout() {
  return (
    <Sidebar
      items={sidebarItems}
      logoUrl="/logo.png"
      logoWidth="150px"
      logoHeight="50px"
    />
  );
}
```

## Cấu trúc Role trong Profile

Component sẽ tự động lấy role từ user profile thông qua `useAuth()` hook. Profile API cần trả về một trong các cấu trúc sau:

### Trường hợp 1: Role đơn (string)

```json
{
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "john@example.com",
		"role": "admin"
	}
}
```

### Trường hợp 2: Multiple Roles (array)

```json
{
	"user": {
		"id": 1,
		"name": "John Doe",
		"email": "john@example.com",
		"roles": ["admin", "manager"]
	}
}
```

## Logic Phân Quyền

### Quy tắc kiểm tra quyền:

1. **Không có roles hoặc mảng rỗng**: Tất cả users đều có thể truy cập
2. **Có roles**: Chỉ users có role nằm trong danh sách mới có thể truy cập
3. **Không có user role**: Không có quyền truy cập

### Filter theo cấp độ:

1. **NavLabel (Nhóm chính)**:
    - Chỉ hiển thị nếu có ít nhất 1 submenu item được phép truy cập

2. **Menu Item với SubMenu**:
    - Chỉ hiển thị nếu có ít nhất 1 submenu được phép truy cập
    - SubMenu được filter recursively

3. **Menu Item thường**:
    - Hiển thị dựa trên roles của item

## Utility Functions

### `filterSidebarByRole(items, userRole)`

Filter toàn bộ sidebar items dựa trên role.

```typescript
import { filterSidebarByRole } from '~/components/Layout/SideBar';

const filteredItems = filterSidebarByRole(sidebarItems, 'admin');
```

### `hasAccessToItem(item, userRole)`

Kiểm tra xem user có quyền truy cập vào một item cụ thể không.

```typescript
import { hasAccessToItem } from '~/components/Layout/SideBar';

const canAccess = hasAccessToItem(item, 'admin'); // true hoặc false
```

## Ví dụ Hoàn Chỉnh

```typescript
import { Analytics, Home, People, Settings } from '@mui/icons-material';

import { SidebarItem } from '~/components/Layout/SideBar';

const menuItems: SidebarItem[] = [
	{
		id: 'main',
		navlabel: true,
		title: 'Chính',
		subMenu: [
			{
				id: 'home',
				title: 'Trang chủ',
				href: '/',
				icon: Home
				// Không có roles - tất cả đều truy cập được
			}
		]
	},
	{
		id: 'management',
		navlabel: true,
		title: 'Quản lý',
		subMenu: [
			{
				id: 'users',
				title: 'Người dùng',
				icon: People,
				roles: ['admin'],
				subMenu: [
					{
						id: 'user-list',
						title: 'Danh sách',
						href: '/users',
						roles: ['admin']
					},
					{
						id: 'user-create',
						title: 'Tạo mới',
						href: '/users/create',
						roles: ['admin']
					}
				]
			},
			{
				id: 'analytics',
				title: 'Báo cáo',
				href: '/analytics',
				icon: Analytics,
				roles: ['admin', 'manager']
			}
		]
	},
	{
		id: 'settings',
		navlabel: true,
		title: 'Cài đặt',
		subMenu: [
			{
				id: 'profile',
				title: 'Hồ sơ',
				href: '/profile',
				icon: Settings
				// Tất cả users đã đăng nhập
			}
		]
	}
];

export default menuItems;
```

## Testing

### Test với different roles:

```typescript
// Admin - sẽ thấy tất cả
const adminItems = filterSidebarByRole(menuItems, 'admin');

// Manager - sẽ thấy một số
const managerItems = filterSidebarByRole(menuItems, 'manager');

// User - chỉ thấy items không có roles hoặc có role 'user'
const userItems = filterSidebarByRole(menuItems, 'user');

// Multiple roles
const multiRoleItems = filterSidebarByRole(menuItems, ['admin', 'manager']);
```

## Lưu ý

1. **Performance**: Filter được thực hiện mỗi khi component re-render. Với sidebar items lớn, có thể cần useMemo.

2. **Security**: Đây chỉ là UI protection. Cần implement route guards và API authorization riêng.

3. **Caching**: Role được lấy từ auth context, đảm bảo profile đã được load trước khi render sidebar.

4. **Case Sensitive**: Role comparison là case-sensitive. 'Admin' khác 'admin'.
