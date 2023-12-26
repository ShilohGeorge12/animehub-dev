import type { Config } from 'tailwindcss';

const config: Config = {
	content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
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
			'iphone_sm': {
				raw: 'screen and (max-width: 375px) and (max-height: 670px), screen and (min-width: 360px) and (max-width: 414px) and (min-height: 736px) and (max-height: 812px), screen and (width: 540px) and (min-height: 710px) and (max-height: 812px)',
			},
			'iphone_md': { raw: 'screen and (min-width: 380px) and (max-width: 400px) and (min-height: 840px) and (max-height: 900px)' },
			'iphone_lg': { raw: 'screen and (min-width: 400px) and (max-width: 440px) and (min-height: 895px) and (max-height: 933px)' },
			'h-md': { raw: 'screen and (min-width: 376px) and (max-width: 430px) and (max-height: 915px) and (min-height: 813px)' },
			'h-md-2': {
				raw: '(min-height: 1024px) and (max-height: 1200px) and (min-width: 630px) and (max-width: 822px)',
			},
			'w-xsm': { raw: 'screen and (max-width: 300px)' },
			'w-lg': { raw: 'screen and (min-width: 1000px) and (min-height: 600px)' },
			'w-xl': { raw: 'screen and (min-width: 1600px) and (min-height: 700px)' },
		},
		scrollbar: ['rounded'],
	},
	plugins: [],
};
export default config;

// iphone_sm: Iphone 8, 6, 7,
// iphone_md: Iphone 12 pro,
// iphone_lg: Iphone Xr, 14 pro max
