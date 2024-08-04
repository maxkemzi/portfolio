import NextLink, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
}

const Link = (props: Props): JSX.Element => {
	const {children, href} = props;

	return (
		<NextLink
			className="relative py-1 px-2 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:z-[-1] after:bg-primary-main after:transition-[height,_border-radius] after:delay-[0ms,_300ms] after:duration-500 after:ease-in-out hover:after:h-full hover:after:rounded-lg"
			href={href}
		>
			<Typography isUppercase>{children}</Typography>
		</NextLink>
	);
};

export default Link;
