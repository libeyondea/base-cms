# Custom Routes System

Hệ thống routes linh hoạt cho phép người dùng thư viện tùy chỉnh routes một cách dễ dàng.

## Cách sử dụng

### 1. Sử dụng routes mặc định

```tsx
import Routes from 'base-cms/routes';

function App() {
	return <Routes />;
}
```

### 2. Sử dụng custom routes

```tsx
import { lazy } from 'react';

import Routes, { RoutesConfig } from 'base-cms/routes';

// Import layouts
const PrivateLayout = lazy(() => import('./layouts/PrivateLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));

// Import pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Login = lazy(() => import('./pages/Login'));
const Products = lazy(() => import('./pages/Products'));

const routesConfig: RoutesConfig = {
	// Auth routes (có AuthGuard tự động)
	auth: [
		{
			path: '',
			layout: AuthLayout,
			children: [
				{
					path: 'login',
					element: Login
				},
				{
					path: 'register',
					element: lazy(() => import('./pages/Register'))
				}
			]
		}
	],

	// Private routes (có PrivateGuard tự động)
	private: [
		{
			path: '',
			layout: PrivateLayout,
			children: [
				{
					index: true,
					element: Dashboard
				},
				{
					path: 'products',
					element: Products,
					meta: {
						title: 'Quản lý sản phẩm',
						icon: <ProductIcon />
					}
				},
				{
					path: 'users',
					element: lazy(() => import('./pages/Users'))
				}
			]
		}
	],

	// Public routes (không cần guard)
	public: [
		{
			path: 'about',
			element: lazy(() => import('./pages/About'))
		},
		{
			path: 'contact',
			element: lazy(() => import('./pages/Contact'))
		}
	],

	// Custom 404 page (optional - nếu không cung cấp sẽ dùng NotFound mặc định)
	notFound: lazy(() => import('./pages/NotFound'))
};

function App() {
	return <Routes config={routesConfig} />;
}
```

### 3. Sử dụng Route Groups

```tsx
const routesConfig: RoutesConfig = {
	groups: [
		{
			// Group cho admin panel
			prefix: 'admin',
			layout: AdminLayout,
			guard: 'private',
			routes: [
				{
					index: true,
					element: AdminDashboard
				},
				{
					path: 'settings',
					element: Settings
				}
			]
		},
		{
			// Group cho API documentation
			prefix: 'docs',
			guard: 'public',
			routes: [
				{
					path: 'api',
					element: ApiDocs
				},
				{
					path: 'guides',
					element: Guides
				}
			]
		}
	]
};
```

### 4. Cấu hình nâng cao

```tsx
const routesConfig: RoutesConfig = {
	// Base path cho toàn bộ app
	basePath: '/app',

	private: [
		{
			path: '',
			layout: PrivateLayout,
			children: [
				{
					index: true,
					element: Dashboard
				},
				{
					path: 'settings',
					// Override guard cho route cụ thể
					guard: 'none',
					element: Settings
				}
			]
		}
	]
};

function App() {
	return <Routes config={routesConfig} basename="/app" />;
}
```

## API Reference

### RoutesConfig

| Property   | Type                 | Description                                                                |
| ---------- | -------------------- | -------------------------------------------------------------------------- |
| `auth`     | `RouteConfig[]`      | Auth routes (có AuthGuard tự động)                                         |
| `private`  | `RouteConfig[]`      | Private routes (có PrivateGuard tự động)                                   |
| `public`   | `RouteConfig[]`      | Public routes (không cần guard)                                            |
| `groups`   | `RouteGroupConfig[]` | Custom route groups                                                        |
| `notFound` | `Component`          | Component cho 404 page (optional - mặc định sẽ dùng NotFound của thư viện) |
| `error`    | `Component`          | Component cho error page                                                   |
| `basePath` | `string`             | Base path cho toàn bộ routes                                               |

### RouteConfig

| Property   | Type                                        | Description         |
| ---------- | ------------------------------------------- | ------------------- |
| `path`     | `string`                                    | Đường dẫn của route |
| `element`  | `Component`                                 | Component để render |
| `guard`    | `'private' \| 'auth' \| 'public' \| 'none'` | Guard type          |
| `layout`   | `Component`                                 | Layout wrapper      |
| `children` | `RouteConfig[]`                             | Children routes     |
| `index`    | `boolean`                                   | Route index         |
| `meta`     | `object`                                    | Metadata cho route  |

### RouteGroupConfig

| Property | Type            | Description            |
| -------- | --------------- | ---------------------- |
| `layout` | `Component`     | Layout chung cho group |
| `guard`  | `GuardType`     | Guard chung cho group  |
| `prefix` | `string`        | Prefix path cho group  |
| `routes` | `RouteConfig[]` | Routes trong group     |

## Guard Types

- **`private`**: Yêu cầu đăng nhập, redirect về `/signin` nếu chưa đăng nhập
- **`auth`**: Chỉ cho phép người chưa đăng nhập, redirect về `/` nếu đã đăng nhập
- **`public`**: Không có guard, ai cũng truy cập được
- **`none`**: Tương tự public

## Utilities

```tsx
import { createLazyRoute, generateRoutes } from 'base-cms/routes/utils';

// Tạo lazy route
const Dashboard = createLazyRoute(() => import('./pages/Dashboard'));

// Generate routes từ config
const routes = generateRoutes(routesConfig);
```

## Export Guards

Bạn có thể sử dụng Guards riêng lẻ:

```tsx
import { AuthGuard, PrivateGuard } from 'base-cms/routes/guards';

function MyComponent() {
	return (
		<PrivateGuard>
			<ProtectedContent />
		</PrivateGuard>
	);
}
```

## NotFound Page Mặc Định

Hệ thống routes tự động cung cấp trang NotFound mặc định từ thư viện. Bạn **không bắt buộc** phải cung cấp `notFound` trong config.

**Ví dụ không cần NotFound:**

```tsx
const routesConfig: RoutesConfig = {
	private: [
		{
			index: true,
			element: Dashboard
		}
	]
	// Không cần khai báo notFound, hệ thống tự động dùng NotFound mặc định
};
```

**Ví dụ với NotFound tùy chỉnh:**

```tsx
const routesConfig: RoutesConfig = {
	private: [
		{
			index: true,
			element: Dashboard
		}
	],
	notFound: lazy(() => import('./pages/CustomNotFound')) // Override NotFound mặc định
};
```
