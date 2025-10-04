# 🛠️ @libeyondea/base-cms-dev

> Package tổng hợp tất cả development dependencies cần thiết cho việc phát triển với `@libeyondea/base-cms`. Thay vì cài đặt 20+ dev packages riêng lẻ, bạn chỉ cần cài một package duy nhất này.

[![npm version](https://img.shields.io/npm/v/@libeyondea/base-cms-dev.svg)](https://www.npmjs.com/package/@libeyondea/base-cms-dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Cài đặt](#-cài-đặt)
- [Lợi ích](#-lợi-ích)
- [Dependencies bao gồm](#-dependencies-bao-gồm)
- [Cách sử dụng](#-cách-sử-dụng)
- [Configuration Examples](#-configuration-examples)
- [Troubleshooting](#-troubleshooting)
- [License](#-license)

## 🎯 Giới thiệu

**@libeyondea/base-cms-dev** là một meta-package (dependency bundler) được thiết kế để đơn giản hóa quá trình setup development environment cho các project sử dụng `@libeyondea/base-cms`.

### ❓ Tại sao cần package này?

**Vấn đề**: Khi phát triển với `@libeyondea/base-cms`, bạn cần cài đặt rất nhiều dev dependencies:

```bash
# Cách cũ - phải cài 20+ packages
npm install --save-dev typescript vite @vitejs/plugin-react-swc
npm install --save-dev eslint prettier @types/react @types/node
npm install --save-dev vite-plugin-dts @rollup/plugin-terser
npm install --save-dev @types/js-cookie @types/lodash-es @types/qs
# ... và còn nhiều nữa
```

**Giải pháp**: Chỉ cần một dòng lệnh duy nhất:

```bash
npm install --save-dev @libeyondea/base-cms-dev
```

## 📦 Cài đặt

### Cài đặt cùng với base-cms (Khuyến nghị)

```bash
# Cài đặt library chính
npm install @libeyondea/base-cms

# Cài đặt dev dependencies
npm install --save-dev @libeyondea/base-cms-dev

# Cài đặt peer dependencies
npm install react@19.2.0 react-dom@19.2.0 react-router-dom@7.9.3
```

### Cài đặt riêng lẻ (Không khuyến nghị)

Nếu vì lý do nào đó bạn không muốn dùng package này, bạn có thể cài từng dependency:

<details>
<summary><b>Xem danh sách đầy đủ cần cài</b></summary>

```bash
# Build Tools
npm install --save-dev typescript@5.9.3
npm install --save-dev vite@7.1.9
npm install --save-dev @vitejs/plugin-react-swc@4.1.0
npm install --save-dev vite-plugin-dts@4.5.4

# Rollup Plugins
npm install --save-dev @rollup/plugin-terser@0.4.4
npm install --save-dev rollup-plugin-visualizer@6.0.4

# Linting & Formatting
npm install --save-dev eslint@9.36.0
npm install --save-dev @eslint/js@9.36.0
npm install --save-dev typescript-eslint@8.45.0
npm install --save-dev eslint-plugin-react-hooks@6.1.0
npm install --save-dev eslint-plugin-react-refresh@0.4.23
npm install --save-dev prettier@3.6.2
npm install --save-dev @trivago/prettier-plugin-sort-imports@5.2.2

# Type Definitions
npm install --save-dev @types/js-cookie@3.0.6
npm install --save-dev @types/lodash-es@4.17.12
npm install --save-dev @types/qs@6.14.0
npm install --save-dev @types/react-big-calendar@1.16.3

# Utilities
npm install --save-dev globals@16.4.0
```

</details>

> ⚠️ **Không khuyến nghị** cài thủ công vì dễ sai phiên bản và mất thời gian.

## ✨ Lợi ích

### 1. **Simplified Installation**

❌ **Trước:**

```json
{
	"devDependencies": {
		"typescript": "5.9.3",
		"vite": "7.1.9",
		"@vitejs/plugin-react-swc": "4.1.0",
		"eslint": "9.36.0",
		"prettier": "3.6.2",
		"@types/react": "19.2.0",
		"@types/node": "22.17.1",
		"@types/js-cookie": "3.0.6",
		"@types/lodash-es": "4.17.12",
		"@types/qs": "6.14.0",
		"@types/react-big-calendar": "1.16.3",
		"vite-plugin-dts": "4.5.4",
		"@rollup/plugin-terser": "0.4.4",
		"rollup-plugin-visualizer": "6.0.4",
		"@eslint/js": "9.36.0",
		"typescript-eslint": "8.45.0",
		"eslint-plugin-react-hooks": "6.1.0",
		"eslint-plugin-react-refresh": "0.4.23",
		"@trivago/prettier-plugin-sort-imports": "5.2.2",
		"globals": "16.4.0"
	}
}
```

✅ **Bây giờ:**

```json
{
	"devDependencies": {
		"@libeyondea/base-cms-dev": "^1.0.12"
	}
}
```

### 2. **Version Consistency**

- ✅ Tất cả dev tools được test cùng nhau
- ✅ Không lo xung đột phiên bản
- ✅ Đảm bảo compatibility 100%
- ✅ Không cần research phiên bản nào tương thích

### 3. **Easier Updates**

```bash
# Cập nhật tất cả dev tools với một lệnh
npm update @libeyondea/base-cms-dev
```

Thay vì phải update từng package:

```bash
npm update typescript
npm update vite
npm update eslint
# ... 17 packages nữa
```

### 4. **Cleaner package.json**

Project của bạn sẽ có `package.json` gọn gàng, dễ đọc và dễ maintain.

### 5. **Zero Configuration**

Tất cả dependencies đã được chọn lọc và test kỹ, bạn không cần phải:

- ❌ Research xem cần tools gì
- ❌ Check compatibility giữa các versions
- ❌ Đọc docs của 20+ packages
- ✅ Chỉ cần cài và dùng!

## 📦 Dependencies bao gồm

### 🏗️ Build Tools

| Package                      | Version | Mục đích                         |
| ---------------------------- | ------- | -------------------------------- |
| **typescript**               | 5.9.3   | TypeScript compiler              |
| **vite**                     | 7.1.9   | Build tool & dev server          |
| **@vitejs/plugin-react-swc** | 4.1.0   | Vite plugin cho React với SWC    |
| **vite-plugin-dts**          | 4.5.4   | Generate TypeScript declarations |

### 📦 Rollup Plugins

| Package                      | Version | Mục đích                          |
| ---------------------------- | ------- | --------------------------------- |
| **@rollup/plugin-terser**    | 0.4.4   | Minification cho production build |
| **rollup-plugin-visualizer** | 6.0.4   | Visualize bundle size             |

### 🎨 Linting & Formatting

| Package                                   | Version | Mục đích                       |
| ----------------------------------------- | ------- | ------------------------------ |
| **eslint**                                | 9.36.0  | JavaScript/TypeScript linter   |
| **@eslint/js**                            | 9.36.0  | ESLint JavaScript configs      |
| **typescript-eslint**                     | 8.45.0  | TypeScript ESLint plugin       |
| **eslint-plugin-react-hooks**             | 6.1.0   | ESLint rules cho React Hooks   |
| **eslint-plugin-react-refresh**           | 0.4.23  | ESLint rules cho React Refresh |
| **prettier**                              | 3.6.2   | Code formatter                 |
| **@trivago/prettier-plugin-sort-imports** | 5.2.2   | Auto-sort imports              |

### 📝 Type Definitions

| Package                       | Version | Mục đích                     |
| ----------------------------- | ------- | ---------------------------- |
| **@types/js-cookie**          | 3.0.6   | Types cho js-cookie          |
| **@types/lodash-es**          | 4.17.12 | Types cho lodash-es          |
| **@types/qs**                 | 6.14.0  | Types cho qs                 |
| **@types/react-big-calendar** | 1.16.3  | Types cho react-big-calendar |

### 🔧 Utilities

| Package     | Version | Mục đích                     |
| ----------- | ------- | ---------------------------- |
| **globals** | 16.4.0  | Global variables definitions |

## 🚀 Cách sử dụng

### 1. Sau khi cài đặt

Tất cả dev dependencies đã sẵn sàng sử dụng trong project của bạn. Bạn không cần làm gì thêm!

### 2. TypeScript

Tạo file `tsconfig.json`:

```json
{
	"compilerOptions": {
		"target": "ES2020",
		"useDefineForClassFields": true,
		"lib": ["ES2020", "DOM", "DOM.Iterable"],
		"module": "ESNext",
		"skipLibCheck": true,

		/* Bundler mode */
		"moduleResolution": "bundler",
		"allowImportingTsExtensions": true,
		"resolveJsonModule": true,
		"isolatedModules": true,
		"noEmit": true,
		"jsx": "react-jsx",

		/* Linting */
		"strict": true,
		"noUnusedLocals": true,
		"noUnusedParameters": true,
		"noFallthroughCasesInSwitch": true
	},
	"include": ["src"],
	"references": [{ "path": "./tsconfig.node.json" }]
}
```

### 3. ESLint

Tạo file `eslint.config.js`:

```javascript
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		files: ['**/*.{ts,tsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			'react-hooks': reactHooks,
			'react-refresh': reactRefresh
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
		}
	}
);
```

### 4. Prettier

Tạo file `.prettierrc`:

```json
{
	"semi": true,
	"trailingComma": "es5",
	"singleQuote": true,
	"printWidth": 120,
	"tabWidth": 2,
	"useTabs": true,
	"importOrder": ["^react", "^@?\\w", "^~/", "^[./]"],
	"importOrderSeparation": true,
	"importOrderSortSpecifiers": true,
	"plugins": ["@trivago/prettier-plugin-sort-imports"]
}
```

### 5. Vite Config

Tạo file `vite.config.ts`:

```typescript
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		react(),
		dts({
			include: ['src'],
			outDir: 'dist',
			insertTypesEntry: true
		})
	],
	resolve: {
		alias: {
			'~': path.resolve(__dirname, 'src')
		}
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/index.ts'),
			name: 'MyLibrary',
			fileName: (format) => `my-library.${format}.js`,
			formats: ['es', 'cjs']
		},
		rollupOptions: {
			external: ['react', 'react-dom'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM'
				}
			}
		}
	}
});
```

### 6. Package.json Scripts

Thêm scripts vào `package.json`:

```json
{
	"scripts": {
		"dev": "vite",
		"build": "tsc && vite build",
		"lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
		"lint:fix": "eslint . --ext ts,tsx --fix",
		"format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json,css,md}\"",
		"preview": "vite preview",
		"type-check": "tsc --noEmit"
	}
}
```

### 7. Sử dụng trong Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Format code
npm run format

# Type check
npm run type-check
```

## 📁 Configuration Examples

### Full Project Setup

Cấu trúc thư mục đề xuất:

```
my-project/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.ts
├── .prettierrc
├── .prettierignore
├── eslint.config.js
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── package.json
└── README.md
```

### .prettierignore

```
# Build outputs
dist
build
coverage

# Dependencies
node_modules

# Config files
*.config.js
*.config.ts

# Generated files
*.d.ts
```

### .eslintignore

```
dist
node_modules
*.config.js
*.config.ts
```

## 🔍 Troubleshooting

### Lỗi: "Cannot find module 'typescript'"

**Nguyên nhân**: TypeScript chưa được cài đặt hoặc cài sai scope.

**Giải pháp**:

```bash
# Xóa node_modules và reinstall
rm -rf node_modules package-lock.json
npm install
```

### Lỗi: ESLint không hoạt động

**Nguyên nhân**: Thiếu file config hoặc config sai.

**Giải pháp**: Đảm bảo có file `eslint.config.js` với config đúng (xem phần [Configuration Examples](#-configuration-examples)).

### Lỗi: Prettier không format

**Nguyên nhân**: Thiếu file `.prettierrc`.

**Giải pháp**: Tạo file `.prettierrc` với config (xem phần trên).

### Lỗi: Build failed với Vite

**Nguyên nhân**: Config Vite chưa đúng.

**Giải pháp**: Kiểm tra lại `vite.config.ts`, đảm bảo:

- ✅ Đã import đúng plugins
- ✅ External dependencies được khai báo đúng
- ✅ Entry file tồn tại

### Warning: Peer dependencies

Nếu bạn thấy warnings về peer dependencies:

```bash
npm WARN @libeyondea/base-cms-dev requires a peer of react@19.2.0
```

**Giải pháp**: Cài đặt peer dependencies:

```bash
npm install react@19.2.0 react-dom@19.2.0
```

## 📊 Bundle Size

Package này chỉ là meta-package (bundle dependencies), không có code thực tế. Tất cả dependencies chỉ được cài trong `node_modules` và **không** ảnh hưởng đến bundle size của production build.

| Environment     | Impact                                         |
| --------------- | ---------------------------------------------- |
| **Development** | ~200MB trong `node_modules` (tất cả dev tools) |
| **Production**  | 0 KB (không được include trong bundle)         |

## 🔄 Version History

### v1.0.12 (Current)

- ✅ TypeScript 5.9.3
- ✅ Vite 7.1.9
- ✅ ESLint 9.36.0
- ✅ Prettier 3.6.2
- ✅ All type definitions updated

### Migration từ manual installation

Nếu bạn đang dùng manual installation (cài từng package), migrate sang package này:

```bash
# 1. Xóa tất cả dev dependencies cũ khỏi package.json
# 2. Cài package mới
npm install --save-dev @libeyondea/base-cms-dev

# 3. Clean install
rm -rf node_modules package-lock.json
npm install
```

## 💡 Best Practices

### 1. Luôn dùng version cụ thể

```json
{
	"devDependencies": {
		"@libeyondea/base-cms-dev": "1.0.12"
	}
}
```

Thay vì dùng `^1.0.12` để tránh unexpected updates.

### 2. Update định kỳ

```bash
# Check version mới
npm outdated @libeyondea/base-cms-dev

# Update
npm update @libeyondea/base-cms-dev
```

### 3. Commit lock file

Luôn commit `package-lock.json` để đảm bảo team sử dụng cùng versions.

### 4. CI/CD Setup

Trong CI/CD pipeline:

```yaml
# .github/workflows/ci.yml
- name: Install dependencies
  run: npm ci # Dùng 'ci' thay vì 'install'
```

## 📄 License

MIT License - xem file [LICENSE](./LICENSE) để biết thêm chi tiết.

## 👨‍💻 Tác giả

**Nguyen Thuc**

- GitHub: [@libeyondea](https://github.com/libeyondea)
- Twitter: [@libeyondea](https://twitter.com/libeyondea)

## 🔗 Liên kết

- 📦 [NPM Package - @libeyondea/base-cms-dev](https://www.npmjs.com/package/@libeyondea/base-cms-dev)
- 📦 [NPM Package - @libeyondea/base-cms](https://www.npmjs.com/package/@libeyondea/base-cms)
- 🐙 [GitHub Repository](https://github.com/libeyondea/base-cms)
- 📝 [Changelog](https://github.com/libeyondea/base-cms/releases)

## 🤝 Related Packages

- **[@libeyondea/base-cms](https://www.npmjs.com/package/@libeyondea/base-cms)** - Main library package
- **[Root README](../../README.md)** - Monorepo overview

## ❓ FAQ

### Q: Tôi có bị lock vào các versions cụ thể không?

**A**: Có, nhưng đó là điều tốt! Tất cả versions đã được test kỹ và đảm bảo hoạt động cùng nhau. Khi có version mới, chúng tôi sẽ test và release version mới của package.

### Q: Tôi có thể override một dependency cụ thể không?

**A**: Có, bạn có thể install version khác trong project của bạn, npm sẽ ưu tiên version gần nhất:

```bash
npm install --save-dev typescript@5.10.0
```

Tuy nhiên, **không khuyến nghị** vì có thể gây xung đột.

### Q: Package này có tương thích với monorepo không?

**A**: Có, hoạt động hoàn hảo với npm workspaces, yarn workspaces, pnpm workspaces, và Lerna.

### Q: Tôi có thể dùng package này cho project không phải Base CMS không?

**A**: Có, package này chứa các dev tools phổ biến cho bất kỳ React/TypeScript project nào. Tuy nhiên, nó được optimize cho Base CMS.

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/libeyondea">Nguyen Thuc</a></sub>
</div>
