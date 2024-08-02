import Link, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import {Typography} from '../../Typography';

interface Props {
	children?: ReactNode;
	href: LinkProps['href'];
}

const NavbarLink = (props: Props): JSX.Element => {
	const {href, children} = props;

	return (
		<Link
			className="group relative pb-1 px-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:rounded-lg after:w-0 after:h-[1px] after:bg-primary-main after:transition-all after:duration-300  hover:after:w-full"
			href={href}
		>
			<Typography
				className="transition-colors duration-300 group-hover:text-primary-main"
				variant="link"
			>
				{children}
			</Typography>
		</Link>
	);
};

export default NavbarLink;
