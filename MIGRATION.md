# Migration Guide: v1.0.6 → v1.0.7

Hướng dẫn chi tiết để migrate từ `@libeyondea/base-cms` v1.0.6 sang monorepo structure v1.0.7.

## Thay đổi chính

### 1. Cấu trúc mới: 2 packages

- `@libeyondea/base-cms` - Library chính
- `@libeyondea/base-cms-dev` - Dev dependencies

## Bước migrate cho dự án hiện tại

### Bước 1: Gỡ package cũ

```bash
npm uninstall @libeyondea/base-cms
```

### Bước 2: Xóa các dev dependencies cũ (nếu có)

Xóa các packages sau khỏi `devDependencies` trong `package.json`:

```json
{
	"devDependencies": {
		// ❌ Xóa những dòng này
		"typescript": "...",
		"vite": "...",
		"@vitejs/plugin-react-swc": "...",
		"eslint": "...",
		"@eslint/js": "...",
		"eslint-plugin-react-hooks": "...",
		"eslint-plugin-react-refresh": "...",
		"prettier": "...",
		"@trivago/prettier-plugin-sort-imports": "...",
		"@types/react": "...",
		"@types/react-dom": "...",
		"@types/node": "...",
		"@types/js-cookie": "...",
		"@types/lodash-es": "...",
		"@types/qs": "...",
		"@types/react-big-calendar": "...",
		"@rollup/plugin-terser": "...",
		"rollup-plugin-visualizer": "...",
		"typescript-eslint": "...",
		"vite-plugin-dts": "...",
		"globals": "..."
	}
}
```

### Bước 3: Cài đặt packages mới

```bash
# Cài library chính
npm install @libeyondea/base-cms

# Cài dev dependencies
npm install --save-dev @libeyondea/base-cms-dev
```

### Bước 4: Cập nhật imports (nếu cần)

Nếu bạn import trực tiếp từ package name:

```typescript
// Import không thay đổi
import { Component } from '@libeyondea/base-cms';
```

### Bước 5: Kiểm tra peer dependencies

Đảm bảo bạn đã cài đặt các peer dependencies:

```bash
npm install react react-dom react-router-dom @reduxjs/toolkit react-redux
```

### Bước 6: Test lại ứng dụng

```bash
npm run dev
npm run build
```

## So sánh package.json

### Trước migrate (v1.0.6)

```json
{
	"dependencies": {
		"@libeyondea/base-cms": "^1.0.6",
		"react": "^19.2.0",
		"react-dom": "^19.2.0",
		"react-router-dom": "^7.9.3",
		"@reduxjs/toolkit": "^2.9.0",
		"react-redux": "^9.2.0"
	},
	"devDependencies": {
		"typescript": "5.9.3",
		"vite": "7.1.9",
		"@vitejs/plugin-react-swc": "4.1.0",
		"eslint": "9.36.0",
		"@eslint/js": "9.36.0",
		"eslint-plugin-react-hooks": "6.1.0",
		"eslint-plugin-react-refresh": "0.4.23",
		"prettier": "3.6.2",
		"@trivago/prettier-plugin-sort-imports": "5.2.2",
		"@types/react": "19.2.0",
		"@types/react-dom": "19.2.0",
		"@types/node": "22.17.1",
		"@types/js-cookie": "3.0.6",
		"@types/lodash-es": "4.17.12",
		"@types/qs": "6.14.0",
		"@types/react-big-calendar": "1.16.3",
		"@rollup/plugin-terser": "^0.4.4",
		"rollup-plugin-visualizer": "^6.0.4",
		"typescript-eslint": "8.45.0",
		"vite-plugin-dts": "4.5.4",
		"globals": "16.4.0"
	}
}
```

### Sau migrate (v1.0.7) ✨

```json
{
	"dependencies": {
		"@libeyondea/base-cms": "^1.0.7",
		"react": "^19.2.0",
		"react-dom": "^19.2.0",
		"react-router-dom": "^7.9.3",
		"@reduxjs/toolkit": "^2.9.0",
		"react-redux": "^9.2.0"
	},
	"devDependencies": {
		"@libeyondea/base-cms-dev": "^1.0.7"
	}
}
```

**Kết quả**: Từ 25+ packages → chỉ còn 7 packages! 🎉

## Breaking Changes

### ⚠️ Dev dependencies tách riêng

- Tất cả dev tools giờ nằm trong `@libeyondea/base-cms-dev`
- Cần cài thêm package này vào devDependencies

## Lợi ích sau khi migrate

### ✅ Cho Developer

1. **Package.json gọn gàng hơn nhiều**
    - Trước: 25+ packages
    - Sau: 7 packages

2. **Không lo xung đột version**
    - Dev tools được bundle với version tương thích

3. **Cài đặt nhanh hơn**
    - Ít packages = ít thời gian resolve dependencies

### ✅ Cho Team

1. **Dễ maintain**
    - Chỉ cần update 1 package thay vì nhiều packages

2. **Consistent development environment**
    - Mọi người dùng cùng version dev tools

3. **Onboarding nhanh hơn**
    - Developer mới chỉ cần nhớ 2 packages

## Troubleshooting

### Lỗi: TypeScript errors sau khi migrate

**Nguyên nhân**: Thiếu type definitions

**Giải pháp**:

```bash
# Đảm bảo đã cài @libeyondea/base-cms-dev
npm install --save-dev @libeyondea/base-cms-dev

# Clear cache và rebuild
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: Build failed

**Nguyên nhân**: Thiếu build tools

**Giải pháp**:

```bash
# Kiểm tra đã cài base-cms-dev chưa
npm list @libeyondea/base-cms-dev

# Nếu chưa có, cài đặt
npm install --save-dev @libeyondea/base-cms-dev
```

## Rollback (nếu cần)

Nếu gặp vấn đề và cần rollback về v1.0.6:

```bash
# Gỡ packages mới
npm uninstall @libeyondea/base-cms @libeyondea/base-cms-dev

# Cài lại version cũ
npm install @libeyondea/base-cms@1.0.6

# Cài lại dev dependencies (xem package.json backup)
```

## Hỗ trợ

Nếu gặp vấn đề trong quá trình migrate:

1. Kiểm tra [USAGE.md](./USAGE.md) để xem hướng dẫn chi tiết
2. Xem [CHANGELOG.md](./CHANGELOG.md) để biết các thay đổi
3. Tạo issue trên GitHub repository

---

**Khuyến nghị**: Nên migrate để tận dụng các lợi ích của monorepo structure! 🚀
