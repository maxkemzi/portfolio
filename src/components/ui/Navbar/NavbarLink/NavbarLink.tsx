import Link, {LinkProps} from 'next/link';
import {ReactNode} from 'react';
import {Typography} from '../../Typography';

interface Props {
	href: LinkProps['href'];
	children?: ReactNode;
}

const NavbarLink = (props: Props): JSX.Element => {
	const {href, children} = props;

	return (
		<Link
			className="group inline-block relative pb-2 px-3.5 after:content-[''] after:absolute after:bottom-0 after:left-[50%] after:translate-x-[-50%] after:rounded-lg after:w-0 after:h-[1px] after:bg-primary-main after:transition-all after:duration-300 after:ease-out hover:after:w-[100%]"
			href={href}
		>
			<Typography
				className="transition-colors duration-300 ease-in-out group-hover:text-primary-main"
				variant="link"
			>
				{children}
			</Typography>
		</Link>
	);
};

export default NavbarLink;
