import path from 'node:path';
import {defineConfig} from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		coverage: {
			provider: 'v8',
			reporter: ['html'],
		},
		environment: 'jsdom',
		setupFiles: './test/setup.ts',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
});
