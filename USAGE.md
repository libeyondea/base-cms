# Hướng dẫn sử dụng Base CMS Monorepo

## Tổng quan

Monorepo này bao gồm 2 packages:

1. **@libeyondea/base-cms** - Library chính với components, hooks, layouts
2. **@libeyondea/base-cms-dev** - Package chứa tất cả dev dependencies

## Cài đặt cho người dùng

### Bước 1: Cài đặt library chính

```bash
npm install @libeyondea/base-cms
```

### Bước 2: Cài đặt dev dependencies (khuyến nghị)

Thay vì phải cài từng package như:

```bash
# ❌ Cách cũ - phải cài nhiều package
npm install --save-dev typescript vite @vitejs/plugin-react-swc
npm install --save-dev eslint @eslint/js eslint-plugin-react-hooks
npm install --save-dev prettier @trivago/prettier-plugin-sort-imports
npm install --save-dev @types/react @types/react-dom @types/node
# ... và nhiều package khác
```

Giờ chỉ cần:

```bash
# ✅ Cách mới - chỉ 1 lệnh
npm install --save-dev @libeyondea/base-cms-dev
```

### Bước 3: Cài đặt peer dependencies

```bash
npm install react react-dom react-router-dom @reduxjs/toolkit react-redux
```

## Phát triển trong Monorepo

### Cài đặt dependencies

```bash
# Tại thư mục root
npm install
```

### Các lệnh có sẵn

```bash
# Chạy dev server
npm run dev

# Build tất cả packages
npm run build

# Build chỉ package base-cms
npm run build:cms

# Lint tất cả packages
npm run lint

# Preview build
npm run preview
```

### Cấu trúc thư mục

```
base-cms/
├── packages/
│   ├── base-cms/              # Package chính
│   │   ├── src/               # Source code
│   │   │   ├── components/    # React components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── layouts/       # Layout components
│   │   │   ├── routes/        # Route definitions
│   │   │   ├── service/       # API services
│   │   │   ├── store/         # Redux store
│   │   │   ├── theme/         # Theme configuration
│   │   │   ├── utils/         # Utility functions
│   │   │   └── views/         # Page views
│   │   ├── dist/              # Build output
│   │   ├── package.json
│   │   └── vite.config.ts
│   │
│   └── base-cms-dev/          # Dev dependencies package
│       ├── package.json
│       └── README.md
│
├── package.json               # Root workspace config
├── .npmrc                     # NPM configuration
└── README.md
```

## Publish packages

### Bước 1: Build packages

```bash
npm run build
```

### Bước 2: Publish base-cms-dev trước

```bash
cd packages/base-cms-dev
npm publish --access public
```

### Bước 3: Publish base-cms

```bash
cd packages/base-cms
npm publish --access public
```

## Lợi ích của cấu trúc này

### ✅ Cho người dùng:

- **Đơn giản hóa cài đặt**: Chỉ 2 packages thay vì 20+ packages
- **Đồng bộ version**: Tất cả dev tools luôn tương thích với nhau
- **Package.json gọn gàng**: Không bị rối với hàng chục devDependencies
- **Giảm lỗi**: Không lo xung đột version giữa các dev tools

### ✅ Cho maintainer:

- **Dễ maintain**: Cập nhật dev deps ở 1 nơi duy nhất
- **Version control tốt hơn**: Đảm bảo dev tools luôn compatible
- **Testing dễ dàng**: Test cả 2 packages trong cùng repo

## Ví dụ package.json của dự án người dùng

```json
{
	"name": "my-cms-project",
	"version": "1.0.0",
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

Thay vì:

```json
{
	"name": "my-cms-project",
	"version": "1.0.0",
	"dependencies": {
		"@libeyondea/base-cms": "^1.0.7",
		"react": "^19.2.0",
		"react-dom": "^19.2.0"
		// ... more deps
	},
	"devDependencies": {
		// ❌ Phải khai báo tất cả này
		"typescript": "5.9.3",
		"vite": "7.1.9",
		"eslint": "9.36.0",
		"@vitejs/plugin-react-swc": "4.1.0",
		"prettier": "3.6.2",
		"@types/react": "19.2.0",
		"@types/react-dom": "19.2.0",
		"@types/node": "22.17.1"
		// ... và nhiều package khác
	}
}
```

## Troubleshooting

### Lỗi workspace dependencies

Nếu gặp lỗi `EUNSUPPORTEDPROTOCOL` khi install, đảm bảo:

- Sử dụng npm >= 7.0.0
- File `.npmrc` có config `legacy-peer-deps=true`

### Rebuild packages

```bash
# Xóa node_modules và build lại
rm -rf node_modules packages/*/node_modules packages/*/dist
npm install
npm run build
```

## License

MIT
