import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
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
			external: ['react', 'react-dom', 'react-router-dom', 'react/jsx-runtime'],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react-router-dom': 'ReactRouterDOM',
					'react/jsx-runtime': 'ReactJSXRuntime'
				}
			}
		}
	}
});
