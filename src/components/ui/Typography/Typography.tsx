import classNames from 'classnames';
import {ElementType, ForwardedRef, forwardRef, ReactNode} from 'react';

type Variant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'inherit';

type Size = '6xl' | '5xl' | '4xl' | 'xl' | 'base' | 'sm' | 'inherit';

type Weight = 'bold' | 'semibold' | 'medium' | 'normal' | 'inherit';

type Color =
	| 'primary'
	| 'primaryText'
	| 'secondary'
	| 'secondaryText'
	| 'background'
	| 'backgroundText'
	| 'surface'
	| 'surfaceText'
	| 'danger'
	| 'dangerText'
	| 'inherit';

type LetterSpacing = 'widest' | 'wider' | 'wide' | 'inherit';

type TextTransform = 'uppercase' | 'capitalize' | 'inherit';

type Align = 'right' | 'center' | 'inherit';

interface Props {
	className?: string;
	as?: ElementType;
	variant?: Variant;
	size?: Size;
	weight?: Weight;
	color?: Color;
	letterSpacing?: LetterSpacing;
	textTransform?: TextTransform;
	align?: Align;
	truncate?: boolean;
	noWrap?: boolean;
	children?: ReactNode;
}

const STYLES_TO_CLASS_NAMES_MAPPING: {
	size: {[key in Size]: string};
	weight: {[key in Weight]: string};
	color: {[key in Color]: string};
	letterSpacing: {[key in LetterSpacing]: string};
	textTransform: {[key in TextTransform]: string};
	align: {[key in Align]: string};
} = {
	size: {
		'6xl': 'text-6xl',
		'5xl': 'text-5xl',
		'4xl': 'text-4xl',
		xl: 'text-xl',
		base: 'text-base',
		sm: 'text-sm',
		inherit: '[font-size:inherit]',
	},
	weight: {
		bold: 'font-bold',
		semibold: 'font-semibold',
		medium: 'font-medium',
		normal: 'font-normal',
		inherit: '[font-weight:inherit]',
	},
	color: {
		primary: 'text-primary-main',
		primaryText: 'text-primary-contrastText',
		secondary: 'text-secondary-main',
		secondaryText: 'text-secondary-contrastText',
		background: 'text-background-main',
		backgroundText: 'text-background-contrastText',
		surface: 'text-surface-main',
		surfaceText: 'text-surface-contrastText',
		danger: 'text-danger-main',
		dangerText: 'text-danger-contrastText',
		inherit: '[color:inherit]',
	},
	letterSpacing: {
		widest: 'tracking-widest',
		wider: 'tracking-wider',
		wide: 'tracking-wide',
		inherit: '[letter-spacing:inherit]',
	},
	textTransform: {
		uppercase: 'uppercase',
		capitalize: 'capitalize',
		inherit: '[text-transform:inherit]',
	},
	align: {
		right: 'text-right',
		center: 'text-center',
		inherit: '[text-align:inherit]',
	},
};

const VARIANT_TO_ELEMENT_MAPPING: {[key in Variant]: ElementType} = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	body1: 'p',
	body2: 'p',
	inherit: 'span',
};

const VARIANT_TO_STYLES_MAPPING: {
	[key in Variant]: {
		size?: Size;
		weight?: Weight;
		color?: Color;
		letterSpacing?: LetterSpacing;
		textTransform?: TextTransform;
	};
} = {
	h1: {
		size: '6xl',
		weight: 'bold',
		color: 'backgroundText',
	},
	h2: {
		size: '5xl',
		weight: 'bold',
		color: 'backgroundText',
	},
	h3: {
		size: '4xl',
		weight: 'semibold',
		color: 'backgroundText',
	},
	body1: {
		size: 'base',
		weight: 'normal',
		color: 'backgroundText',
	},
	body2: {
		size: 'sm',
		weight: 'normal',
		color: 'backgroundText',
	},
	inherit: {
		size: 'inherit',
		weight: 'inherit',
		color: 'inherit',
		letterSpacing: 'inherit',
	},
};

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

		let {size, weight, color, letterSpacing, textTransform} = props;
		const variantStyles = VARIANT_TO_STYLES_MAPPING[variant];

		size = size ?? variantStyles.size;
		weight = weight ?? variantStyles.weight;
		color = color ?? variantStyles.color;
		letterSpacing = letterSpacing ?? variantStyles.letterSpacing;
		textTransform = textTransform ?? variantStyles.textTransform;

		const sizeClassName = size
			? STYLES_TO_CLASS_NAMES_MAPPING.size[size]
			: undefined;
		const weightClassName = weight
			? STYLES_TO_CLASS_NAMES_MAPPING.weight[weight]
			: undefined;
		const colorClassName = color
			? STYLES_TO_CLASS_NAMES_MAPPING.color[color]
			: undefined;
		const letterSpacingClassName = letterSpacing
			? STYLES_TO_CLASS_NAMES_MAPPING.letterSpacing[letterSpacing]
			: undefined;
		const textTransformClassName = textTransform
			? STYLES_TO_CLASS_NAMES_MAPPING.textTransform[textTransform]
			: undefined;
		const alignClassName = align
			? STYLES_TO_CLASS_NAMES_MAPPING.align[align]
			: undefined;

		return (
			<Element
				ref={ref}
				className={classNames(
					sizeClassName,
					weightClassName,
					colorClassName,
					letterSpacingClassName,
					textTransformClassName,
					alignClassName,
					{truncate, 'text-nowrap': noWrap},
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
