import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react-swc';
import fs from 'fs';
import path from 'path';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		terser(),
		// visualizer({ filename: 'dist/stats.html', gzipSize: true, brotliSize: true }),
		dts({
			include: ['src'],
			outDir: 'dist',
			insertTypesEntry: true,
			copyDtsFiles: true,
			tsconfigPath: './tsconfig.build.json'
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
			name: 'BaseCms',
			fileName: (format) => `base-cms.${format}.js`,
			formats: ['es']
		},
		rollupOptions: {
			external: (() => {
				try {
					const pkgPath = path.resolve(__dirname, 'package.json');
					const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8')) as {
						dependencies?: Record<string, string>;
						peerDependencies?: Record<string, string>;
					};
					const deps = Object.keys(pkg.dependencies || {});
					const peerDeps = Object.keys(pkg.peerDependencies || {});
					const addOns = deps.includes('react') || peerDeps.includes('react') ? ['react/jsx-runtime'] : [];
					return Array.from(new Set([...deps, ...peerDeps, ...addOns]));
				} catch (_) {
					// Fallback: no externals if package.json cannot be read
					return [];
				}
			})()
		}
	}
});
