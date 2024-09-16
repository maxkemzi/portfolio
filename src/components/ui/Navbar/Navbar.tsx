import {forwardRef, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
	children?: ReactNode;
	listClassName?: string;
}

const Navbar = forwardRef<HTMLElement, Props>((props, ref): JSX.Element => {
	const {className, children, listClassName} = props;

	return (
		<nav ref={ref} className={className}>
			<ul className={twMerge('flex items-center', listClassName)}>
				{children}
			</ul>
		</nav>
	);
});

export default Navbar;
