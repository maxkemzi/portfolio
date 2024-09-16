'use client';

import {Anchor} from '@/constants';
import {ForwardedRef, forwardRef, RefObject, useEffect, useState} from 'react';
import Link from 'next/link';
import {twJoin} from 'tailwind-merge';
import {AnimatePresence, motion, Transition} from 'framer-motion';
import {Container, Logo} from '../ui';
import BurgerMenu from './BurgerMenu';
import BurgerMenuButton from './BurgerMenuButton';
import HeaderNavbar from './HeaderNavbar';
import SocialList from './SocialList';

type Position = 'absolute' | 'fixed' | 'relative';

interface Props {
	rightBlockRef?: RefObject<HTMLDivElement>;
	position?: Position;
	blurred?: boolean;
	bordered?: boolean;
}

const MotionBurgerMenu = motion(BurgerMenu);
const BURGER_MENU_TRANSITION_CONFIG: Transition = {
	duration: 0.5,
	ease: 'easeOut',
};

const Header = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {rightBlockRef, position = 'absolute', blurred, bordered} = props;

		const [menuIsOpen, setMenuIsOpen] = useState(false);

		const toggleMenuIsOpen = () => setMenuIsOpen(prev => !prev);
		const closeMenu = () => setMenuIsOpen(false);

		useEffect(() => {
			const disableScrollWhenMenuIsOpen = () => {
				document.documentElement.style.overflowY = menuIsOpen
					? 'hidden'
					: 'unset';
			};
			disableScrollWhenMenuIsOpen();
		}, [menuIsOpen]);

		return (
			<header
				ref={ref}
				className={twJoin(
					'z-30 py-5 max-md:py-4',
					position === 'absolute' && 'absolute top-0 left-0 right-0',
					position === 'fixed' && 'fixed top-0 left-0 right-0',
					position === 'relative' && 'relative',
					blurred && 'shadow-lg backdrop-blur',
					bordered && 'border-b border-surface-main',
				)}
			>
				<Container size="lg">
					<div className="flex items-center justify-between gap-7">
						<Link className="z-50" href={`/#${Anchor.HERO}`}>
							<Logo />
						</Link>
						<div ref={rightBlockRef} className="max-md:z-50">
							<div className="flex items-center gap-3.5 max-md:hidden">
								<HeaderNavbar />
								<SocialList />
							</div>
							<BurgerMenuButton
								className="md:hidden"
								onClick={toggleMenuIsOpen}
								active={menuIsOpen}
							/>
						</div>
						<AnimatePresence>
							{menuIsOpen ? (
								<MotionBurgerMenu
									className="z-40"
									initial={{opacity: 0}}
									animate={{opacity: 1}}
									exit={{opacity: 0}}
									transition={BURGER_MENU_TRANSITION_CONFIG}
									onNavbarLinkClick={closeMenu}
								/>
							) : null}
						</AnimatePresence>
					</div>
				</Container>
			</header>
		);
	},
);

export default Header;
