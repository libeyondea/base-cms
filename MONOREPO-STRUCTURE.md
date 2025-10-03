# 🏗️ Cấu trúc Monorepo - Base CMS

## 📦 Packages

### 1. @libeyondea/base-cms

**Vị trí**: `packages/base-cms/`  
**Mục đích**: Library chính chứa components, hooks, layouts

**Cài đặt**:

```bash
npm install @libeyondea/base-cms
```

**Nội dung**:

- Components (forms, tables, UI, layouts)
- Custom hooks
- Redux store & slices
- Routes & guards
- Services (API calls)
- Utils & helpers
- Theme configuration

---

### 2. @libeyondea/base-cms-dev

**Vị trí**: `packages/base-cms-dev/`  
**Mục đích**: Bundle tất cả development dependencies

**Cài đặt**:

```bash
npm install --save-dev @libeyondea/base-cms-dev
```

**Nội dung**:

- TypeScript & compiler
- Build tools (Vite, Rollup)
- Linting (ESLint)
- Formatting (Prettier)
- Type definitions (@types/\*)

---

## 📂 Cấu trúc thư mục

```
base-cms/
│
├── packages/
│   ├── base-cms/                      # Main library package
│   │   ├── src/
│   │   │   ├── components/            # React components
│   │   │   │   ├── container/
│   │   │   │   ├── forms/             # Form components (RHF)
│   │   │   │   ├── input/             # Input components
│   │   │   │   ├── layout/            # Header, Sidebar
│   │   │   │   ├── loading/           # Loading components
│   │   │   │   ├── table/             # Table components
│   │   │   │   └── ui/                # UI components
│   │   │   ├── contexts/              # React contexts
│   │   │   ├── hooks/                 # Custom hooks
│   │   │   │   └── api/               # API hooks
│   │   │   ├── layouts/               # Page layouts
│   │   │   │   ├── auth/              # Auth layout
│   │   │   │   ├── private/           # Private layout
│   │   │   │   └── public/            # Public layout
│   │   │   ├── routes/                # Route configs
│   │   │   ├── service/               # API services
│   │   │   │   └── core/              # Base service
│   │   │   ├── store/                 # Redux store
│   │   │   │   └── slices/            # Redux slices
│   │   │   ├── theme/                 # MUI theme
│   │   │   ├── types/                 # TypeScript types
│   │   │   ├── utils/                 # Utilities
│   │   │   ├── views/                 # Page views
│   │   │   └── index.ts               # Main export
│   │   ├── public/                    # Public assets
│   │   ├── dist/                      # Build output
│   │   ├── package.json
│   │   ├── vite.config.ts
│   │   ├── tsconfig.*.json
│   │   └── README.md
│   │
│   └── base-cms-dev/                  # Dev dependencies package
│       ├── package.json
│       ├── README.md
│       └── LICENSE
│
├── scripts/                           # Helper scripts
│   ├── publish.sh                     # Bash publish script
│   └── publish.ps1                    # PowerShell publish script
│
├── package.json                       # Root workspace config
├── .npmrc                            # NPM config
├── .gitignore                        # Git ignore
│
├── README.md                         # Main docs
├── USAGE.md                          # Usage guide
├── MIGRATION.md                      # Migration guide
├── CHANGELOG.md                      # Changelog
├── SUMMARY.md                        # Summary
└── MONOREPO-STRUCTURE.md            # This file
```

---

## 🚀 Commands

### Development

```bash
npm run dev              # Start dev server cho base-cms
npm run preview          # Preview build
```

### Build

```bash
npm run build            # Build tất cả packages
npm run build:cms        # Build chỉ base-cms
```

### Quality

```bash
npm run lint             # Lint tất cả packages
```

### Maintenance

```bash
npm run clean            # Xóa node_modules & dist
npm run reinstall        # Clean + install lại
```

### Publishing

```bash
npm run publish:all:win  # Publish all packages (Windows)
npm run publish:all      # Publish all packages (Linux/Mac)
```

---

## 📝 Workflow

### 1. Development workflow

```bash
# Clone repo
git clone https://github.com/libeyondea/base-cms.git
cd base-cms

# Install dependencies
npm install

# Start development
npm run dev

# Make changes in packages/base-cms/src/

# Build để test
npm run build:cms
```

### 2. Publishing workflow

```bash
# 1. Update version trong cả 2 packages
# packages/base-cms/package.json
# packages/base-cms-dev/package.json

# 2. Update CHANGELOG.md

# 3. Commit changes
git add .
git commit -m "chore: bump version to x.x.x"

# 4. Create tag
git tag vx.x.x

# 5. Publish (Windows)
npm run publish:all:win

# 6. Push to git
git push origin main --tags
```

---

## 💡 Lợi ích của cấu trúc này

### ✅ Cho người dùng

1. **Cài đặt đơn giản**: Chỉ 2 packages
2. **Package.json gọn**: Không rối với hàng chục devDeps
3. **Version đồng bộ**: Dev tools luôn compatible
4. **Update dễ**: 1 lệnh update tất cả dev tools

### ✅ Cho maintainer

1. **Quản lý tập trung**: Dev deps ở 1 nơi
2. **Testing dễ**: Test cả 2 packages trong 1 repo
3. **CI/CD rõ ràng**: Workflow đơn giản
4. **Maintain dễ**: Update ở 1 nơi

---

## 🔗 Dependencies Overview

### Runtime Dependencies (18 packages)

- **MUI**: @mui/material, @mui/icons-material, @mui/x-date-pickers
- **Emotion**: @emotion/react, @emotion/styled
- **Forms**: react-hook-form, yup, @hookform/resolvers
- **State**: @reduxjs/toolkit, react-redux
- **Data**: @tanstack/react-query, @tanstack/react-table
- **Utils**: axios, moment, lodash-es, js-cookie, qs
- **UI**: react-big-calendar, react-toastify, sweetalert2, react-icons, react-number-format

### Peer Dependencies (5 packages)

- react, react-dom
- react-router-dom
- @reduxjs/toolkit, react-redux

### Dev Dependencies (20 packages)

- **TypeScript**: typescript
- **Build**: vite, @vitejs/plugin-react-swc, @rollup/plugin-terser, rollup-plugin-visualizer, vite-plugin-dts
- **Lint**: eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, typescript-eslint, globals
- **Format**: prettier, @trivago/prettier-plugin-sort-imports
- **Types**: @types/react, @types/react-dom, @types/node, @types/js-cookie, @types/lodash-es, @types/qs, @types/react-big-calendar

---

## 📊 Package Statistics

| Metric            | @libeyondea/base-cms | @libeyondea/base-cms-dev |
| ----------------- | -------------------- | ------------------------ |
| Type              | Library              | Meta package             |
| Dependencies      | 18 runtime           | 20 dev tools             |
| Size (estimated)  | ~500KB               | ~1MB (all tools)         |
| Purpose           | Production code      | Development tools        |
| Publish frequency | Every feature/fix    | When tools update        |

---

## 🎯 Use Cases

### Cho dự án mới

```bash
# Setup project
npm init -y
npm install react react-dom react-router-dom @reduxjs/toolkit react-redux

# Install base-cms
npm install @libeyondea/base-cms
npm install --save-dev @libeyondea/base-cms-dev

# Start coding
import { Component } from '@libeyondea/base-cms';
```

### Cho dự án hiện có

Xem [MIGRATION.md](./MIGRATION.md) để migrate từ v1.0.6

---

## 📚 Documentation

| File                      | Nội dung                     |
| ------------------------- | ---------------------------- |
| **README.md**             | Tổng quan, quick start       |
| **USAGE.md**              | Hướng dẫn chi tiết sử dụng   |
| **MIGRATION.md**          | Hướng dẫn migrate từ v1.0.6  |
| **CHANGELOG.md**          | Lịch sử thay đổi             |
| **SUMMARY.md**            | Tổng hợp toàn bộ             |
| **MONOREPO-STRUCTURE.md** | Cấu trúc monorepo (file này) |

---

## 🔧 Configuration Files

### Root level

- **package.json**: Workspace configuration với `workspaces: ["packages/*"]`
- **.npmrc**: NPM settings (`legacy-peer-deps=true`)
- **.gitignore**: Git ignore patterns

### Package level (base-cms)

- **vite.config.ts**: Build config (library mode)
- **tsconfig.json**: TypeScript project references
- **tsconfig.app.json**: App TypeScript config
- **tsconfig.node.json**: Node TypeScript config
- **tsconfig.build.json**: Build TypeScript config (declaration only)
- **eslint.config.js**: ESLint configuration

---

## ❓ FAQ

**Q: Tại sao tách thành 2 packages?**  
A: Để người dùng không phải cài 20+ dev dependencies, chỉ cần cài 1 package dev.

**Q: Có cần cài cả 2 packages không?**  
A: Có, `@libeyondea/base-cms` cho runtime, `@libeyondea/base-cms-dev` cho development.

**Q: Có thể dùng riêng base-cms-dev cho dự án khác không?**  
A: Có thể! Nó chứa tất cả dev tools cần thiết.

**Q: Làm sao update lên version mới?**  
A: `npm update @libeyondea/base-cms @libeyondea/base-cms-dev`

**Q: Có thể customize dev dependencies không?**  
A: Có, bạn vẫn có thể cài thêm hoặc override bằng cách cài trực tiếp vào devDependencies.

---

**Version**: 1.0.7  
**Last Updated**: October 3, 2025  
**Maintainer**: Nguyen Thuc
