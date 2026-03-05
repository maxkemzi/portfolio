import type {Config} from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';
import {ThemeColor} from './src/constants';

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
				grid: 'linear-gradient(to right, rgb(26, 25, 30) 1px, transparent 1px), linear-gradient(to bottom, rgba(26, 25, 30) 1px, transparent 1px)',
			},
		},
		colors: {
			transparent: 'transparent',
			primary: {
				main: ThemeColor.PRIMARY.MAIN,
				contrastText: ThemeColor.PRIMARY.CONTRAST_TEXT,
			},
			background: {
				main: ThemeColor.BACKGROUND.MAIN,
				contrastText: ThemeColor.BACKGROUND.CONTRAST_TEXT,
			},
			surface: {
				main: ThemeColor.SURFACE.MAIN,
				light: ThemeColor.SURFACE.LIGHT,
				contrastText: ThemeColor.SURFACE.CONTRAST_TEXT,
			},
			danger: {
				main: ThemeColor.DANGER.MAIN,
				dark: ThemeColor.DANGER.DARK,
				contrastText: ThemeColor.DANGER.CONTRAST_TEXT,
			},
			success: {
				main: ThemeColor.SUCCESS.MAIN,
				dark: ThemeColor.SUCCESS.DARK,
				contrastText: ThemeColor.SUCCESS.CONTRAST_TEXT,
			},
			warning: {
				main: ThemeColor.WARNING.MAIN,
				dark: ThemeColor.WARNING.DARK,
				contrastText: ThemeColor.WARNING.CONTRAST_TEXT,
			},
			information: {
				main: ThemeColor.INFORMATION.MAIN,
				dark: ThemeColor.INFORMATION.DARK,
				contrastText: ThemeColor.INFORMATION.CONTRAST_TEXT,
			},
		},
		screens: {
			xxs: '365px',
			xs: '480px',
			...defaultTheme.screens,
		},
	},
	plugins: [],
};
export default config;
