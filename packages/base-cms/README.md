# 📦 @libeyondea/base-cms

> Thư viện React CMS chuyên nghiệp với bộ component, hooks và utilities đầy đủ, được xây dựng trên Material-UI v7 và các công nghệ hiện đại nhất.

[![npm version](https://img.shields.io/npm/v/@libeyondea/base-cms.svg)](https://www.npmjs.com/package/@libeyondea/base-cms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Cài đặt](#-cài-đặt)
- [Bắt đầu nhanh](#-bắt-đầu-nhanh)
- [Components](#-components)
- [Hooks](#-hooks)
- [Services](#-services)
- [Utilities](#-utilities)
- [Theme System](#-theme-system)
- [Ví dụ chi tiết](#-ví-dụ-chi-tiết)
- [API Reference](#-api-reference)
- [TypeScript Support](#-typescript-support)
- [License](#-license)

## 🎯 Giới thiệu

**@libeyondea/base-cms** là một thư viện React toàn diện, cung cấp tất cả những gì bạn cần để xây dựng một hệ thống CMS (Content Management System) hiện đại và mạnh mẽ. Được thiết kế với triết lý **"batteries included"** - tất cả đều có sẵn và sẵn sàng sử dụng ngay lập tức.

### ✨ Tính năng chính

- 🎨 **20+ UI Components** - Dựa trên Material-UI v7, tùy chỉnh sâu cho use-case CMS
- 📝 **Form System hoàn chỉnh** - React Hook Form 7.63 + Yup validation
- 📊 **Advanced Table** - TanStack Table v8 với filtering, sorting, pagination
- 🎭 **Theme System linh hoạt** - Dark/Light mode, customizable colors
- 🛣️ **Advanced Routing System** - Custom routes với guards, layouts và nested routes
- 📡 **API Integration** - BaseService class với full CRUD operations
- 🎯 **TypeScript First** - 100% type-safe với full type definitions
- 🚀 **Production Ready** - Optimized build, tree-shakeable, < 200KB gzipped
- ♿ **Accessibility** - WCAG 2.1 Level AA compliant
- 📱 **Responsive** - Mobile-first design

### 🏗️ Tech Stack

| Category          | Technologies                          |
| ----------------- | ------------------------------------- |
| **Core**          | React 19.2, TypeScript 5.9, Vite 7.1  |
| **UI Framework**  | Material-UI v7, Emotion               |
| **Form**          | React Hook Form 7.63, Yup 1.7         |
| **State**         | Redux Toolkit 2.9, React Redux 9.2    |
| **Data Fetching** | TanStack React Query 5.90, Axios 1.12 |
| **Table**         | TanStack React Table 8.21             |
| **Routing**       | React Router DOM 7.9                  |
| **Utils**         | Lodash-es, Moment, Qs                 |

## 📦 Cài đặt

### Bước 1: Cài đặt package chính

```bash
npm install @libeyondea/base-cms
```

### Bước 2: Cài đặt dev dependencies (Khuyến nghị)

```bash
npm install --save-dev @libeyondea/base-cms-dev
```

Package `@libeyondea/base-cms-dev` bao gồm:

- TypeScript 5.9.3
- Vite 7.1.9 + plugins
- ESLint 9.36.0 + Prettier 3.6.2
- Type definitions (@types/\*)

### Bước 3: Cài đặt peer dependencies (Bắt buộc)

```bash
# Cài đặt tất cả peer dependencies cần thiết
npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.3 @reduxjs/toolkit@2.9.0 react-redux@9.2.0 @emotion/react@11.14.0 @emotion/styled@11.14.1 @mui/icons-material@7.3.4 @mui/material@7.3.4 @mui/system@7.3.3 @mui/x-date-pickers@8.12.0 @tanstack/react-query@5.90.2 @tanstack/react-table@8.21.3 @hookform/resolvers@5.2.2 axios@1.12.2 dayjs@1.11.18 js-cookie@3.0.5 lodash-es@4.17.21 qs@6.14.0 react-big-calendar@1.19.4 react-hook-form@7.63.0 react-icons@5.5.0 react-number-format@5.4.4 react-toastify@11.0.5 sweetalert2@11.23.0 yup@1.7.1
```

### ⚠️ Peer Dependencies (BẮT BUỘC phải cài đặt)

Library này **yêu cầu** các dependencies sau phải được cài đặt trong project của bạn:

<details>
<summary><b>Xem danh sách peer dependencies cần cài đặt</b></summary>

#### UI & Styling

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

#### Data Fetching & Tables

- `@tanstack/react-query` (5.90.2)
- `@tanstack/react-table` (8.21.3)
- `axios` (1.12.2)

#### Utilities

- `dayjs` (1.11.18)
- `lodash-es` (4.17.21)
- `js-cookie` (3.0.5)
- `qs` (6.14.0)

#### UI Components

- `react-big-calendar` (1.19.4)
- `react-icons` (5.5.0)
- `react-number-format` (5.4.4)
- `react-toastify` (11.0.5)
- `sweetalert2` (11.23.0)

</details>

> ⚠️ **Lưu ý quan trọng**: Tất cả các dependencies trên đều là **peer dependencies** và **BẮT BUỘC** phải cài đặt trong project của bạn.

### Tại sao sử dụng Peer Dependencies?

Library sử dụng peer dependencies thay vì bundle dependencies vì:

- ✅ **Tránh xung đột phiên bản**: Người dùng có thể kiểm soát phiên bản dependencies
- ✅ **Giảm kích thước bundle**: Library nhẹ hơn, chỉ chứa code thực tế
- ✅ **Tương thích tốt hơn**: Hoạt động với project hiện có mà không gây xung đột
- ✅ **Flexibility**: Người dùng có thể chọn phiên bản dependencies phù hợp
- ✅ **Tree-shaking tốt hơn**: Chỉ import những gì thực sự cần thiết

## 🚀 Bắt đầu nhanh

### Setup cơ bản

```tsx
import React from 'react';

import { AppProvider } from '@libeyondea/base-cms';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

function App() {
	return (
		<BrowserRouter>
			<AppProvider>
				<h1>Hello Base CMS!</h1>
			</AppProvider>
		</BrowserRouter>
	);
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

### Sử dụng với custom theme

```tsx
import { AppProvider, createCustomTheme } from '@libeyondea/base-cms';
import { PaletteMode } from '@mui/material';

// Tạo custom theme
const myCustomTheme = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			main: '#1976d2'
		},
		secondary: {
			main: '#dc004e'
		}
	},
	typography: {
		fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
	}
});

function App() {
	return <AppProvider customTheme={myCustomTheme}>{/* Your app content */}</AppProvider>;
}
```

### Ví dụ Form đơn giản

```tsx
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, MainCard, RHFTextField } from '@libeyondea/base-cms';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
	email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	password: yup.string().min(6, 'Mật khẩu tối thiểu 6 ký tự').required('Mật khẩu là bắt buộc')
});

function LoginForm() {
	const methods = useForm({
		resolver: yupResolver(schema),
		defaultValues: { email: '', password: '' }
	});

	const onSubmit = (data: any) => {
		console.log('Login data:', data);
	};

	return (
		<MainCard title="Đăng nhập">
			<FormProvider methods={methods} onSubmit={onSubmit}>
				<RHFTextField name="email" label="Email" type="email" />
				<RHFTextField name="password" label="Mật khẩu" type="password" />
				<button type="submit">Đăng nhập</button>
			</FormProvider>
		</MainCard>
	);
}
```

## 🎨 Components

### Form Components

> **Lưu ý quan trọng**: Tất cả component có prefix `RHF` (React Hook Form) **phải** được wrap trong `FormProvider` để hoạt động.

| Component                 | Mô tả                                  | Props chính                            |
| ------------------------- | -------------------------------------- | -------------------------------------- |
| **FormProvider**          | Provider cho React Hook Form context   | `methods`, `onSubmit`, `children`      |
| **FormLabel**             | Label component với styling nhất quán  | `label`, `required`, `tooltip`         |
| **RHFTextField**          | Text input với validation              | `name`, `label`, `type`, `placeholder` |
| **RHFPhone**              | Input số điện thoại (format VN)        | `name`, `label`, `placeholder`         |
| **RHFDatePicker**         | Date picker với validation             | `name`, `label`, `minDate`, `maxDate`  |
| **RHFTimePicker**         | Time picker                            | `name`, `label`                        |
| **RHFAutocomplete**       | Autocomplete single selection          | `name`, `label`, `options`             |
| **RHFAutocompleteMulti**  | Autocomplete multiple selection        | `name`, `label`, `options`             |
| **RHFNationalID**         | Input CMND/CCCD với validation         | `name`, `label`                        |
| **RHFTextFieldSelect**    | Text field kết hợp dropdown            | `name`, `label`, `options`             |
| **RHFSelect**             | Select dropdown                        | `name`, `label`, `options`             |
| **RHFSwitch**             | Toggle switch                          | `name`, `label`                        |
| **RHFTextFieldAdvanced**  | Text field nâng cao với nhiều tùy chọn | `name`, `label`, `multiline`, `rows`   |
| **RHFMoney**              | Input tiền tệ với format VN            | `name`, `label`, `currency`            |
| **RHFScheduleTimePicker** | Time picker cho lịch trình             | `name`, `label`, `timeSlots`           |

#### Ví dụ sử dụng Form Components

```tsx
import { yupResolver } from '@hookform/resolvers/yup';
import {
	FormLabel,
	FormProvider,
	RHFAutocomplete,
	RHFAutocompleteMulti,
	RHFDatePicker,
	RHFMoney,
	RHFNationalID,
	RHFPhone,
	RHFSelect,
	RHFSwitch,
	RHFTextField,
	RHFTextFieldAdvanced
} from '@libeyondea/base-cms';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// Validation schema
const schema = yup.object({
	fullName: yup.string().required('Họ tên là bắt buộc'),
	email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	phone: yup.string().required('Số điện thoại là bắt buộc'),
	nationalId: yup.string().required('CMND/CCCD là bắt buộc'),
	salary: yup.number().required('Lương là bắt buộc'),
	birthDate: yup.date().required('Ngày sinh là bắt buộc').nullable(),
	role: yup.number().required('Vai trò là bắt buộc'),
	department: yup.object().required('Phòng ban là bắt buộc').nullable(),
	skills: yup.array().min(1, 'Chọn ít nhất 1 kỹ năng'),
	isActive: yup.boolean(),
	description: yup.string().max(500, 'Mô tả không quá 500 ký tự')
});

const roleOptions = [
	{ id: 1, name: 'Admin' },
	{ id: 2, name: 'Manager' },
	{ id: 3, name: 'User' }
];

const departmentOptions = [
	{ id: 1, name: 'IT' },
	{ id: 2, name: 'HR' },
	{ id: 3, name: 'Marketing' }
];

const skillOptions = [
	{ id: 1, name: 'React' },
	{ id: 2, name: 'TypeScript' },
	{ id: 3, name: 'Node.js' },
	{ id: 4, name: 'Python' }
];

function UserForm() {
	const methods = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			fullName: '',
			email: '',
			phone: '',
			nationalId: '',
			salary: 0,
			birthDate: null,
			role: 1,
			department: null,
			skills: [],
			isActive: true,
			description: ''
		}
	});

	const onSubmit = (data: any) => {
		console.log('Form data:', data);
		// Handle form submission
	};

	return (
		<FormProvider methods={methods} onSubmit={onSubmit}>
			<Grid container spacing={3}>
				{/* Basic Text Fields */}
				<Grid item xs={12} md={6}>
					<RHFTextField name="fullName" label="Họ và tên" placeholder="Nhập họ và tên" fullWidth />
				</Grid>

				<Grid item xs={12} md={6}>
					<RHFTextField name="email" label="Email" type="email" placeholder="example@email.com" fullWidth />
				</Grid>

				{/* Phone & National ID */}
				<Grid item xs={12} md={6}>
					<RHFPhone name="phone" label="Số điện thoại" placeholder="0123456789" fullWidth />
				</Grid>

				<Grid item xs={12} md={6}>
					<RHFNationalID name="nationalId" label="CMND/CCCD" fullWidth />
				</Grid>

				{/* Money Input */}
				<Grid item xs={12} md={6}>
					<RHFMoney name="salary" label="Lương" currency="VND" fullWidth />
				</Grid>

				{/* Date Picker */}
				<Grid item xs={12} md={6}>
					<RHFDatePicker name="birthDate" label="Ngày sinh" maxDate={new Date()} fullWidth />
				</Grid>

				{/* Select Dropdown */}
				<Grid item xs={12} md={6}>
					<RHFSelect name="role" label="Vai trò" options={roleOptions} fullWidth />
				</Grid>

				{/* Autocomplete Single */}
				<Grid item xs={12} md={6}>
					<RHFAutocomplete name="department" label="Phòng ban" options={departmentOptions} fullWidth />
				</Grid>

				{/* Autocomplete Multiple */}
				<Grid item xs={12}>
					<RHFAutocompleteMulti name="skills" label="Kỹ năng" options={skillOptions} fullWidth />
				</Grid>

				{/* Switch */}
				<Grid item xs={12}>
					<RHFSwitch name="isActive" label="Trạng thái hoạt động" />
				</Grid>

				{/* Advanced Text Field */}
				<Grid item xs={12}>
					<RHFTextFieldAdvanced name="description" label="Mô tả" multiline rows={4} placeholder="Nhập mô tả về người dùng..." fullWidth />
				</Grid>

				{/* Form Actions */}
				<Grid item xs={12}>
					<Box display="flex" gap={2} justifyContent="flex-end">
						<Button variant="outlined" onClick={() => methods.reset()}>
							Hủy
						</Button>
						<Button variant="contained" type="submit">
							Lưu
						</Button>
					</Box>
				</Grid>
			</Grid>
		</FormProvider>
	);
}
```

### Input Components (Không cần Form Provider)

Components có prefix `N` là các input component độc lập, **không** cần React Hook Form:

| Component              | Mô tả                  | Use Case                          |
| ---------------------- | ---------------------- | --------------------------------- |
| **NTextField**         | Text input cơ bản      | Khi không cần validation phức tạp |
| **NSelect**            | Select dropdown cơ bản | Simple dropdown                   |
| **NAutocomplete**      | Autocomplete single    | Simple autocomplete               |
| **NAutocompleteMulti** | Autocomplete multiple  | Tag selection                     |
| **NTextFieldSelect**   | Text field + dropdown  | Combined input                    |
| **NDatePicker**        | Date picker cơ bản     | Simple date selection             |

#### Ví dụ sử dụng Input Components

```tsx
import { useState } from 'react';

import { NAutocomplete, NAutocompleteMulti, NDatePicker, NSelect, NTextField, NTextFieldSelect } from '@libeyondea/base-cms';
import { Box, Button, Grid, Typography } from '@mui/material';

const countryOptions = [
	{ id: 1, name: 'Việt Nam' },
	{ id: 2, name: 'Thái Lan' },
	{ id: 3, name: 'Singapore' }
];

const tagOptions = [
	{ id: 1, name: 'Frontend' },
	{ id: 2, name: 'Backend' },
	{ id: 3, name: 'Mobile' },
	{ id: 4, name: 'DevOps' }
];

function SearchForm() {
	const [searchData, setSearchData] = useState({
		keyword: '',
		country: null,
		tags: [],
		category: '',
		dateRange: null
	});

	const handleSearch = () => {
		console.log('Search data:', searchData);
		// Handle search logic
	};

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h6" gutterBottom>
				Tìm kiếm nâng cao
			</Typography>

			<Grid container spacing={3}>
				{/* Basic Text Field */}
				<Grid item xs={12} md={6}>
					<NTextField
						label="Từ khóa"
						placeholder="Nhập từ khóa tìm kiếm..."
						value={searchData.keyword}
						onChange={(e) => setSearchData((prev) => ({ ...prev, keyword: e.target.value }))}
						fullWidth
					/>
				</Grid>

				{/* Select Dropdown */}
				<Grid item xs={12} md={6}>
					<NSelect
						label="Quốc gia"
						options={countryOptions}
						value={searchData.country}
						onChange={(value) => setSearchData((prev) => ({ ...prev, country: value }))}
						fullWidth
					/>
				</Grid>

				{/* Autocomplete Single */}
				<Grid item xs={12} md={6}>
					<NAutocomplete
						label="Danh mục"
						options={[
							{ id: 1, name: 'Công nghệ' },
							{ id: 2, name: 'Kinh doanh' },
							{ id: 3, name: 'Giáo dục' }
						]}
						value={searchData.category}
						onChange={(value) => setSearchData((prev) => ({ ...prev, category: value }))}
						fullWidth
					/>
				</Grid>

				{/* Autocomplete Multiple */}
				<Grid item xs={12} md={6}>
					<NAutocompleteMulti
						label="Tags"
						options={tagOptions}
						value={searchData.tags}
						onChange={(value) => setSearchData((prev) => ({ ...prev, tags: value }))}
						fullWidth
					/>
				</Grid>

				{/* Date Picker */}
				<Grid item xs={12} md={6}>
					<NDatePicker
						label="Ngày tạo"
						value={searchData.dateRange}
						onChange={(value) => setSearchData((prev) => ({ ...prev, dateRange: value }))}
						fullWidth
					/>
				</Grid>

				{/* Text Field Select */}
				<Grid item xs={12} md={6}>
					<NTextFieldSelect
						label="Loại tài liệu"
						options={[
							{ id: 1, name: 'PDF' },
							{ id: 2, name: 'Word' },
							{ id: 3, name: 'Excel' }
						]}
						value={searchData.category}
						onChange={(value) => setSearchData((prev) => ({ ...prev, category: value }))}
						fullWidth
					/>
				</Grid>

				{/* Search Button */}
				<Grid item xs={12}>
					<Box display="flex" gap={2} justifyContent="flex-end">
						<Button
							variant="outlined"
							onClick={() =>
								setSearchData({
									keyword: '',
									country: null,
									tags: [],
									category: '',
									dateRange: null
								})
							}
						>
							Xóa bộ lọc
						</Button>
						<Button variant="contained" onClick={handleSearch}>
							Tìm kiếm
						</Button>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
```

### Table Components

Hệ thống table mạnh mẽ dựa trên TanStack Table v8:

| Component               | Mô tả                                   |
| ----------------------- | --------------------------------------- |
| **StanstackTable**      | Table component chính với full features |
| **SubTable**            | Nested table cho hierarchical data      |
| **TableToolbar**        | Toolbar với search, filters, actions    |
| **TableSkeletonRow**    | Loading skeleton cho table              |
| **DefaultColumnFilter** | Default filter component                |
| **EmptyView**           | Empty state view                        |
| **Row**                 | Custom row component                    |

#### Table Props chính

```tsx
interface StanstackTableProps {
	data: any[]; // Dữ liệu table
	columns: ColumnDef<any>[]; // Column definitions
	enablePagination?: boolean; // Bật pagination
	enableSorting?: boolean; // Bật sorting
	enableFiltering?: boolean; // Bật filtering
	enableRowSelection?: boolean; // Bật row selection
	pageSize?: number; // Số rows mỗi page
	onRowClick?: (row: any) => void; // Click handler
}
```

#### Ví dụ Table

```tsx
import { StanstackTable, StatusChip } from '@libeyondea/base-cms';

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
		cell: ({ getValue }) => <StatusChip status={getValue() === 1 ? 'active' : 'inactive'} label={getValue() === 1 ? 'Hoạt động' : 'Không hoạt động'} />
	}
];

const data = [
	{ id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', status: 1 },
	{ id: 2, name: 'Trần Thị B', email: 'b@example.com', status: 0 }
];

function UserTable() {
	return (
		<StanstackTable
			data={data}
			columns={columns}
			enablePagination
			enableSorting
			enableFiltering
			pageSize={10}
			onRowClick={(row) => console.log('Clicked:', row)}
		/>
	);
}
```

### UI Components

| Component           | Mô tả                      | Use Case               |
| ------------------- | -------------------------- | ---------------------- |
| **Avatar**          | Avatar component với modal | User profile display   |
| **Breadcrumbs**     | Breadcrumb navigation      | Page hierarchy         |
| **DateRangePicker** | Date range selector        | Filter by date range   |
| **LoadingScreen**   | Full-screen loader         | Loading states         |
| **MenuPopup**       | Popup menu                 | Actions menu           |
| **Modal**           | Modal component            | Dialogs, confirmations |
| **SoundButton**     | Button với sound effect    | Interactive buttons    |
| **StatusChip**      | Status badge               | Display status         |
| **Tab**             | Tab component              | Tabbed interfaces      |
| **Toastify**        | Toast notifications        | Success/error messages |
| **TruncatedText**   | Text với tooltip           | Long text handling     |
| **ScheduleDisplay** | Schedule display           | Calendar/time display  |
| **ItemList**        | List component             | Display item lists     |

#### Ví dụ sử dụng UI Components

````tsx
import { Avatar, Breadcrumbs, DateRangePicker, LoadingScreen, MenuPopup, Modal, SoundButton, StatusChip, Tab, Toastify, TruncatedText } from '@libeyondea/base-cms';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { useState } from 'react';

function UIComponentsDemo() {
	const [modalOpen, setModalOpen] = useState(false);
	const [loading, setLoading] = useState(false);
	const [dateRange, setDateRange] = useState(null);
	const [activeTab, setActiveTab] = useState(0);

	const handleAction = (action: string) => {
		console.log('Action:', action);
	};

	const showToast = () => {
		Toastify.success('Thành công!');
	};

	const tabItems = [
		{ label: 'Thông tin', value: 0 },
		{ label: 'Cài đặt', value: 1 },
		{ label: 'Lịch sử', value: 2 }
	];

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant="h4" gutterBottom>
				UI Components Demo
			</Typography>

			<Grid container spacing={3}>
				{/* Avatar */}
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>Avatar</Typography>
					<Avatar
						src="/avatar.jpg"
						alt="User Avatar"
						size={80}
						onClick={() => console.log('Avatar clicked')}
					/>
				</Grid>

				{/* Status Chip */}
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>Status Chips</Typography>
					<Box display="flex" gap={1} flexWrap="wrap">
						<StatusChip status="active" label="Hoạt động" />
						<StatusChip status="inactive" label="Không hoạt động" />
						<StatusChip status="pending" label="Chờ duyệt" />
					</Box>
				</Grid>

				{/* Sound Button */}
				<Grid item xs={12} md={4}>
					<Typography variant="h6" gutterBottom>Sound Button</Typography>
					<SoundButton
						variant="contained"
						soundUrl="/sounds/click.mp3"
						onClick={() => console.log('Button clicked')}
					>
						Click me!
					</SoundButton>
				</Grid>

				{/* Date Range Picker */}
				<Grid item xs={12} md={6}>
					<Typography variant="h6" gutterBottom>Date Range Picker</Typography>
					<DateRangePicker
						value={dateRange}
						onChange={setDateRange}
						placeholder="Chọn khoảng thời gian"
					/>
				</Grid>

				{/* Menu Popup */}
				<Grid item xs={12} md={6}>
					<Typography variant="h6" gutterBottom>Menu Popup</Typography>
					<MenuPopup
						options={[
							{
								label: 'Xem',
								icon: '👁️',
								onClick: () => handleAction('view')
							},
							{
								label: 'Sửa',
								icon: '✏️',
								onClick: () => handleAction('edit')
							},
							{
								label: 'Xóa',
								icon: '🗑️',
								onClick: () => handleAction('delete'),
								color: 'error'
							}
						]}
					>
						<Button variant="outlined">Actions</Button>
					</MenuPopup>
				</Grid>

				{/* Truncated Text */}
				<Grid item xs={12} md={6}>
					<Typography variant="h6" gutterBottom>Truncated Text</Typography>
					<TruncatedText
						text="Đây là một đoạn text rất dài sẽ được cắt ngắn và hiển thị tooltip khi hover"
						maxLength={50}
					/>
				</Grid>

				{/* Tab Component */}
				<Grid item xs={12} md={6}>
					<Typography variant="h6" gutterBottom>Tabs</Typography>
					<Tab
						items={tabItems}
						value={activeTab}
						onChange={setActiveTab}
					/>
					<Box sx={{ mt: 2 }}>
						{activeTab === 0 && <Typography>Nội dung tab 1</Typography>}
						{activeTab === 1 && <Typography>Nội dung tab 2</Typography>}
						{activeTab === 2 && <Typography>Nội dung tab 3</Typography>}
					</Box>
				</Grid>

				{/* Modal */}
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>Modal</Typography>
					<Button variant="contained" onClick={() => setModalOpen(true)}>
						Mở Modal
					</Button>
					<Modal
						open={modalOpen}
						onClose={() => setModalOpen(false)}
						title="Modal Demo"
						content="Đây là nội dung của modal"
						actions={[
							{
								label: 'Hủy',
								variant: 'outlined',
								onClick: () => setModalOpen(false)
							},
							{
								label: 'Xác nhận',
								variant: 'contained',
								onClick: () => {
									setModalOpen(false);
									showToast();
								}
							}
						]}
					/>
				</Grid>

				{/* Loading Screen */}
				<Grid item xs={12}>
					<Typography variant="h6" gutterBottom>Loading Screen</Typography>
					<Button
						variant="contained"
						onClick={() => {
							setLoading(true);
							setTimeout(() => setLoading(false), 3000);
						}}
					>
						Show Loading
					</Button>
					<LoadingScreen open={loading} />
				</Grid>
			</Grid>
		</Box>
	);
}

### Layout Components

| Component         | Mô tả                                           |
| ----------------- | ----------------------------------------------- |
| **Header**        | Top navigation header với profile, theme toggle |
| **Sidebar**       | Side navigation menu với submenu support        |
| **PageContainer** | Main page wrapper với breadcrumbs               |
| **MainCard**      | Card container với search, actions              |
| **Drawer**        | Drawer component cho mobile menu                |

#### Ví dụ sử dụng Layout Components

```tsx
import { Drawer, Header, MainCard, PageContainer, Sidebar } from '@libeyondea/base-cms';
import { Box, CssBaseline, Typography } from '@mui/material';
import { useState } from 'react';

const sidebarItems = [
	{
		id: 'dashboard',
		title: 'Dashboard',
		icon: '🏠',
		path: '/dashboard'
	},
	{
		id: 'users',
		title: 'Người dùng',
		icon: '👥',
		path: '/users',
		children: [
			{ id: 'user-list', title: 'Danh sách', path: '/users/list' },
			{ id: 'user-roles', title: 'Vai trò', path: '/users/roles' }
		]
	},
	{
		id: 'products',
		title: 'Sản phẩm',
		icon: '📦',
		path: '/products'
	},
	{
		id: 'settings',
		title: 'Cài đặt',
		icon: '⚙️',
		path: '/settings'
	}
];

function DashboardLayout() {
	const [drawerOpen, setDrawerOpen] = useState(false);

	return (
		<Box sx={{ display: 'flex' }}>
			<CssBaseline />

			{/* Header */}
			<Header
				title="CMS Dashboard"
				onMenuClick={() => setDrawerOpen(!drawerOpen)}
				userProfile={{
					name: 'Nguyễn Văn A',
					email: 'admin@example.com',
					avatar: '/avatar.jpg'
				}}
				onLogout={() => console.log('Logout')}
			/>

			{/* Sidebar */}
			<Sidebar
				open={drawerOpen}
				onClose={() => setDrawerOpen(false)}
				items={sidebarItems}
				logo="/logo.png"
				logoText="Base CMS"
			/>

			{/* Main Content */}
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<PageContainer
					title="Dashboard"
					breadcrumbs={[
						{ label: 'Trang chủ', href: '/' },
						{ label: 'Dashboard', href: '/dashboard' }
					]}
				>
					<MainCard
						title="Thống kê tổng quan"
						searchProps={{
							placeholder: 'Tìm kiếm...',
							onSearch: (value) => console.log('Search:', value)
						}}
						actions={[
							{
								label: 'Xuất Excel',
								onClick: () => console.log('Export Excel')
							},
							{
								label: 'Thêm mới',
								variant: 'contained',
								onClick: () => console.log('Add new')
							}
						]}
					>
						<Typography variant="body1">
							Nội dung dashboard sẽ được hiển thị ở đây...
						</Typography>
					</MainCard>

					{/* Mobile Drawer */}
					<Drawer
						open={drawerOpen}
						onClose={() => setDrawerOpen(false)}
						anchor="left"
					>
						<Box sx={{ width: 250, p: 2 }}>
							<Typography variant="h6" gutterBottom>
								Menu
							</Typography>
							{/* Drawer content */}
						</Box>
					</Drawer>
				</PageContainer>
			</Box>
		</Box>
	);
}
````

## 🛣️ Routing System

Library cung cấp hệ thống routing mạnh mẽ với guards và layouts tự động:

### Routes Component

```tsx
import { lazy } from 'react';

import { Routes, RoutesConfig } from '@libeyondea/base-cms';

const myRoutes: RoutesConfig = {
	// Auth routes - tự động có AuthGuard
	auth: [
		{
			path: 'login',
			element: lazy(() => import('./pages/Login'))
		},
		{
			path: 'signup',
			element: lazy(() => import('./pages/Signup'))
		}
	],

	// Private routes - tự động có PrivateGuard
	private: [
		{
			index: true,
			element: lazy(() => import('./pages/Dashboard'))
		},
		{
			path: 'users',
			element: lazy(() => import('./pages/Users'))
		},
		{
			path: 'settings',
			element: lazy(() => import('./pages/Settings'))
		}
	],

	// Public routes - không có guard
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

	// Custom route groups
	groups: [
		{
			prefix: '/admin',
			guard: 'admin', // Custom guard
			routes: [
				{
					path: 'users',
					element: lazy(() => import('./pages/admin/Users'))
				}
			]
		}
	],

	// Custom 404 page
	notFound: lazy(() => import('./pages/NotFound')),

	// Custom error page
	error: lazy(() => import('./pages/Error'))
};

function App() {
	return <Routes config={myRoutes} basename="/app" profileAPI="/api/profile" redirectPrivateTo="/auth/login" redirectAuthTo="/dashboard" />;
}
```

### Routes Props

| Prop                | Type           | Mô tả                                                 |
| ------------------- | -------------- | ----------------------------------------------------- |
| `config`            | `RoutesConfig` | Cấu hình routes (bắt buộc)                            |
| `basename`          | `string`       | Base path cho router                                  |
| `profileAPI`        | `string`       | API endpoint để check authentication                  |
| `redirectPrivateTo` | `string`       | Redirect path khi chưa đăng nhập (default: '/signin') |
| `redirectAuthTo`    | `string`       | Redirect path khi đã đăng nhập (default: '/')         |

### Route Guards

- **AuthGuard**: Redirect về private routes nếu đã đăng nhập
- **PrivateGuard**: Redirect về auth routes nếu chưa đăng nhập
- **Custom Guards**: Có thể tạo custom guards cho specific routes

## 🎣 Hooks

### useTheme

Hook để truy cập và điều khiển theme:

```tsx
import { useTheme } from '@libeyondea/base-cms';

function ThemeToggler() {
	const { mode, toggleTheme, setThemeMode } = useTheme();

	return (
		<div>
			<p>Current mode: {mode}</p>
			<button onClick={toggleTheme}>Toggle Theme</button>
			<button onClick={() => setThemeMode('dark')}>Set Dark</button>
			<button onClick={() => setThemeMode('light')}>Set Light</button>
		</div>
	);
}
```

**API:**

- `theme` - Current theme object (Material-UI Theme)
- `mode` - Current mode: `'light' | 'dark'`
- `toggleTheme()` - Toggle between light/dark
- `setThemeMode(mode)` - Set specific mode

### useSidebar

Hook để điều khiển sidebar:

```tsx
import { useSidebar } from '@libeyondea/base-cms';

function SidebarToggle() {
	const { drawerOpen, toggleDrawer, setDrawerOpen } = useSidebar();

	return (
		<div>
			<button onClick={toggleDrawer}>Toggle Sidebar</button>
			<button onClick={() => setDrawerOpen(true)}>Open Sidebar</button>
			<button onClick={() => setDrawerOpen(false)}>Close Sidebar</button>
		</div>
	);
}
```

**API:**

- `drawerOpen` - Boolean state của drawer
- `toggleDrawer()` - Toggle drawer open/close
- `setDrawerOpen(open)` - Set drawer state

### useTableContext

Hook để quản lý table filters:

```tsx
import { useTableContext } from '@libeyondea/base-cms';

function TableFilter() {
	const { filters, setFilterTable } = useTableContext();

	const handleFilter = () => {
		setFilterTable({
			type: 'users',
			value: { status: 1, role: 'admin' }
		});
	};

	return <button onClick={handleFilter}>Apply Filter</button>;
}
```

**API:**

- `filters` - Object chứa tất cả filters theo type
- `setFilterTable({ type, value })` - Set filter cho một table type

### useStateValue

Hook để truy cập Redux state (deprecated, dùng React Redux hooks thay thế):

```tsx
import { useStateValue } from '@libeyondea/base-cms';

function UserProfile() {
	const { state, dispatch } = useStateValue();

	return <div>User: {state.user?.name}</div>;
}
```

### useAudioPlayer

Hook để play audio:

```tsx
import { useAudioPlayer } from '@libeyondea/base-cms';

function SoundPlayer() {
	const { play, pause, stop, isPlaying } = useAudioPlayer('/sounds/click.mp3');

	return (
		<div>
			<button onClick={play}>Play</button>
			<button onClick={pause}>Pause</button>
			<button onClick={stop}>Stop</button>
			<p>Status: {isPlaying ? 'Playing' : 'Stopped'}</p>
		</div>
	);
}
```

**API:**

- `play()` - Play audio
- `pause()` - Pause audio
- `stop()` - Stop và reset audio
- `isPlaying` - Boolean playing state

### useSweetAlert

Hook để hiển thị SweetAlert2 dialogs:

```tsx
import { useSweetAlert } from '@libeyondea/base-cms';

function DeleteButton() {
	const { showConfirm, showSuccess, showError } = useSweetAlert();

	const handleDelete = async () => {
		const result = await showConfirm({
			title: 'Xác nhận xóa',
			text: 'Bạn có chắc muốn xóa?'
		});

		if (result.isConfirmed) {
			// Delete logic
			showSuccess('Đã xóa thành công!');
		}
	};

	return <button onClick={handleDelete}>Delete</button>;
}
```

**API:**

- `showConfirm(options)` - Show confirmation dialog
- `showSuccess(message)` - Show success message
- `showError(message)` - Show error message
- `showWarning(message)` - Show warning message
- `showInfo(message)` - Show info message

## 🛠️ Services

### BaseService

Abstract class cung cấp các phương thức CRUD chuẩn:

```tsx
import { BaseService } from '@libeyondea/base-cms';

// Tạo service cho User
class UserService extends BaseService {
	constructor() {
		super('/users'); // API endpoint prefix
	}

	// Custom methods
	async getUserProfile(userId: string) {
		return this.getById(userId, {}, '/profile');
	}

	async updateUserRole(userId: string, role: string) {
		return this.update(userId, { role }, '/role');
	}
}

const userService = new UserService();

// Sử dụng
async function loadUsers() {
	// GET /users?page=1&limit=10
	const response = await userService.getAll({ page: 1, limit: 10 });
	console.log(response.data);

	// GET /users/123
	const user = await userService.getById('123');

	// POST /users
	const newUser = await userService.create({ name: 'John', email: 'john@example.com' });

	// PUT /users/123
	const updated = await userService.update('123', { name: 'Jane' });

	// DELETE /users/123
	await userService.delete('123');
}
```

#### BaseService API

| Method              | Signature                                              | Mô tả                                    |
| ------------------- | ------------------------------------------------------ | ---------------------------------------- |
| `getAll`            | `getAll<T>(params?, path?, config?, options?)`         | GET danh sách với filtering & pagination |
| `getById`           | `getById<T>(id, params?, path?, config?, options?)`    | GET theo ID                              |
| `create`            | `create<T>(data, path?, config?, options?)`            | POST tạo mới                             |
| `update`            | `update<T>(id, data, path?, config?, options?)`        | PUT cập nhật                             |
| `delete`            | `delete(id, path?, config?, options?)`                 | DELETE xóa                               |
| `deleteWithPayload` | `deleteWithPayload(payload, path?, config?, options?)` | DELETE với body                          |
| `uploadFile`        | `uploadFile<T>(endpoint, file, config?, options?)`     | POST upload file                         |

#### ServiceOptions

```tsx
interface ServiceOptions {
	isOtherUrl?: boolean; // Sử dụng URL khác (không prefix apiName)
	isFormData?: boolean; // Request là FormData
	timeout?: number; // Timeout (ms), default: 30000
}
```

#### Ví dụ Upload File

```tsx
class FileService extends BaseService {
	constructor() {
		super('/files');
	}

	async uploadAvatar(file: File) {
		return this.uploadFile('/upload/avatar', file);
	}

	async uploadMultiple(files: File[]) {
		const formData = new FormData();
		files.forEach((file, index) => {
			formData.append(`file${index}`, file);
		});
		return this.uploadFile('/upload/multiple', formData);
	}
}
```

## 🧰 Utilities

### Axios Instance

Pre-configured axios instance:

```tsx
import { axiosServices } from '@libeyondea/base-cms';

// Đã có sẵn interceptors cho auth, error handling
const response = await axiosServices.get('/api/users');
```

### Color Utilities

```tsx
import { generateColorPalette, getContrastColor, hexToRgb } from '@libeyondea/base-cms';

// Generate color palette
const palette = generateColorPalette('#1976d2');
// Returns: { 50: '#...', 100: '#...', ..., 900: '#...' }

// Get contrast color (black or white)
const contrast = getContrastColor('#1976d2');
// Returns: '#ffffff' hoặc '#000000'

// Convert hex to RGB
const rgb = hexToRgb('#1976d2');
// Returns: { r: 25, g: 118, b: 210 }
```

### Time Utilities

```tsx
import { formatDate, formatDateTime, formatRelativeTime, formatTime, isToday, isYesterday } from '@libeyondea/base-cms';

const now = new Date();

formatDate(now); // "04/10/2025"
formatDateTime(now); // "04/10/2025 14:30"
formatTime(now); // "14:30"
formatRelativeTime(now); // "vừa xong", "5 phút trước", etc.

isToday(now); // true/false
isYesterday(now); // true/false
```

### Format Utilities

```tsx
import { formatCurrency, formatFileSize, formatNumber, formatPhone } from '@libeyondea/base-cms';

formatCurrency(1000000); // "1,000,000 VND"
formatNumber(1234.56); // "1,234.56"
formatPhone('0123456789'); // "0123 456 789"
formatFileSize(1024); // "1 KB"
formatFileSize(1048576); // "1 MB"
```

### Cookie Utilities

```tsx
import { getCookie, removeCookie, setCookie } from '@libeyondea/base-cms';

// Set cookie (expires in 7 days)
setCookie('token', 'abc123', 7);

// Get cookie
const token = getCookie('token');

// Remove cookie
removeCookie('token');

// Set cookie with options
setCookie('user', JSON.stringify({ id: 1 }), 7, {
	secure: true,
	sameSite: 'strict'
});
```

### Constants

```tsx
import { MONTHS, REQUIRED_MESSAGE, STATUS_CONSTANT, USER_CONSTANT, WEEK_DAYS } from '@libeyondea/base-cms';

// Validation messages
console.log(REQUIRED_MESSAGE); // "Trường này là bắt buộc"

// Status options
console.log(STATUS_CONSTANT);
// [{ id: 0, name: 'Không hoạt động' }, { id: 1, name: 'Hoạt động' }]

// User role options
console.log(USER_CONSTANT);
// [{ id: 0, name: 'Quản trị viên' }, { id: 1, name: 'Người dùng' }]

// Week days
console.log(WEEK_DAYS);
// [{ id: '0', name: 'CN' }, { id: '1', name: 'T2' }, ...]

// Months
console.log(MONTHS);
// [{ id: '0', name: 'Tháng 1' }, { id: '1', name: 'Tháng 2' }, ...]
```

### Array & Character Formatters

```tsx
import { capitalizeFirstLetter, groupBy, slugify, sortBy, truncate, uniqueArray } from '@libeyondea/base-cms';

// Unique array
uniqueArray([1, 2, 2, 3]); // [1, 2, 3]

// Group by property
const users = [
	{ id: 1, role: 'admin' },
	{ id: 2, role: 'user' },
	{ id: 3, role: 'admin' }
];
groupBy(users, 'role');
// { admin: [{...}, {...}], user: [{...}] }

// Sort by property
sortBy(users, 'id', 'desc');

// Capitalize
capitalizeFirstLetter('hello'); // "Hello"

// Slugify
slugify('Xin chào Việt Nam'); // "xin-chao-viet-nam"

// Truncate
truncate('Long text...', 10); // "Long text..."
```

## 🎨 Theme System

### Sử dụng Theme Provider

```tsx
import { AppProvider } from '@libeyondea/base-cms';

function App() {
	return (
		<AppProvider>
			{/* Theme tự động: light/dark dựa trên system preference */}
			{/* Theme được persist vào localStorage */}
		</AppProvider>
	);
}
```

### Custom Theme

```tsx
import { AppProvider } from '@libeyondea/base-cms';
import { PaletteMode } from '@mui/material';

const customTheme = (mode: PaletteMode) => ({
	palette: {
		mode,
		primary: {
			main: '#00acc1', // Cyan
			light: '#5ddef4',
			dark: '#007c91',
			contrastText: '#fff'
		},
		secondary: {
			main: '#f50057', // Pink
			light: '#ff5983',
			dark: '#bb002f',
			contrastText: '#fff'
		},
		background: {
			default: mode === 'light' ? '#f5f5f5' : '#121212',
			paper: mode === 'light' ? '#ffffff' : '#1e1e1e'
		}
	},
	typography: {
		fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
		h1: { fontSize: '2.5rem', fontWeight: 700 },
		h2: { fontSize: '2rem', fontWeight: 600 },
		button: { textTransform: 'none' }
	},
	shape: {
		borderRadius: 12
	},
	shadows: [
		'none',
		'0px 2px 4px rgba(0,0,0,0.1)'
		// ... more shadows
	],
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: 8,
					padding: '8px 16px'
				}
			}
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 12,
					boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
				}
			}
		}
	}
});

function App() {
	return <AppProvider customTheme={customTheme}>{/* Your app */}</AppProvider>;
}
```

### Theme Hook

```tsx
import { useTheme } from '@libeyondea/base-cms';
import { Box } from '@mui/material';

function ThemedComponent() {
	const { theme, mode, toggleTheme } = useTheme();

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.background.paper,
				color: theme.palette.text.primary,
				padding: theme.spacing(2),
				borderRadius: theme.shape.borderRadius
			}}
		>
			<p>Current mode: {mode}</p>
			<button onClick={toggleTheme}>Toggle Theme</button>
		</Box>
	);
}
```

## 📚 Ví dụ chi tiết

### Ví dụ 1: Form đăng ký phức tạp

```tsx
import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, MainCard, RHFDatePicker, RHFNationalID, RHFPhone, RHFSelect, RHFSwitch, RHFTextField } from '@libeyondea/base-cms';
import { Box, Button, Grid } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

// Schema validation
const schema = yup.object({
	fullName: yup.string().required('Họ tên là bắt buộc'),
	email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	phone: yup.string().required('Số điện thoại là bắt buộc'),
	nationalId: yup.string().required('CMND/CCCD là bắt buộc'),
	birthDate: yup.date().required('Ngày sinh là bắt buộc').nullable(),
	gender: yup.number().required('Giới tính là bắt buộc'),
	address: yup.string().required('Địa chỉ là bắt buộc'),
	agreeTerms: yup.boolean().oneOf([true], 'Bạn phải đồng ý với điều khoản')
});

const genderOptions = [
	{ id: 1, name: 'Nam' },
	{ id: 2, name: 'Nữ' },
	{ id: 3, name: 'Khác' }
];

function RegisterForm() {
	const methods = useForm({
		resolver: yupResolver(schema),
		defaultValues: {
			fullName: '',
			email: '',
			phone: '',
			nationalId: '',
			birthDate: null,
			gender: 1,
			address: '',
			agreeTerms: false
		}
	});

	const onSubmit = async (data: any) => {
		try {
			console.log('Form data:', data);
			// Call API to register
			// await userService.create(data);
			alert('Đăng ký thành công!');
		} catch (error) {
			console.error('Registration failed:', error);
		}
	};

	return (
		<MainCard title="Đăng ký tài khoản">
			<FormProvider methods={methods} onSubmit={onSubmit}>
				<Grid container spacing={3}>
					<Grid item xs={12} md={6}>
						<RHFTextField name="fullName" label="Họ và tên" fullWidth />
					</Grid>

					<Grid item xs={12} md={6}>
						<RHFTextField name="email" label="Email" type="email" fullWidth />
					</Grid>

					<Grid item xs={12} md={6}>
						<RHFPhone name="phone" label="Số điện thoại" fullWidth />
					</Grid>

					<Grid item xs={12} md={6}>
						<RHFNationalID name="nationalId" label="CMND/CCCD" fullWidth />
					</Grid>

					<Grid item xs={12} md={6}>
						<RHFDatePicker name="birthDate" label="Ngày sinh" fullWidth />
					</Grid>

					<Grid item xs={12} md={6}>
						<RHFSelect name="gender" label="Giới tính" options={genderOptions} fullWidth />
					</Grid>

					<Grid item xs={12}>
						<RHFTextField name="address" label="Địa chỉ" multiline rows={3} fullWidth />
					</Grid>

					<Grid item xs={12}>
						<RHFSwitch name="agreeTerms" label="Tôi đồng ý với điều khoản sử dụng" />
					</Grid>

					<Grid item xs={12}>
						<Box display="flex" gap={2} justifyContent="flex-end">
							<Button variant="outlined" onClick={() => methods.reset()}>
								Hủy
							</Button>
							<Button variant="contained" type="submit">
								Đăng ký
							</Button>
						</Box>
					</Grid>
				</Grid>
			</FormProvider>
		</MainCard>
	);
}

export default RegisterForm;
```

### Ví dụ 2: Table với API Integration

```tsx
import React, { useState } from 'react';

import { MainCard, MenuPopup, StanstackTable, StatusChip } from '@libeyondea/base-cms';
import { IconButton } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FiEdit, FiEye, FiTrash2 } from 'react-icons/fi';

// Service
class UserService extends BaseService {
	constructor() {
		super('/users');
	}
}

const userService = new UserService();

function UserManagement() {
	const queryClient = useQueryClient();
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);

	// Fetch users
	const { data, isLoading, error } = useQuery({
		queryKey: ['users', page, limit],
		queryFn: () => userService.getAll({ page, limit })
	});

	// Delete mutation
	const deleteMutation = useMutation({
		mutationFn: (id: string) => userService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] });
			alert('Xóa thành công!');
		},
		onError: (error) => {
			console.error('Delete failed:', error);
			alert('Xóa thất bại!');
		}
	});

	// Table columns
	const columns = [
		{
			accessorKey: 'id',
			header: 'ID',
			size: 80
		},
		{
			accessorKey: 'avatar',
			header: 'Avatar',
			cell: ({ getValue }) => <img src={getValue()} alt="avatar" style={{ width: 40, height: 40, borderRadius: '50%' }} />
		},
		{
			accessorKey: 'name',
			header: 'Họ và tên'
		},
		{
			accessorKey: 'email',
			header: 'Email'
		},
		{
			accessorKey: 'phone',
			header: 'Số điện thoại'
		},
		{
			accessorKey: 'role',
			header: 'Vai trò',
			cell: ({ getValue }) => <span>{getValue() === 1 ? 'Admin' : 'User'}</span>
		},
		{
			accessorKey: 'status',
			header: 'Trạng thái',
			cell: ({ getValue }) => <StatusChip status={getValue() === 1 ? 'active' : 'inactive'} label={getValue() === 1 ? 'Hoạt động' : 'Không hoạt động'} />
		},
		{
			accessorKey: 'createdAt',
			header: 'Ngày tạo',
			cell: ({ getValue }) => formatDateTime(getValue())
		},
		{
			id: 'actions',
			header: 'Thao tác',
			cell: ({ row }) => (
				<MenuPopup
					options={[
						{
							label: 'Xem',
							icon: <FiEye />,
							onClick: () => console.log('View', row.original.id)
						},
						{
							label: 'Sửa',
							icon: <FiEdit />,
							onClick: () => console.log('Edit', row.original.id)
						},
						{
							label: 'Xóa',
							icon: <FiTrash2 />,
							onClick: () => {
								if (confirm('Bạn có chắc muốn xóa?')) {
									deleteMutation.mutate(row.original.id);
								}
							},
							color: 'error'
						}
					]}
				/>
			)
		}
	];

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	return (
		<MainCard title="Quản lý người dùng">
			<StanstackTable
				data={data?.data || []}
				columns={columns}
				enablePagination
				enableSorting
				enableFiltering
				enableRowSelection
				pageSize={limit}
				isLoading={isLoading}
				onPageChange={(newPage) => setPage(newPage)}
				onPageSizeChange={(newLimit) => setLimit(newLimit)}
				onRowClick={(row) => console.log('Row clicked:', row)}
			/>
		</MainCard>
	);
}

export default UserManagement;
```

### Ví dụ 3: Complete CMS với Custom Routes

```tsx
import React from 'react';
import { lazy } from 'react';

import { AppProvider, Routes, RoutesConfig } from '@libeyondea/base-cms';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';

import { store } from './store';

// Lazy load pages
const Login = lazy(() => import('./pages/auth/Login'));
const Signup = lazy(() => import('./pages/auth/Signup'));
const Dashboard = lazy(() => import('./pages/private/Dashboard'));
const Users = lazy(() => import('./pages/private/Users'));
const Settings = lazy(() => import('./pages/private/Settings'));
const About = lazy(() => import('./pages/public/About'));
const Contact = lazy(() => import('./pages/public/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: 1,
			refetchOnWindowFocus: false
		}
	}
});

// Routes configuration
const routesConfig: RoutesConfig = {
	auth: [
		{
			path: 'login',
			element: Login
		},
		{
			path: 'signup',
			element: Signup
		}
	],
	private: [
		{
			index: true,
			element: Dashboard
		},
		{
			path: 'users',
			element: Users
		},
		{
			path: 'settings',
			element: Settings
		}
	],
	public: [
		{
			path: 'about',
			element: About
		},
		{
			path: 'contact',
			element: Contact
		}
	],
	notFound: NotFound
};

function App() {
	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<AppProvider>
					<Routes config={routesConfig} profileAPI="/api/profile" redirectPrivateTo="/auth/login" redirectAuthTo="/dashboard" />
				</AppProvider>
			</QueryClientProvider>
		</Provider>
	);
}

export default App;
```

## 📘 API Reference

### AppProvider Props

```tsx
interface AppProviderProps {
	children: ReactNode;
	customTheme?: (mode: PaletteMode) => any;
}
```

### FormProvider Props

```tsx
interface FormProviderProps {
	children: ReactNode;
	methods: UseFormReturn<any>;
	onSubmit: (data: any) => void | Promise<void>;
}
```

### StanstackTable Props

```tsx
interface StanstackTableProps {
	data: any[];
	columns: ColumnDef<any>[];
	enablePagination?: boolean;
	enableSorting?: boolean;
	enableFiltering?: boolean;
	enableRowSelection?: boolean;
	enableColumnVisibility?: boolean;
	pageSize?: number;
	isLoading?: boolean;
	onRowClick?: (row: any) => void;
	onPageChange?: (page: number) => void;
	onPageSizeChange?: (size: number) => void;
	onSelectionChange?: (selectedRows: any[]) => void;
}
```

### Routes Props

```tsx
interface RoutesProps {
	config: RoutesConfig;
	basename?: string;
	profileAPI?: string;
	redirectPrivateTo?: string;
	redirectAuthTo?: string;
}

interface RoutesConfig {
	auth?: RouteConfig[];
	private?: RouteConfig[];
	public?: RouteConfig[];
	groups?: RouteGroupConfig[];
	notFound?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
	error?: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
	basePath?: string;
}
```

### BaseService Constructor

```tsx
constructor(apiName: string, options?: ServiceOptions)

interface ServiceOptions {
  isOtherUrl?: boolean;
  isFormData?: boolean;
  timeout?: number;
}
```

## 💡 TypeScript Support

Library được viết 100% bằng TypeScript và cung cấp đầy đủ type definitions:

```tsx
import type { ApiResponse, FilterObject, IUniqueId, ServiceOptions } from '@libeyondea/base-cms';

// Type-safe service
class ProductService extends BaseService {
	constructor() {
		super('/products');
	}

	async getProducts(filters: FilterObject): Promise<ApiResponse<Product[]>> {
		const response = await this.getAll<Product[]>(filters);
		return response.data;
	}
}

// Type-safe form
interface UserFormData {
	name: string;
	email: string;
	role: number;
}

const methods = useForm<UserFormData>({
	defaultValues: {
		name: '',
		email: '',
		role: 1
	}
});
```

## 🎓 Best Practices

### 1. Form Validation

Luôn sử dụng Yup schema cho validation phức tạp:

```tsx
const schema = yup.object({
	email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
	password: yup
		.string()
		.min(8, 'Mật khẩu tối thiểu 8 ký tự')
		.matches(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
		.matches(/[0-9]/, 'Phải có ít nhất 1 số')
		.required('Mật khẩu là bắt buộc')
});
```

### 2. API Service Organization

Tổ chức services theo domain:

```
services/
├── core/
│   └── baseService.ts
├── auth/
│   ├── authService.ts
│   └── tokenService.ts
├── user/
│   └── userService.ts
└── product/
    └── productService.ts
```

### 3. Component Composition

Tái sử dụng components thông qua composition:

```tsx
// Bad
function UserForm() {
  return (
    <div>
      <input name="name" />
      <input name="email" />
      <button>Submit</button>
    </div>
  );
}

// Good
function UserForm() {
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit}>
      <RHFTextField name="name" label="Name" />
      <RHFTextField name="email" label="Email" />
      <Button type="submit">Submit</Button>
    </FormProvider>
  );
}
```

### 4. Error Handling

Luôn handle errors properly:

```tsx
async function loadData() {
	try {
		const response = await userService.getAll();
		setData(response.data);
	} catch (error) {
		console.error('Failed to load data:', error);
		showError('Không thể tải dữ liệu');
	}
}
```

### 5. Performance

Sử dụng React Query cho data fetching:

```tsx
const { data, isLoading, error } = useQuery({
	queryKey: ['users', filters],
	queryFn: () => userService.getAll(filters),
	staleTime: 5 * 60 * 1000 // 5 minutes
});
```

## 🐛 Troubleshooting

### Lỗi: "useTheme must be used within an AppProvider"

**Nguyên nhân**: Component sử dụng `useTheme` không được wrap trong `AppProvider`.

**Giải pháp**:

```tsx
// ❌ Bad
function App() {
  return <MyComponent />;
}

// ✅ Good
function App() {
  return (
    <AppProvider>
      <MyComponent />
    </AppProvider>
  );
}
```

### Lỗi: Form validation không hoạt động

**Nguyên nhân**: Chưa wrap RHF components trong `FormProvider`.

**Giải pháp**:

```tsx
// ❌ Bad
<RHFTextField name="email" label="Email" />

// ✅ Good
<FormProvider methods={methods} onSubmit={handleSubmit}>
  <RHFTextField name="email" label="Email" />
</FormProvider>
```

### Lỗi: Missing peer dependencies

**Nguyên nhân**: Chưa cài đặt đầy đủ peer dependencies.

**Giải pháp**: Cài đặt tất cả peer dependencies theo hướng dẫn ở phần [Cài đặt](#-cài-đặt).

### Lỗi: Xung đột phiên bản dependencies

**Nguyên nhân**: Phiên bản dependencies không tương thích với yêu cầu của library.

**Giải pháp**: Sử dụng đúng phiên bản dependencies như đã liệt kê trong peer dependencies.

## 🔄 Migration Guide

### Từ v1.0.x lên v1.0.21

**⚠️ BREAKING CHANGES**: Từ v1.0.21, tất cả dependencies đã được chuyển thành peer dependencies.

**Migration steps:**

1. **Update library:**

```bash
npm update @libeyondea/base-cms
```

2. **Cài đặt peer dependencies:**

```bash
npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.3 @reduxjs/toolkit@2.9.0 react-redux@9.2.0 @emotion/react@11.14.0 @emotion/styled@11.14.1 @mui/icons-material@7.3.4 @mui/material@7.3.4 @mui/system@7.3.3 @mui/x-date-pickers@8.12.0 @tanstack/react-query@5.90.2 @tanstack/react-table@8.21.3 @hookform/resolvers@5.2.2 axios@1.12.2 dayjs@1.11.18 js-cookie@3.0.5 lodash-es@4.17.21 qs@6.14.0 react-big-calendar@1.19.4 react-hook-form@7.63.0 react-icons@5.5.0 react-number-format@5.4.4 react-toastify@11.0.5 sweetalert2@11.23.0 yup@1.7.1
```

3. **Xóa dependencies cũ (nếu có):**

```bash
# Xóa các dependencies đã được chuyển thành peer dependencies
npm uninstall @emotion/react @emotion/styled @mui/material @mui/icons-material @mui/system @mui/x-date-pickers @tanstack/react-query @tanstack/react-table react-redux @hookform/resolvers axios dayjs js-cookie lodash-es qs react-big-calendar react-hook-form react-icons react-number-format react-toastify sweetalert2 yup
```

## 📄 License

MIT License - xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

Copyright (c) 2025 Nguyen Thuc

## 👨‍💻 Tác giả

**Nguyen Thuc**

- GitHub: [@libeyondea](https://github.com/libeyondea)
- Twitter: [@libeyondea](https://twitter.com/libeyondea)

## 🔗 Liên kết

- 📦 [NPM Package](https://www.npmjs.com/package/@libeyondea/base-cms)
- 🐙 [GitHub Repository](https://github.com/libeyondea/base-cms)
- 📝 [Changelog](https://github.com/libeyondea/base-cms/releases)
- 🐛 [Issue Tracker](https://github.com/libeyondea/base-cms/issues)
- 💬 [Discussions](https://github.com/libeyondea/base-cms/discussions)

## 🙏 Acknowledgements

Cảm ơn các thư viện open-source tuyệt vời:

- [Material-UI](https://mui.com/) - UI Framework
- [React Hook Form](https://react-hook-form.com/) - Form Management
- [TanStack Table](https://tanstack.com/table) - Table Component
- [TanStack Query](https://tanstack.com/query) - Data Fetching
- [Redux Toolkit](https://redux-toolkit.js.org/) - State Management

## 📚 Tài liệu bổ sung

### 🆕 Role-Based Access Control

Library giờ đây hỗ trợ linh hoạt nhiều cấu trúc role khác nhau:

- `role: 'admin'` - Single string
- `roles: ['admin', 'user']` - Array of strings
- `roles: [{ten_vai_tro: 'admin'}]` - Array of objects
- Và nhiều cấu trúc khác...

📖 **Xem hướng dẫn chi tiết:** [ROLE_CONFIG_GUIDE.md](../../ROLE_CONFIG_GUIDE.md)

📖 **Xem README trong Sidebar component:** [README_ROLE_CONFIG.md](./src/components/Layout/SideBar/README_ROLE_CONFIG.md)

📖 **Xem ví dụ config:** [roleConfig.example.ts](./src/components/Layout/SideBar/roleConfig.example.ts)

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/libeyondea">Nguyen Thuc</a></sub>
</div>
