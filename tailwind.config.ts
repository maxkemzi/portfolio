import type {Config} from 'tailwindcss';
import {Color} from './src/constants';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
		colors: {
			primary: {
				main: Color.PRIMARY.MAIN,
				contrastText: Color.PRIMARY.CONTRAST_TEXT,
			},
			secondary: {
				main: Color.SECONDARY.MAIN,
				contrastText: Color.SECONDARY.CONTRAST_TEXT,
			},
			background: {
				main: Color.BACKGROUND.MAIN,
				contrastText: Color.BACKGROUND.CONTRAST_TEXT,
			},
			surface: {
				main: Color.SURFACE.MAIN,
				contrastText: Color.SURFACE.CONTRAST_TEXT,
			},
		},
	},
	plugins: [],
};
export default config;
