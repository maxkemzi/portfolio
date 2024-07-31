import classNames from 'classnames';
import {ElementType, ReactNode} from 'react';

type Color = 'primary' | 'secondary' | 'background' | 'surface';

type Variant = 'h1' | 'h2' | 'h3' | 'body1' | 'highlight' | 'link' | 'logo';

type Align = 'center' | 'left' | 'right';

interface Props {
	className?: string;
	as?: ElementType;
	color?: Color;
	variant?: Variant;
	align?: Align;
	isUppercase?: boolean;
	children?: ReactNode;
}

const colorToClassMapping: {[key in Color]: string} = {
	primary: 'text-primary-contrastText',
	secondary: 'text-secondary-contrastText',
	background: 'text-background-contrastText',
	surface: 'text-surface-contrastText',
};

const variantToElementMapping: {[key in Variant]: ElementType} = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	body1: 'p',
	highlight: 'span',
	link: 'span',
	logo: 'p',
};

const variantToClassesMapping: {[key in Variant]: string} = {
	h1: 'text-6xl font-bold',
	h2: 'text-5xl font-bold',
	h3: 'text-4xl font-semibold',
	body1: 'text-base font-normal',
	highlight: 'text-primary-main',
	link: 'text-base font-normal uppercase',
	logo: 'text-xl font-bold uppercase tracking-widest',
};

const alignToClassMapping: {[key in Align]: string} = {
	center: 'text-center',
	left: 'text-left',
	right: 'text-right',
};

const Typography = (props: Props): JSX.Element => {
	const {
		className,
		as,
		color = 'background',
		variant = 'body1',
		align = 'left',
		isUppercase = false,
		children,
	} = props;

	const Element = as ?? variantToElementMapping[variant];
	const colorClass = colorToClassMapping[color];
	const variantClasses = variantToClassesMapping[variant];
	const alignClass = alignToClassMapping[align];

	return (
		<Element
			className={classNames(
				colorClass,
				variantClasses,
				alignClass,
				{uppercase: isUppercase},
				className,
			)}
		>
			{children}
		</Element>
	);
};

export default Typography;
