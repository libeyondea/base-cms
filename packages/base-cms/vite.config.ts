import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react-swc';
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
			external: [
				'react',
				'react-dom',
				'react-router-dom',
				'react/jsx-runtime',
				'@tanstack/react-query',
				'@tanstack/react-table',
				'@reduxjs/toolkit',
				'react-redux',
				'@mui/material',
				'@mui/icons-material',
				'@mui/system',
				'@mui/x-date-pickers',
				'@emotion/react',
				'@emotion/styled',
				'axios',
				'dayjs',
				'js-cookie',
				'lodash-es',
				'qs',
				'react-big-calendar',
				'react-hook-form',
				'@hookform/resolvers',
				'react-icons',
				'react-number-format',
				'react-toastify',
				'sweetalert2',
				'yup'
			],
			output: {
				globals: {
					react: 'React',
					'react-dom': 'ReactDOM',
					'react-router-dom': 'ReactRouterDOM',
					'react/jsx-runtime': 'ReactJSXRuntime',
					'@tanstack/react-query': 'ReactQuery',
					'@tanstack/react-table': 'ReactTable',
					'@reduxjs/toolkit': 'ReduxToolkit',
					'react-redux': 'ReactRedux',
					'@mui/material': 'MaterialUI',
					'@mui/icons-material': 'MaterialUIIcons',
					'@mui/system': 'MaterialUISystem',
					'@mui/x-date-pickers': 'MaterialUIDatePickers',
					'@emotion/react': 'EmotionReact',
					'@emotion/styled': 'EmotionStyled',
					axios: 'Axios',
					dayjs: 'Dayjs',
					'js-cookie': 'Cookies',
					'lodash-es': 'LodashEs',
					qs: 'Qs',
					'react-big-calendar': 'ReactBigCalendar',
					'react-hook-form': 'ReactHookForm',
					'@hookform/resolvers': 'HookformResolvers',
					'react-icons': 'ReactIcons',
					'react-number-format': 'ReactNumberFormat',
					'react-toastify': 'ReactToastify',
					sweetalert2: 'Swal',
					yup: 'Yup'
				}
			}
		}
	}
});
