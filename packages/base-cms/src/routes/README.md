# Routes Configuration

## Tính năng mới: Custom Redirect Paths

Bạn có thể tùy chỉnh các đường dẫn redirect cho guards bằng cách sử dụng props `redirectPrivateTo` và `redirectAuthTo` trong component `Routes`.

### Cách sử dụng

```tsx
import { Routes, RoutesConfig } from '@libeyondea/base-cms';

const routesConfig: RoutesConfig = {
	// ... your route configuration
};

const App = () => {
	return (
		<Routes
			config={routesConfig}
			// Custom redirect paths
			redirectPrivateTo="/custom-signin" // Redirect to custom signin page
			redirectAuthTo="/custom-dashboard" // Redirect to custom dashboard
		/>
	);
};
```

### Props

| Prop                | Type     | Default     | Mô tả                                                                        |
| ------------------- | -------- | ----------- | ---------------------------------------------------------------------------- |
| `redirectPrivateTo` | `string` | `'/signin'` | Đường dẫn redirect khi người dùng chưa đăng nhập truy cập vào private routes |
| `redirectAuthTo`    | `string` | `'/'`       | Đường dẫn redirect khi người dùng đã đăng nhập truy cập vào auth routes      |

### Ví dụ

```tsx
// Sử dụng default redirect paths
<Routes config={routesConfig} />

// Custom redirect paths
<Routes
  config={routesConfig}
  redirectPrivateTo="/login"
  redirectAuthTo="/home"
/>

// Chỉ custom một trong hai
<Routes
  config={routesConfig}
  redirectPrivateTo="/custom-login"
  // redirectAuthTo sẽ sử dụng default '/'
/>
```

### Lưu ý

- Các props này là optional, nếu không được cung cấp sẽ sử dụng giá trị mặc định
- Đường dẫn redirect phải là absolute path (bắt đầu với `/`)
- Tính năng này hoạt động với tất cả các guard types: `private`, `auth`, `public`, `none`
