import {Anchor} from '@/constants';
import {ForwardedRef, forwardRef, RefObject} from 'react';
import Link from 'next/link';
import {GithubLogo, TelegramLogo} from '@phosphor-icons/react/dist/ssr';
import {twJoin} from 'tailwind-merge';
import {Container, Logo, Navbar, NavbarItem, NavbarLink} from '../ui';

type Position = 'absolute' | 'fixed' | 'relative';

interface Props {
	navbarRef?: RefObject<HTMLElement>;
	position?: Position;
	blurred?: boolean;
	bordered?: boolean;
}

const Header = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {navbarRef, position = 'absolute', blurred, bordered} = props;

		return (
			<header
				ref={ref}
				className={twJoin(
					'py-5 z-50',
					position === 'absolute' && 'absolute top-0 left-0 right-0',
					position === 'fixed' && 'fixed top-0 left-0 right-0',
					position === 'relative' && 'relative',
					blurred && 'shadow-lg backdrop-blur',
					bordered && 'border-b border-surface-main',
				)}
			>
				<Container size="lg">
					<div className="flex items-center justify-between gap-7">
						<Link href={`/#${Anchor.HERO}`}>
							<Logo />
						</Link>
						<div className="flex items-center gap-3.5">
							<Navbar ref={navbarRef}>
								<NavbarItem>
									<NavbarLink href={`/#${Anchor.HERO}`}>
										Hero
									</NavbarLink>
								</NavbarItem>
								<NavbarItem>
									<NavbarLink href={`/#${Anchor.ABOUT}`}>
										About
									</NavbarLink>
								</NavbarItem>
								<NavbarItem>
									<NavbarLink href={`/#${Anchor.PROJECTS}`}>
										Projects
									</NavbarLink>
								</NavbarItem>
								<NavbarItem>
									<NavbarLink href={`/#${Anchor.CONTACT}`}>
										Contact
									</NavbarLink>
								</NavbarItem>
							</Navbar>
							<ul className="flex items-center">
								<li>
									<Link
										className="group inline-block px-3.5"
										href="https://github.com/maxkemzi"
										target="_blank"
										rel="noreferrer noopenner"
									>
										<GithubLogo
											className="fill-background-contrastText transition-colors duration-300 ease-out group-hover:fill-primary-main"
											size={28}
											weight="light"
										/>
									</Link>
								</li>
								<li>
									<Link
										className="group inline-block px-3.5"
										href="https://t.me/maxkemzi"
										target="_blank"
										rel="noreferrer noopenner"
									>
										<TelegramLogo
											className="fill-background-contrastText gtransition-colors duration-300 ease-out group-hover:fill-primary-main"
											size={28}
											weight="light"
										/>
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</Container>
			</header>
		);
	},
);

export default Header;
