# @libeyondea/base-cms

Thư viện React CMS cơ bản với các component và utility được tối ưu hóa cho việc xây dựng hệ thống quản trị nội dung.

## 📦 Cài đặt

```bash
npm install @libeyondea/base-cms
```

### Dependencies có sẵn

Library này đã bao gồm các dependencies sau, **không cần cài thêm** để tránh xung đột phiên bản:

#### Core Dependencies

- `@emotion/react` (11.14.0)
- `@emotion/styled` (11.14.1)
- `@mui/material` (7.3.4)
- `@mui/system` (7.3.3)
- `@mui/icons-material` (7.3.4)
- `@mui/x-date-pickers` (8.12.0)

#### Form & Validation

- `react-hook-form` (7.63.0)
- `@hookform/resolvers` (5.2.2)
- `yup` (1.7.1)

#### State Management

- `@reduxjs/toolkit` (2.9.0)
- `react-redux` (9.2.0)

#### Data & API

- `@tanstack/react-query` (5.90.2)
- `@tanstack/react-table` (8.21.3)
- `axios` (1.12.2)

#### Utilities

- `moment` (2.30.1)
- `lodash-es` (4.17.21)
- `js-cookie` (3.0.5)
- `qs` (6.14.0)

#### UI Components

- `react-big-calendar` (1.19.4)
- `react-icons` (5.5.0)
- `react-number-format` (5.4.4)
- `react-toastify` (11.0.5)

> ⚠️ **Lưu ý**: Nếu bạn cần cài thêm các package này, hãy đảm bảo sử dụng cùng phiên bản hoặc tương thích để tránh xung đột.

### Peer Dependencies (Cần cài thêm)

Các package sau cần được cài đặt trong project của bạn:

```bash
npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.3 @reduxjs/toolkit@2.9.0 react-redux@9.2.0
```

> ℹ️ **Lý do**: Đây là các peer dependencies để tránh xung đột phiên bản React, routing và state management giữa các project khác nhau.

## 🚀 Bắt đầu nhanh

### Sử dụng cơ bản

```tsx
import React from 'react';

import { AppProvider, FormProvider, MainCard, RHFTextField, StanstackTable } from '@libeyondea/base-cms';
import { useForm } from 'react-hook-form';

function App() {
	const methods = useForm();

	return (
		<AppProvider>
			<MainCard>
				<FormProvider methods={methods}>
					<RHFTextField name="title" label="Tiêu đề" />
				</FormProvider>
				<StanstackTable data={[]} columns={[]} />
			</MainCard>
		</AppProvider>
	);
}

export default App;
```

> ⚠️ **Lưu ý**: `RHFTextField` cần được wrap trong `FormProvider` để hoạt động đúng cách.

## 📚 Tài liệu chi tiết

### 🎨 Components

#### Form Components

> ⚠️ **Lưu ý quan trọng**: Các component RHF (React Hook Form) chỉ có thể sử dụng với React Hook Form. Bạn phải wrap chúng trong `FormProvider` hoặc sử dụng `useForm` hook.

Các component form được tích hợp với React Hook Form và Yup validation:

- **FormProvider**: Provider cho form context
- **FormLabel**: Label component cho form
- **RHFTextField**: Text field với validation
- **RHFPhone**: Input số điện thoại với format Việt Nam
- **RHFDatePicker**: Date picker với validation
- **RHFTimePicker**: Time picker
- **RHFAutocomplete**: Autocomplete single selection
- **RHFAutocompleteMulti**: Autocomplete multiple selection
- **RHFNationalID**: Input CMND/CCCD với validation
- **RHFTextFieldSelect**: Text field với dropdown
- **RHFSelect**: Select dropdown
- **RHFSwitch**: Switch toggle
- **RHFTextFieldAdvanced**: Text field nâng cao với nhiều tùy chọn

#### Input Components

> ℹ️ **Khác biệt**: Các component N (NTextField, NSelect, v.v.) là các component input cơ bản không tích hợp với React Hook Form, có thể sử dụng độc lập.

Các component input cơ bản không có validation:

- **NTextField**: Text field cơ bản
- **NSelect**: Select dropdown cơ bản
- **NAutocompleteMulti**: Autocomplete multiple cơ bản
- **NTextFieldSelect**: Text field với dropdown cơ bản

#### Table Components

Hệ thống table mạnh mẽ dựa trên TanStack Table:

- **StanstackTable**: Table component chính
- **SubTable**: Table con cho nested data
- **TableToolbar**: Toolbar cho table
- **TableSkeletonRow**: Skeleton loading cho table
- **DefaultColumnFilter**: Filter mặc định cho cột
- **EmptyView**: View khi table trống
- **Row**: Component row tùy chỉnh
- **useTableData**: Hook quản lý data table

#### UI Components

Các component UI tiện ích:

- **MainCard**: Card container chính
- **CommonModal**: Modal component chung
- **CustomBreadcrumbs**: Breadcrumb navigation
- **CustomTabs**: Tab component tùy chỉnh
- **CustomToast**: Toast notification
- **DateRangePicker**: Date range picker
- **DynamicIcon**: Icon component động
- **ImageModal**: Modal hiển thị ảnh
- **MenuCustom**: Menu component tùy chỉnh
- **SearchCustom**: Search component
- **SoundButton**: Button với âm thanh
- **StatusChip**: Chip hiển thị trạng thái
- **ThemeToggle**: Toggle dark/light mode
- **TruncatedText**: Text bị cắt với tooltip
- **AvatarList**: Danh sách avatar

#### Layout Components

- **Header**: Header component
- **Sidebar**: Sidebar navigation
- **PageContainer**: Container cho page
- **LoadingScreen**: Loading screen

### 🛠️ Utilities

#### Axios

```tsx
import { axiosInstance } from '@libeyondea/base-cms';

// Sử dụng axios instance đã được cấu hình
const response = await axiosInstance.get('/api/users');
```

#### Color Utilities

```tsx
import { generateColorPalette, getContrastColor } from '@libeyondea/base-cms';

const colors = generateColorPalette('#1976d2');
const contrastColor = getContrastColor('#ffffff');
```

#### Time Utilities

```tsx
import { formatDate, formatDateTime, formatTime } from '@libeyondea/base-cms';

const formattedDate = formatDate(new Date());
const formattedTime = formatTime(new Date());
const formattedDateTime = formatDateTime(new Date());
```

#### Format Utilities

```tsx
import { formatCurrency, formatNumber, formatPhone } from '@libeyondea/base-cms';

const currency = formatCurrency(1000000); // "1,000,000 VND"
const number = formatNumber(1234.56); // "1,234.56"
const phone = formatPhone('0123456789'); // "0123 456 789"
```

#### Cookie Utilities

```tsx
import { getCookie, removeCookie, setCookie } from '@libeyondea/base-cms';

setCookie('token', 'abc123', 7); // 7 ngày
const token = getCookie('token');
removeCookie('token');
```

### 🎯 Hooks

#### useStateValue

```tsx
import { useStateValue } from '@libeyondea/base-cms';

function MyComponent() {
	const { state, dispatch } = useStateValue();

	return <div>{state.user?.name}</div>;
}
```

#### useAudioPlayer

```tsx
import { useAudioPlayer } from '@libeyondea/base-cms';

function AudioComponent() {
	const { play, pause, stop, isPlaying } = useAudioPlayer('/audio/sound.mp3');

	return (
		<div>
			<button onClick={play}>Play</button>
			<button onClick={pause}>Pause</button>
			<button onClick={stop}>Stop</button>
		</div>
	);
}
```

### 🎨 Theme

#### Sử dụng theme

```tsx
import { AppProvider, createCustomTheme } from '@libeyondea/base-cms';

const customTheme = createCustomTheme('light');

function App() {
	return <AppProvider customTheme={customTheme}>{/* Your app content */}</AppProvider>;
}
```

#### Theme utilities

```tsx
import { getThemeSpacing, themeValues } from '@libeyondea/base-cms';

const spacing = getThemeSpacing(2); // "16px"
const borderRadius = themeValues.borderRadius.medium; // 12
```

### 📊 Constants

```tsx
import { REQUIRED_MESSAGE, STATUS_CONSTANT, USER_CONSTANT, WEEK_DAYS } from '@libeyondea/base-cms';

// Sử dụng constants
const message = REQUIRED_MESSAGE; // "Trường này là bắt buộc"
const users = USER_CONSTANT; // [{ id: 0, name: 'Quản trị viên' }, ...]
const statuses = STATUS_CONSTANT; // [{ id: 0, name: 'Không hoạt động' }, ...]
const days = WEEK_DAYS; // [{ id: '0', name: 'CN' }, ...]
```

### 🔧 Service

#### BaseService

```tsx
import { BaseService } from '@libeyondea/base-cms';

class UserService extends BaseService {
	constructor() {
		super('/users');
	}

	async getUsers() {
		return this.get('/');
	}

	async createUser(data: any) {
		return this.post('/', data);
	}
}

const userService = new UserService();
```

## 📋 Ví dụ sử dụng

### Tạo form đăng ký

```tsx
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { AppProvider, FormProvider, MainCard, RHFDatePicker, RHFPhone, RHFSelect, RHFTextField } from '@libeyondea/base-cms';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
	name: yup.string().required('Tên là bắt buộc'),
	email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	phone: yup.string().required('Số điện thoại là bắt buộc'),
	birthDate: yup.date().required('Ngày sinh là bắt buộc'),
	role: yup.number().required('Vai trò là bắt buộc')
});

function RegisterForm() {
	const methods = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			name: '',
			email: '',
			phone: '',
			birthDate: null,
			role: 0
		}
	});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<AppProvider>
			<MainCard title="Đăng ký người dùng">
				<FormProvider methods={methods} onSubmit={onSubmit}>
					<RHFTextField name="name" label="Họ và tên" />
					<RHFTextField name="email" label="Email" type="email" />
					<RHFPhone name="phone" label="Số điện thoại" />
					<RHFDatePicker name="birthDate" label="Ngày sinh" />
					<RHFSelect name="role" label="Vai trò" options={USER_CONSTANT} />
					<button type="submit">Đăng ký</button>
				</FormProvider>
			</MainCard>
		</AppProvider>
	);
}
```

### Tạo bảng dữ liệu

```tsx
import React from 'react';

import { AppProvider, MainCard, StanstackTable } from '@libeyondea/base-cms';

const columns = [
	{
		accessorKey: 'id',
		header: 'ID'
	},
	{
		accessorKey: 'name',
		header: 'Tên'
	},
	{
		accessorKey: 'email',
		header: 'Email'
	},
	{
		accessorKey: 'status',
		header: 'Trạng thái',
		cell: ({ getValue }: any) => <StatusChip status={getValue() === 1 ? 'active' : 'inactive'} label={getValue() === 1 ? 'Hoạt động' : 'Không hoạt động'} />
	}
];

const data = [
	{ id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', status: 1 },
	{ id: 2, name: 'Trần Thị B', email: 'b@example.com', status: 0 }
];

function UserTable() {
	return (
		<AppProvider>
			<MainCard title="Danh sách người dùng">
				<StanstackTable data={data} columns={columns} enablePagination enableSorting enableFiltering />
			</MainCard>
		</AppProvider>
	);
}
```

### Sử dụng State Management

```tsx
import React from 'react';

import { AppProvider, useStateValue } from '@libeyondea/base-cms';
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Tạo slice
const userSlice = createSlice({
	name: 'user',
	initialState: { name: '', email: '' },
	reducers: {
		setUser: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
		}
	}
});

// Tạo store
const store = configureStore({
	reducer: {
		user: userSlice.reducer
	}
});

function UserProfile() {
	const { state, dispatch } = useStateValue();

	const handleSetUser = () => {
		dispatch({
			type: 'user/setUser',
			payload: { name: 'Nguyễn Văn A', email: 'a@example.com' }
		});
	};

	return (
		<AppProvider store={store}>
			<div>
				<h2>Thông tin người dùng</h2>
				<p>Tên: {state.user?.name || 'Chưa có'}</p>
				<p>Email: {state.user?.email || 'Chưa có'}</p>
				<button onClick={handleSetUser}>Cập nhật thông tin</button>
			</div>
		</AppProvider>
	);
}
```

## 🎯 Tính năng chính

- ✅ **Form Management**: Tích hợp React Hook Form với Yup validation
- ✅ **Table System**: Bảng dữ liệu mạnh mẽ với TanStack Table
- ✅ **State Management**: Tích hợp Redux Toolkit cho quản lý state
- ✅ **Theme System**: Hệ thống theme linh hoạt với dark/light mode
- ✅ **UI Components**: Bộ component UI đầy đủ và tùy chỉnh được
- ✅ **Utilities**: Các utility functions hữu ích
- ✅ **TypeScript**: Hỗ trợ TypeScript đầy đủ
- ✅ **Responsive**: Thiết kế responsive cho mọi thiết bị
- ✅ **Accessibility**: Tuân thủ các tiêu chuẩn accessibility

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Nguyen Thuc**

## 🔗 Liên kết

- [Repository](https://github.com/libeyondea/base-cms)
- [NPM Package](https://www.npmjs.com/package/@libeyondea/base-cms)

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi, vui lòng:

- Tạo issue trên [GitHub repository](https://github.com/libeyondea/base-cms)
- Liên hệ qua Twitter: [@libeyondea](https://twitter.com/libeyondea)
