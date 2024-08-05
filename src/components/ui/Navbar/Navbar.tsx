import {forwardRef, ReactNode} from 'react';

interface Props {
	className?: string;
	children?: ReactNode;
}

const Navbar = forwardRef<HTMLElement, Props>((props, ref): JSX.Element => {
	const {className, children} = props;

	return (
		<nav ref={ref} className={className}>
			<ul className="flex items-center">{children}</ul>
		</nav>
	);
});

export default Navbar;
