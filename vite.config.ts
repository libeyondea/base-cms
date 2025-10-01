import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react()
		// dts({
		// 	include: ['src'],
		// 	insertTypesEntry: true,
		// 	copyDtsFiles: true,
		// 	compilerOptions: {
		// 		declaration: true,
		// 		declarationMap: false,
		// 		emitDeclarationOnly: true,
		// 		noEmit: false
		// 	}
		// })
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
					'@mui/material': 'MaterialUI',
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
