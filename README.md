# 📦 Base CMS - Monorepo

> Thư viện React CMS hiện đại và mạnh mẽ với kiến trúc monorepo, cung cấp bộ công cụ hoàn chỉnh để xây dựng hệ thống quản trị nội dung chuyên nghiệp.

[![npm version](https://img.shields.io/npm/v/@libeyondea/base-cms.svg)](https://www.npmjs.com/package/@libeyondea/base-cms)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Mục lục

- [Tổng quan](#-tổng-quan)
- [Packages](#-packages)
- [Cài đặt nhanh](#-cài-đặt-nhanh)
- [Development](#-development)
- [Scripts](#-scripts)
- [Cấu trúc Workspace](#-cấu-trúc-workspace)
- [Lợi ích của Kiến trúc Monorepo](#-lợi-ích-của-kiến-trúc-monorepo)
- [Publishing](#-publishing)
- [License](#-license)

## 🎯 Tổng quan

**Base CMS** là một thư viện React được xây dựng theo kiến trúc monorepo, cung cấp các component, hooks, layouts và utilities được tối ưu hóa để phát triển ứng dụng CMS một cách nhanh chóng và hiệu quả. Dự án được tổ chức thành 2 packages độc lập nhưng hoạt động cùng nhau một cách liền mạch.

### ✨ Tính năng nổi bật

- 🎨 **UI Components phong phú**: Hơn 40+ components được tùy chỉnh dựa trên Material-UI v7
- 📝 **Form Management hoàn chỉnh**: Tích hợp React Hook Form + Yup validation
- 📊 **Table System mạnh mẽ**: Powered by TanStack Table v8
- 🎨 **Theme System linh hoạt**: Hỗ trợ Dark/Light mode với customization đầy đủ
- 🔧 **Developer Experience tốt**: TypeScript support, ESLint, Prettier
- 🛣️ **Custom Routes System**: Cấu hình routes dễ dàng chỉ với object/array
- 📦 **Package Management đơn giản**: Chỉ cần 2 packages chính thay vì 20+ dependencies
- 🚀 **Production-ready**: Build với Vite, optimized, tree-shakeable và lightweight

## 📦 Packages

Monorepo này bao gồm 3 packages chính:

### 1. [@libeyondea/base-cms](./packages/base-cms)

**Package chính** - Thư viện React CMS với đầy đủ components, hooks và utilities.

- 📍 **Path**: `packages/base-cms`
- 📊 **Version**: v1.0.55
- 📦 **Bundle**: ES Module (tree-shakeable)
- 📝 **TypeScript**: Full type definitions included

**Bao gồm:**

- ✅ 40+ UI Components (Form, Table, Layout, Navigation, etc.)
- ✅ Custom Hooks (useStateValue, useAudioPlayer, useSweetAlert)
- ✅ **Custom Routes System** - Cấu hình routes chỉ bằng object/array
- ✅ Theme System với Material-UI v7
- ✅ Utilities (axios, time, format, cookie, color)
- ✅ Base Service class cho API integration
- ✅ Layouts (Auth, Private, Public)
- ✅ TypeScript declarations

**Peer Dependencies (Cần cài đặt):**

- React 19.2.0 + React DOM 19.2.0 + React Router DOM 7.9.3
- Material-UI v7 ecosystem (@mui/material, @mui/icons-material, @mui/system, @mui/x-date-pickers)
- Redux Toolkit 2.9.0 + React Redux 9.2.0
- React Hook Form 7.63.0 + Yup 1.7.1 + @hookform/resolvers 5.2.2
- TanStack React Query 5.90.2 + TanStack React Table 8.21.3
- Emotion (@emotion/react, @emotion/styled)
- Utilities (axios, dayjs, js-cookie, lodash-es, qs)
- UI Libraries (react-big-calendar, react-icons, react-number-format, react-toastify, sweetalert2)

### 2. [@libeyondea/base-cms-dev](./packages/base-cms-dev)

**Dev Dependencies Package** - Bundle tất cả development tools cần thiết.

- 📍 **Path**: `packages/base-cms-dev`
- 📊 **Version**: v1.0.17
- 🎯 **Mục đích**: Đơn giản hóa việc cài đặt dev dependencies

**Bao gồm:**

- ✅ Build Tools: TypeScript 5.9.3, Vite 7.1.9, Rollup plugins
- ✅ Linting & Formatting: ESLint 9.36.0, Prettier 3.6.2
- ✅ Type Definitions: @types/\* cho tất cả dependencies
- ✅ Development Utilities: Vite plugins, visualizer

### 3. [base-cms-react](./examples/base-cms-react)

**Example Project** - Ví dụ implementation hoàn chỉnh sử dụng base-cms library.

- 📍 **Path**: `examples/base-cms-react`
- 📊 **Version**: v1.0.0
- 🎯 **Mục đích**: Demo và reference implementation
- 📝 **TypeScript**: Full TypeScript support

**Bao gồm:**

- ✅ Complete CMS application example
- ✅ Authentication flow (Sign in/Sign up)
- ✅ Dashboard với user management
- ✅ Public pages (About, Contact)
- ✅ Layouts implementation (Auth, Private, Public)
- ✅ Redux store setup
- ✅ API services integration
- ✅ Routing configuration

## 🚀 Cài đặt nhanh

### Cho người dùng cuối (End Users)

Cài đặt cả 2 packages chính trong project của bạn:

```bash
# Cài đặt library chính
npm install @libeyondea/base-cms

# Cài đặt dev dependencies (thay vì cài từng package riêng lẻ)
npm install --save-dev @libeyondea/base-cms-dev

# Cài đặt peer dependencies bắt buộc (tất cả dependencies cần thiết)
npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.3 @reduxjs/toolkit@2.9.0 react-redux@9.2.0 @emotion/react@11.14.0 @emotion/styled@11.14.1 @mui/icons-material@7.3.4 @mui/material@7.3.4 @mui/system@7.3.3 @mui/x-date-pickers@8.12.0 @tanstack/react-query@5.90.2 @tanstack/react-table@8.21.3 @hookform/resolvers@5.2.2 axios@1.12.2 dayjs@1.11.18 js-cookie@3.0.5 lodash-es@4.17.21 qs@6.14.0 react-big-calendar@1.19.4 react-hook-form@7.63.0 react-icons@5.5.0 react-number-format@5.4.4 react-toastify@11.0.5 sweetalert2@11.23.0 yup@1.7.1
```

### Cho Contributors & Maintainers

Clone và setup môi trường development:

```bash
# Clone repository
git clone https://github.com/libeyondea/base-cms.git
cd base-cms

# Cài đặt tất cả dependencies cho workspace
npm install

# Build package
npm run build

# Chạy example application
npm run dev:example
```

### Chạy Example Application

Để xem cách sử dụng library trong thực tế:

```bash
# Clone repository
git clone https://github.com/libeyondea/base-cms.git
cd base-cms

# Cài đặt dependencies
npm install

# Chạy example application
npm run dev:example

# Mở browser tại http://localhost:1000
```

Example application bao gồm:

- ✅ **Authentication flow** (Sign in/Sign up pages)
- ✅ **Dashboard** với user management
- ✅ **Public pages** (About, Contact)
- ✅ **Layout implementations** (Auth, Private, Public)
- ✅ **Redux store** setup và usage
- ✅ **API services** integration
- ✅ **Routing** configuration với guards

## 🛠️ Development

### Yêu cầu hệ thống

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **Git**: Latest stable version

### Development Workflow

```bash
# 1. Cài đặt dependencies
npm install

# 2. Build packages
npm run build

# 3. Lint code
npm run lint

# 4. Chạy example application (port 1000)
npm run dev:example

# 5. Preview example build
npm run preview:example
```

### Thư mục làm việc

- **Source code**: `packages/base-cms/src/`
- **Build output**: `packages/base-cms/dist/`
- **Dev package**: `packages/base-cms-dev/`
- **Example app**: `examples/base-cms-react/`

## 📜 Scripts

### Root Level Scripts

| Script                    | Mô tả                                   | Command                                          |
| ------------------------- | --------------------------------------- | ------------------------------------------------ |
| `npm run build`           | Build package base-cms                  | `npm run build --workspace=@libeyondea/base-cms` |
| `npm run lint`            | Lint code của base-cms                  | `npm run lint --workspace=@libeyondea/base-cms`  |
| `npm run dev:example`     | Chạy dev server cho example (port 1000) | `npm run dev --workspace=base-cms-react`         |
| `npm run build:example`   | Build example project                   | `npm run build --workspace=base-cms-react`       |
| `npm run preview:example` | Preview example build (port 1000)       | `npm run preview --workspace=base-cms-react`     |

### Package Level Scripts (base-cms)

```bash
cd packages/base-cms

npm run dev      # Vite dev server
npm run build    # TypeScript build + Vite build
npm run lint     # ESLint check
npm run preview  # Preview production build
```

## 📁 Cấu trúc Workspace

```
base-cms/                           # Root directory (monorepo)
├── packages/
│   ├── base-cms/                   # Main library package
│   │   ├── src/                    # Source code
│   │   │   ├── components/         # React components (40+)
│   │   │   │   ├── Avatar/
│   │   │   │   ├── Breadcrumbs/
│   │   │   │   ├── Form/           # Form components (15 files)
│   │   │   │   ├── Input/
│   │   │   │   ├── Layout/
│   │   │   │   ├── MainCard/
│   │   │   │   ├── StanstackTable/ # Table system
│   │   │   │   └── ...
│   │   │   ├── contexts/           # React contexts
│   │   │   │   └── AppProvider.tsx # Main context provider
│   │   │   ├── hooks/              # Custom hooks
│   │   │   │   ├── useStateValue.ts
│   │   │   │   ├── useAudioPlayer.ts
│   │   │   │   └── useSweetAlert.ts
│   │   │   ├── routes/             # Routing system
│   │   │   ├── service/            # API services
│   │   │   │   └── core/
│   │   │   │       └── baseService.ts
│   │   │   ├── theme/              # Theme configuration
│   │   │   │   ├── index.ts
│   │   │   │   └── theme.ts
│   │   │   ├── utils/              # Utility functions
│   │   │   │   ├── axios.ts
│   │   │   │   ├── color.ts
│   │   │   │   ├── constant.ts
│   │   │   │   ├── cookie.ts
│   │   │   │   ├── formatArray.ts
│   │   │   │   ├── formatChacter.ts
│   │   │   │   ├── formData.ts
│   │   │   │   └── time.ts
│   │   │   ├── config.ts           # Configuration
│   │   │   ├── index.ts            # Main export file
│   │   │   └── main.tsx            # Dev entry point
│   │   ├── dist/                   # Build output
│   │   │   ├── base-cms.es.js      # ES module build
│   │   │   ├── base-cms.css        # Styles
│   │   │   └── *.d.ts              # Type definitions
│   │   ├── public/                 # Static assets
│   │   ├── package.json
│   │   ├── vite.config.ts          # Vite configuration
│   │   ├── tsconfig.json           # TypeScript config
│   │   └── README.md               # Package documentation
│   │
│   └── base-cms-dev/               # Dev dependencies package
│       ├── package.json            # Dev tools manifest
│       └── README.md               # Dev package docs
│
├── examples/
│   └── base-cms-react/             # Example implementation
│       ├── src/                    # Example source code
│       │   ├── hooks/              # API hooks example
│       │   ├── layouts/            # Layout implementations
│       │   ├── service/            # API services example
│       │   ├── store/              # Redux store setup
│       │   ├── theme/              # Theme configuration
│       │   ├── types/              # TypeScript types
│       │   ├── utils/              # Utility functions
│       │   ├── views/              # Page components
│       │   │   ├── auth/           # Authentication pages
│       │   │   ├── private/        # Protected pages
│       │   │   └── public/         # Public pages
│       │   ├── App.tsx             # Main app component
│       │   ├── config.ts           # App configuration
│       │   ├── main.tsx            # Entry point
│       │   └── routes.tsx          # Routing setup
│       ├── public/                 # Static assets
│       ├── package.json
│       ├── vite.config.ts
│       └── README.md
│
├── scripts/
│   └── publish.ps1                 # PowerShell publish script
├── package.json                    # Root workspace config
├── LICENSE                         # MIT License
└── README.md                       # This file
```

### Giải thích cấu trúc

#### `packages/base-cms/`

- **`src/components/`**: Tất cả React components được chia theo chức năng
- **`src/contexts/`**: React Context providers (theme, sidebar, table)
- **`src/hooks/`**: Custom hooks tái sử dụng
- **`src/service/`**: Base service class và API services
- **`src/theme/`**: Theme configuration cho Material-UI
- **`src/utils/`**: Utility functions (format, time, axios, etc.)
- **`dist/`**: Output sau khi build (ES module + type definitions)

#### `packages/base-cms-dev/`

- Package chỉ chứa `package.json` với dev dependencies
- Không có source code, chỉ là dependency bundler

#### `examples/base-cms-react/`

- **Complete example application** sử dụng base-cms library
- **Reference implementation** cho cách tích hợp và sử dụng library
- **Full-stack demo** với authentication, dashboard, và public pages
- **Best practices** cho project structure và code organization

## 💡 Lợi ích của Kiến trúc Monorepo

### 1. **Đơn giản hóa việc cài đặt**

❌ **Trước đây** (20+ dependencies):

```bash
npm install typescript vite eslint prettier @types/react @types/node ...
# và 15+ packages khác
```

✅ **Bây giờ** (2 packages chính + peer dependencies + example):

```bash
# Cài đặt library chính
npm install @libeyondea/base-cms

# Cài đặt dev dependencies
npm install --save-dev @libeyondea/base-cms-dev

# Cài đặt peer dependencies (một lần duy nhất)
npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.3 @reduxjs/toolkit@2.9.0 react-redux@9.2.0 @emotion/react@11.14.0 @emotion/styled@11.14.1 @mui/icons-material@7.3.4 @mui/material@7.3.4 @mui/system@7.3.3 @mui/x-date-pickers@8.12.0 @tanstack/react-query@5.90.2 @tanstack/react-table@8.21.3 @hookform/resolvers@5.2.2 axios@1.12.2 dayjs@1.11.18 js-cookie@3.0.5 lodash-es@4.17.21 qs@6.14.0 react-big-calendar@1.19.4 react-hook-form@7.63.0 react-icons@5.5.0 react-number-format@5.4.4 react-toastify@11.0.5 sweetalert2@11.23.0 yup@1.7.1
```

### 2. **Version Consistency**

- Tất cả dev tools được versioned cùng nhau
- Peer dependencies cho phép kiểm soát phiên bản dependencies
- Đảm bảo compatibility 100% với project hiện có

### 3. **Easier Maintenance**

- Update dev dependencies ở một nơi duy nhất
- Publish một lần, áp dụng cho tất cả projects
- Giảm thiểu breaking changes với peer dependencies

### 4. **Better Developer Experience**

- `package.json` của user projects gọn gàng hơn
- Không cần quan tâm đến từng dev dependency
- Focus vào business logic thay vì configuration
- Kiểm soát hoàn toàn phiên bản dependencies

### 5. **Reusability & Flexibility**

- Tất cả components, hooks, utilities có thể tái sử dụng
- Type-safe với TypeScript
- Tree-shakeable build (chỉ import những gì cần)
- Tương thích với project hiện có mà không gây xung đột

### 6. **Collaborative Development**

- Dễ dàng đóng góp code
- Consistent coding standards (ESLint + Prettier)
- Clear project structure
- Peer dependencies giúp tránh xung đột trong team

## 📤 Publishing

Sử dụng PowerShell script để publish packages:

```powershell
# Di chuyển vào thư mục scripts
cd scripts

# Publish cả hai packages (recommended)
.\publish.ps1 -target all

# Hoặc publish từng package riêng lẻ
.\publish.ps1 -target base-cms-dev
.\publish.ps1 -target base-cms

# Xem hướng dẫn
.\publish.ps1 -help
```

### Quy trình Publishing

1. **Script tự động build** tất cả packages
2. **Tự động tăng version** (patch version)
3. **Publish lên npm** với public access
4. **base-cms-dev** được publish trước (vì base-cms phụ thuộc vào nó)
5. **Đợi 5 giây** để package sync trên npm registry
6. **base-cms** được publish sau

### Lưu ý khi Publishing

- ⚠️ Cần quyền publish lên `@libeyondea` scope trên npm
- ⚠️ Phải chạy từ thư mục `scripts/`
- ✅ Script tự động kiểm tra errors và rollback nếu có lỗi
- ✅ Version sẽ tự động tăng patch (x.x.**X**)

## 📖 Tài liệu sử dụng

Xem tài liệu chi tiết cho từng package:

- **[@libeyondea/base-cms](./packages/base-cms/README.md)** - Hướng dẫn sử dụng library đầy đủ
- **[@libeyondea/base-cms-dev](./packages/base-cms-dev/README.md)** - Thông tin về dev dependencies

### 🛣️ Custom Routes System

**base-cms** cung cấp hệ thống routes linh hoạt cho phép bạn cấu hình routes chỉ bằng cách truyền vào một object:

```tsx
import { lazy } from 'react';

import { Routes, RoutesConfig } from 'base-cms';

const myRoutes: RoutesConfig = {
	// Auth routes - tự động có AuthGuard
	auth: [
		{
			path: 'login',
			element: lazy(() => import('./pages/Login'))
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
		}
	],

	// Public routes - không có guard
	public: [
		{
			path: 'about',
			element: lazy(() => import('./pages/About'))
		}
	]
	// NotFound page tự động được thêm (có thể override bằng notFound: YourComponent)
};

function App() {
	return <Routes config={myRoutes} />;
}
```

**Tính năng:**

- ✅ Tự động apply guards (Private, Auth, Public)
- ✅ Hỗ trợ nested routes
- ✅ Layout wrappers
- ✅ Route groups với prefix
- ✅ Metadata cho routes
- ✅ Type-safe với TypeScript

📚 **Xem hướng dẫn chi tiết:** [ROUTES_GUIDE.md](./packages/base-cms/ROUTES_GUIDE.md)

## 🤝 Đóng góp

Chúng tôi rất hoan nghênh mọi đóng góp! Để contribute:

1. Fork repository
2. Tạo feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Tạo Pull Request

### Coding Standards

- ✅ Follow ESLint rules
- ✅ Format code với Prettier
- ✅ Write TypeScript với proper types
- ✅ Add JSDoc comments cho public APIs
- ✅ Update README khi thêm features mới

## 📄 License

MIT License - xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

Copyright (c) 2025 Nguyen Thuc

## 👨‍💻 Tác giả

**Nguyen Thuc**

- GitHub: [@libeyondea](https://github.com/libeyondea)
- Twitter: [@libeyondea](https://twitter.com/libeyondea)

## 🔗 Liên kết hữu ích

- 📦 [NPM Package - @libeyondea/base-cms](https://www.npmjs.com/package/@libeyondea/base-cms)
- 📦 [NPM Package - @libeyondea/base-cms-dev](https://www.npmjs.com/package/@libeyondea/base-cms-dev)
- 🐙 [GitHub Repository](https://github.com/libeyondea/base-cms)
- 📝 [Changelog](https://github.com/libeyondea/base-cms/releases)
- 🐛 [Issue Tracker](https://github.com/libeyondea/base-cms/issues)

## 📞 Hỗ trợ

Nếu bạn gặp vấn đề hoặc có câu hỏi:

- 🐛 [Tạo Issue](https://github.com/libeyondea/base-cms/issues/new) trên GitHub
- 💬 [Discussions](https://github.com/libeyondea/base-cms/discussions) cho Q&A
- 📧 Email: [your-email@example.com]

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/libeyondea">Nguyen Thuc</a></sub>
</div>
