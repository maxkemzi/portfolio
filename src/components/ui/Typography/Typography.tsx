import classNames from 'classnames';
import {ElementType, ForwardedRef, forwardRef, ReactNode} from 'react';

type Color = 'primary' | 'secondary' | 'background' | 'surface' | 'danger';

type Variant =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'body1'
	| 'highlight'
	| 'link'
	| 'logo'
	| 'button'
	| 'inherit';

type Align = 'center' | 'left' | 'right';

interface Props {
	className?: string;
	as?: ElementType;
	color?: Color;
	variant?: Variant;
	align?: Align;
	isUppercase?: boolean;
	truncate?: boolean;
	children?: ReactNode;
}

const COLOR_TO_CLASS_NAME_MAPPING: {[key in Color]: string} = {
	primary: 'text-primary-contrastText',
	secondary: 'text-secondary-contrastText',
	background: 'text-background-contrastText',
	surface: 'text-surface-contrastText',
	danger: 'text-danger-main',
};

const VARIANT_TO_ELEMENT_MAPPING: {[key in Variant]: ElementType} = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	body1: 'p',
	highlight: 'span',
	link: 'span',
	logo: 'p',
	button: 'span',
	inherit: 'span',
};

const VARIANT_TO_CLASS_NAMES_MAPPING: {[key in Variant]: string} = {
	h1: 'text-6xl font-bold',
	h2: 'text-5xl font-bold',
	h3: 'text-4xl font-semibold',
	body1: 'text-base font-normal',
	highlight: 'text-primary-main',
	link: 'text-base font-normal uppercase',
	logo: 'text-xl font-bold uppercase tracking-widest',
	button: 'text-base font-bold uppercase tracking-wider',
	inherit: '',
};

const VARIANT_TO_COLOR_CLASS_NAME_MAPPING: {[key in Variant]: string} = {
	h1: 'text-background-contrastText',
	h2: 'text-background-contrastText',
	h3: 'text-background-contrastText',
	body1: 'text-background-contrastText',
	highlight: 'text-[transparent]',
	link: 'text-background-contrastText',
	logo: 'text-background-contrastText',
	button: 'text-background-contrastText',
	inherit: 'text-[inherit]',
};

const ALIGN_TO_CLASS_NAME_MAPPING: {[key in Align]: string} = {
	center: 'text-center',
	left: 'text-left',
	right: 'text-right',
};

const Typography = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {
			className,
			as,
			color,
			variant = 'body1',
			align = 'left',
			isUppercase,
			truncate,
			children,
		} = props;

		const Element = as ?? VARIANT_TO_ELEMENT_MAPPING[variant];
		const variantClasses = VARIANT_TO_CLASS_NAMES_MAPPING[variant];
		const colorClassNames = color
			? COLOR_TO_CLASS_NAME_MAPPING[color]
			: VARIANT_TO_COLOR_CLASS_NAME_MAPPING[variant];
		const alignClass = ALIGN_TO_CLASS_NAME_MAPPING[align];

		return (
			<Element
				ref={ref}
				className={classNames(
					variantClasses,
					colorClassNames,
					alignClass,
					{uppercase: isUppercase, truncate},
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
