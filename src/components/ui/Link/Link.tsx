import NextLink, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import classNames from 'classnames';
import {Typography, TypographyProps} from '../Typography';

type Variant = 'underline' | 'block';

interface Props {
	className?: string;
	children?: ReactNode;
	href: LinkProps['href'];
	external?: boolean;
	variant?: Variant;
}

const VARIANT_TO_CLASS_NAMES_MAPPING: {[key in Variant]: string} = {
	underline:
		'pb-1 border-b border-transparent ease-out transition-color duration-300 hover:border-primary-main',
	block: "relative py-2 px-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:z-[-1] after:bg-primary-main after:transition-[height,_border-radius] after:delay-[0ms,_300ms] after:duration-300 after:ease-out hover:after:h-full hover:after:rounded-lg",
};

const VARIANT_TO_COLOR_MAPPING: {[key in Variant]: TypographyProps['color']} = {
	underline: 'primary',
	block: 'backgroundText',
};

const VARIANT_TO_TEXT_TRANSFORM_MAPPING: {
	[key in Variant]: TypographyProps['textTransform'];
} = {
	underline: 'inherit',
	block: 'uppercase',
};

const Link = (props: Props): JSX.Element => {
	const {className, children, href, external, variant = 'underline'} = props;

	const variantClassNames = VARIANT_TO_CLASS_NAMES_MAPPING[variant];

	const externalProps = {target: '_blank', rel: 'noreferrer noopenner'};

	const color = VARIANT_TO_COLOR_MAPPING[variant];
	const textTransform = VARIANT_TO_TEXT_TRANSFORM_MAPPING[variant];

	return (
		<NextLink
			className={classNames(variantClassNames, className)}
			href={href}
			{...(external ? externalProps : {})}
		>
			<Typography color={color} textTransform={textTransform} as="span">
				{children}
			</Typography>
		</NextLink>
	);
};

export default Link;
