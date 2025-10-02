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
			formats: ['es', 'umd']
		},
		rollupOptions: {
			external: [
				'react',
				'react-dom',
				'react/jsx-runtime',
				'@mui/material',
				'@mui/icons-material',
				'@emotion/react',
				'@emotion/styled',
				'@reduxjs/toolkit',
				'react-redux',
				'react-router-dom'
			],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react/jsx-runtime': 'ReactJSXRuntime',
					'@mui/material': 'MaterialUI',
					'@mui/icons-material': 'MaterialUIIcons',
					'@emotion/react': 'EmotionReact',
					'@emotion/styled': 'EmotionStyled',
					'@reduxjs/toolkit': 'ReduxToolkit',
					'react-redux': 'ReactRedux',
					'react-router-dom': 'ReactRouterDOM'
				}
			}
		}
	}
});
