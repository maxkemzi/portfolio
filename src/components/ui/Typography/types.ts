import {Color} from '../types';

const Variant = {
	H1: 'h1',
	H2: 'h2',
	H3: 'h3',
	H4: 'h4',
	BODY1: 'body1',
	BODY2: 'body2',
	BODY3: 'body3',
	INHERIT: 'inherit',
} as const;
type VariantValue = (typeof Variant)[keyof typeof Variant];

const Size = {
	'6XL': '6xl',
	'5XL': '5xl',
	'4XL': '4xl',
	'2XL': '2xl',
	XL: 'xl',
	BASE: 'base',
	SM: 'sm',
	XS: 'xs',
	INHERIT: 'inherit',
} as const;
type SizeValue = (typeof Size)[keyof typeof Size];

const Weight = {
	BOLD: 'bold',
	SEMIBOLD: 'semibold',
	MEDIUM: 'medium',
	NORMAL: 'normal',
	INHERIT: 'inherit',
} as const;
type WeightValue = (typeof Weight)[keyof typeof Weight];

const TypographyColor = Color;
type TypographyColorValue =
	(typeof TypographyColor)[keyof typeof TypographyColor];

const LetterSpacing = {
	WIDEST: 'widest',
	WIDER: 'wider',
	WIDE: 'wide',
	NORMAL: 'normal',
	INHERIT: 'inherit',
} as const;
type LetterSpacingValue = (typeof LetterSpacing)[keyof typeof LetterSpacing];

const TextTransform = {
	UPPERCASE: 'uppercase',
	CAPITALIZE: 'capitalize',
	LOWERCASE: 'lowercase',
	NONE: 'none',
	INHERIT: 'inherit',
} as const;
type TextTransformValue = (typeof TextTransform)[keyof typeof TextTransform];

const Align = {
	RIGHT: 'right',
	CENTER: 'center',
	LEFT: 'left',
	INHERIT: 'inherit',
} as const;
type AlignValue = (typeof Align)[keyof typeof Align];

export {
	Variant,
	Size,
	Weight,
	TypographyColor,
	LetterSpacing,
	TextTransform,
	Align,
};
export type {
	VariantValue,
	SizeValue,
	WeightValue,
	TypographyColorValue,
	LetterSpacingValue,
	TextTransformValue,
	AlignValue,
};
