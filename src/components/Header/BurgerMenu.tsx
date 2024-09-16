import {ForwardedRef, forwardRef, MouseEventHandler} from 'react';
import {twMerge} from 'tailwind-merge';
import HeaderNavbar from './HeaderNavbar';
import SocialList from './SocialList';

interface Props {
	className?: string;
	onNavbarLinkClick?: MouseEventHandler;
}

const BurgerMenu = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLDivElement>) => {
		const {className, onNavbarLinkClick} = props;

		return (
			<div
				ref={ref}
				className={twMerge(
					'fixed top-0 left-0 w-screen h-screen py-20 px-4 bg-background-main',
					className,
				)}
			>
				<div className="flex flex-col items-center gap-8">
					<HeaderNavbar
						listClassName="flex-col gap-6"
						onLinkClick={onNavbarLinkClick}
					/>
					<SocialList />
				</div>
			</div>
		);
	},
);

export default BurgerMenu;
