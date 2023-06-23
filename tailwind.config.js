/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			animation: {
				text: 'text 5s ease infinite',
				slide: 'slide 20s ease infinite',
				rotate: 'spin 2s ease-in-out infinite',
			},
			blur: {
				xs: '1.5px',
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
				silde: {
					'0%': {
						transform: 'translateX(0)',
					},
					'100%': {
						transform: 'translateX(-100%)',
					},
				},
			},
			fontFamily: {
				poppins: ['Poppins', 'sans-serif'],
			},
		},
		screens: {
			'xsm': '300px',
			'se': '375px',
			'xs': '390px',
			'xr': '414px',
			'sm': '640px',
			'md': '768px',
			'lmd': '820px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		scrollbar: ['rounded'],
	},
	plugins: [],
};
