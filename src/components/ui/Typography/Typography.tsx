import {ElementType, ForwardedRef, forwardRef, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import {
	ALIGN_TO_CLASS_NAME_MAPPING,
	COLOR_TO_CLASS_NAME_MAPPING,
	LETTER_SPACING_TO_CLASS_NAME_MAPPING,
	SIZE_TO_CLASS_NAME_MAPPING,
	TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING,
	VARIANT_TO_ELEMENT_MAPPING,
	VARIANT_TO_STYLES_MAPPING,
	WEIGHT_TO_CLASS_NAME_MAPPING,
} from './constants';
import {
	VariantValue,
	SizeValue,
	WeightValue,
	ColorValue,
	LetterSpacingValue,
	TextTransformValue,
	AlignValue,
} from './types';

interface Props {
	className?: string;
	as?: ElementType;
	variant?: VariantValue;
	size?: SizeValue;
	weight?: WeightValue;
	color?: ColorValue;
	letterSpacing?: LetterSpacingValue;
	textTransform?: TextTransformValue;
	align?: AlignValue;
	truncate?: boolean;
	noWrap?: boolean;
	children?: ReactNode;
}

const Typography = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {
			className,
			as,
			variant = 'body1',
			align,
			truncate,
			noWrap,
			children,
		} = props;

		const Element = as ?? VARIANT_TO_ELEMENT_MAPPING[variant];

		const variantStyles = VARIANT_TO_STYLES_MAPPING[variant];

		let {size, weight, color, letterSpacing, textTransform} = props;
		size = size ?? variantStyles.size;
		weight = weight ?? variantStyles.weight;
		color = color ?? variantStyles.color;
		letterSpacing = letterSpacing ?? variantStyles.letterSpacing;
		textTransform = textTransform ?? variantStyles.textTransform;

		return (
			<Element
				ref={ref}
				className={twMerge(
					size && SIZE_TO_CLASS_NAME_MAPPING[size],
					weight && WEIGHT_TO_CLASS_NAME_MAPPING[weight],
					color && COLOR_TO_CLASS_NAME_MAPPING[color],
					letterSpacing &&
						LETTER_SPACING_TO_CLASS_NAME_MAPPING[letterSpacing],
					textTransform &&
						TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING[textTransform],
					align && ALIGN_TO_CLASS_NAME_MAPPING[align],
					truncate && 'truncate',
					noWrap && 'text-nowrap',
					className,
				)}
			>
				{children}
			</Element>
		);
	},
);

export type {Props as TypographyProps};
export default Typography;
