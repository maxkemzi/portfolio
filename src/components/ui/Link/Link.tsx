import NextLink, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
	isExternal?: boolean;
}

const Link = (props: Props): JSX.Element => {
	const {children, href, isExternal = false} = props;

	const externalProps = {target: '_blank', rel: 'noreferrer noopenner'};

	return (
		<NextLink
			className="relative py-2 px-3 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:z-[-1] after:bg-primary-main after:transition-[height,_border-radius] after:delay-[0ms,_300ms] after:duration-300 after:ease-in-out hover:after:h-full hover:after:rounded-lg"
			href={href}
			{...(isExternal ? externalProps : {})}
		>
			<Typography as="span" textTransform="uppercase">
				{children}
			</Typography>
		</NextLink>
	);
};

export default Link;
