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
			className="group relative pb-1.5 after:content-[''] after:absolute after:bottom-0 after:right-0 after:rounded-lg after:w-0 after:h-[2px] after:bg-primary-main after:transition-all after:duration-500 after:ease-in-out  hover:after:w-full hover:after:left-0"
			href={href}
		>
			<Typography
				className="transition-colors duration-500 ease-in-out group-hover:text-primary-main"
				variant="link"
			>
				{children}
			</Typography>
		</Link>
	);
};

export default NavbarLink;
