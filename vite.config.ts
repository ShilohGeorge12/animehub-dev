import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [tailwindcss, autoprefixer],
		},
	},
	server: {
		port: 5051,
		// host: '192.168.88.111',
	},
});
