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
				grid: 'linear-gradient(to right, rgba(113, 113, 113, 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(113, 113, 113, 0.07) 1px, transparent 1px)',
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
			danger: {
				main: Color.DANGER.MAIN,
				contrastText: Color.DANGER.CONTRAST_TEXT,
			},
		},
	},
	plugins: [],
};
export default config;
