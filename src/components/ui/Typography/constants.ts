import {
	Size,
	Weight,
	Color,
	LetterSpacing,
	TextTransform,
	Align,
	Variant,
	SizeValue,
	WeightValue,
	ColorValue,
	LetterSpacingValue,
	TextTransformValue,
} from './types';

const VARIANT_TO_ELEMENT_MAPPING: Record<Variant, string> = {
	[Variant.H1]: 'h1',
	[Variant.H2]: 'h2',
	[Variant.H3]: 'h3',
	[Variant.H4]: 'h4',
	[Variant.BODY1]: 'p',
	[Variant.BODY2]: 'p',
	[Variant.INHERIT]: 'span',
};

const VARIANT_TO_STYLES_MAPPING: Record<
	Variant,
	Partial<{
		size: SizeValue;
		weight: WeightValue;
		color: ColorValue;
		letterSpacing: LetterSpacingValue;
		textTransform: TextTransformValue;
	}>
> = {
	[Variant.H1]: {
		size: '6xl',
		weight: 'bold',
		color: 'backgroundText',
		textTransform: 'capitalize',
	},
	[Variant.H2]: {
		size: '5xl',
		weight: 'bold',
		color: 'backgroundText',
		textTransform: 'capitalize',
	},
	[Variant.H3]: {
		size: '4xl',
		weight: 'semibold',
		color: 'backgroundText',
		textTransform: 'capitalize',
	},
	[Variant.H4]: {
		size: '2xl',
		weight: 'semibold',
		color: 'backgroundText',
		textTransform: 'capitalize',
	},
	[Variant.BODY1]: {
		size: 'base',
		weight: 'normal',
		color: 'backgroundText',
	},
	[Variant.BODY2]: {
		size: 'sm',
		weight: 'normal',
		color: 'backgroundText',
	},
	[Variant.INHERIT]: {
		size: 'inherit',
		weight: 'inherit',
		color: 'inherit',
		letterSpacing: 'inherit',
		textTransform: 'inherit',
	},
};

const SIZE_TO_CLASS_NAME_MAPPING: Record<Size, string> = {
	[Size['6XL']]: 'text-6xl',
	[Size['5XL']]: 'text-5xl',
	[Size['4XL']]: 'text-4xl',
	[Size['2XL']]: 'text-2xl',
	[Size.XL]: 'text-xl',
	[Size.BASE]: 'text-base',
	[Size.SM]: 'text-sm',
	[Size.INHERIT]: '[font-size:inherit]',
};

const WEIGHT_TO_CLASS_NAME_MAPPING: Record<Weight, string> = {
	[Weight.BOLD]: 'font-bold',
	[Weight.SEMIBOLD]: 'font-semibold',
	[Weight.MEDIUM]: 'font-medium',
	[Weight.NORMAL]: 'font-normal',
	[Weight.INHERIT]: '[font-weight:inherit]',
};

const COLOR_TO_CLASS_NAME_MAPPING: Record<Color, string> = {
	[Color.PRIMARY]: 'text-primary-main',
	[Color.PRIMARY_TEXT]: 'text-primary-contrastText',
	[Color.SECONDARY]: 'text-secondary-main',
	[Color.SECONDARY_TEXT]: 'text-secondary-contrastText',
	[Color.BACKGROUND]: 'text-background-main',
	[Color.BACKGROUND_TEXT]: 'text-background-contrastText',
	[Color.SURFACE]: 'text-surface-main',
	[Color.SURFACE_TEXT]: 'text-surface-contrastText',
	[Color.DANGER]: 'text-danger-main',
	[Color.DANGER_TEXT]: 'text-danger-contrastText',
	[Color.SUCCESS]: 'text-success-main',
	[Color.SUCCESS_TEXT]: 'text-success-contrastText',
	[Color.INHERIT]: '[color:inherit]',
};

const LETTER_SPACING_TO_CLASS_NAME_MAPPING: Record<LetterSpacing, string> = {
	[LetterSpacing.WIDEST]: 'tracking-widest',
	[LetterSpacing.WIDER]: 'tracking-wider',
	[LetterSpacing.WIDE]: 'tracking-wide',
	[LetterSpacing.NORMAL]: 'tracking-normal',
	[LetterSpacing.INHERIT]: '[letter-spacing:inherit]',
};

const TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING: Record<TextTransform, string> = {
	[TextTransform.UPPERCASE]: 'uppercase',
	[TextTransform.CAPITALIZE]: 'capitalize',
	[TextTransform.LOWERCASE]: 'lowercase',
	[TextTransform.NONE]: 'normal-case',
	[TextTransform.INHERIT]: '[text-transform:inherit]',
};

const ALIGN_TO_CLASS_NAME_MAPPING: Record<Align, string> = {
	[Align.RIGHT]: 'text-right',
	[Align.CENTER]: 'text-center',
	[Align.LEFT]: 'text-left',
	[Align.INHERIT]: '[text-align:inherit]',
};

export {
	VARIANT_TO_ELEMENT_MAPPING,
	VARIANT_TO_STYLES_MAPPING,
	SIZE_TO_CLASS_NAME_MAPPING,
	WEIGHT_TO_CLASS_NAME_MAPPING,
	COLOR_TO_CLASS_NAME_MAPPING,
	LETTER_SPACING_TO_CLASS_NAME_MAPPING,
	TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING,
	ALIGN_TO_CLASS_NAME_MAPPING,
};
