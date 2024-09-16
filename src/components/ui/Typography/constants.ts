import {ElementType} from 'react';
import {
	Size,
	Weight,
	LetterSpacing,
	TextTransform,
	Align,
	Variant,
	SizeValue,
	WeightValue,
	LetterSpacingValue,
	TextTransformValue,
	TypographyColorValue,
	VariantValue,
	AlignValue,
} from './types';
import {Color as TypographyColor} from '../types';

const VARIANT_TO_ELEMENT_MAPPING: Record<VariantValue, ElementType> = {
	[Variant.H1]: 'h1',
	[Variant.H2]: 'h2',
	[Variant.H3]: 'h3',
	[Variant.H4]: 'h4',
	[Variant.BODY1]: 'p',
	[Variant.BODY2]: 'p',
	[Variant.BODY3]: 'p',
	[Variant.INHERIT]: 'span',
} as const;

const VARIANT_TO_STYLES_MAPPING: Record<
	VariantValue,
	Partial<{
		size: SizeValue;
		weight: WeightValue;
		color: TypographyColorValue;
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
	[Variant.BODY3]: {
		size: 'xs',
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
} as const;

const SIZE_TO_CLASS_NAME_MAPPING: Record<SizeValue, string> = {
	[Size['6XL']]:
		'text-6xl max-lg:text-5xl max-md:text-4xl max-xs:text-3xl max-xxs:text-[1.600rem]',
	[Size['5XL']]:
		'text-5xl max-lg:text-4xl max-md:text-3xl max-xs:text-2xl max-xxs:text-xl',
	[Size['4XL']]:
		'text-4xl max-lg:text-3xl max-md:text-2xl max-xs:text-xl max-xxs:text-lg',
	[Size['2XL']]:
		'text-2xl max-lg:text-xl max-md:text-lg max-xs:text-base max-xxs:text-sm',
	[Size.BASE]: 'text-base max-xs:text-sm max-xxs:text-xs',
	[Size.SM]: 'text-sm max-xs:text-xs',
	[Size.XS]: 'text-xs',
	[Size.INHERIT]: '[font-size:inherit]',
} as const;

const WEIGHT_TO_CLASS_NAME_MAPPING: Record<WeightValue, string> = {
	[Weight.BOLD]: 'font-bold',
	[Weight.SEMIBOLD]: 'font-semibold',
	[Weight.MEDIUM]: 'font-medium',
	[Weight.NORMAL]: 'font-normal',
	[Weight.INHERIT]: '[font-weight:inherit]',
} as const;

const COLOR_TO_CLASS_NAME_MAPPING: Record<TypographyColorValue, string> = {
	[TypographyColor.PRIMARY]: 'text-primary-main',
	[TypographyColor.PRIMARY_TEXT]: 'text-primary-contrastText',
	[TypographyColor.SECONDARY]: 'text-secondary-main',
	[TypographyColor.SECONDARY_TEXT]: 'text-secondary-contrastText',
	[TypographyColor.BACKGROUND]: 'text-background-main',
	[TypographyColor.BACKGROUND_TEXT]: 'text-background-contrastText',
	[TypographyColor.SURFACE]: 'text-surface-main',
	[TypographyColor.SURFACE_TEXT]: 'text-surface-contrastText',
	[TypographyColor.DANGER]: 'text-danger-main',
	[TypographyColor.DANGER_TEXT]: 'text-danger-contrastText',
	[TypographyColor.SUCCESS]: 'text-success-main',
	[TypographyColor.SUCCESS_TEXT]: 'text-success-contrastText',
	[TypographyColor.INFORMATION]: 'text-information-main',
	[TypographyColor.INFORMATION_TEXT]: 'text-information-contrastText',
	[TypographyColor.WARNING]: 'text-warning-main',
	[TypographyColor.WARNING_TEXT]: 'text-warning-contrastText',
	[TypographyColor.INHERIT]: '[color:inherit]',
} as const;

const LETTER_SPACING_TO_CLASS_NAME_MAPPING: Record<LetterSpacingValue, string> =
	{
		[LetterSpacing.WIDEST]: 'tracking-widest',
		[LetterSpacing.WIDER]: 'tracking-wider',
		[LetterSpacing.WIDE]: 'tracking-wide',
		[LetterSpacing.NORMAL]: 'tracking-normal',
		[LetterSpacing.INHERIT]: '[letter-spacing:inherit]',
	} as const;

const TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING: Record<TextTransformValue, string> =
	{
		[TextTransform.UPPERCASE]: 'uppercase',
		[TextTransform.CAPITALIZE]: 'capitalize',
		[TextTransform.LOWERCASE]: 'lowercase',
		[TextTransform.NONE]: 'normal-case',
		[TextTransform.INHERIT]: '[text-transform:inherit]',
	} as const;

const ALIGN_TO_CLASS_NAME_MAPPING: Record<AlignValue, string> = {
	[Align.RIGHT]: 'text-right',
	[Align.CENTER]: 'text-center',
	[Align.LEFT]: 'text-left',
	[Align.INHERIT]: '[text-align:inherit]',
} as const;

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
