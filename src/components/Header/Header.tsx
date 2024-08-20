import {Anchor} from '@/constants';
import {ForwardedRef, forwardRef, RefObject} from 'react';
import NextLink from 'next/link';
import {GithubLogo, TelegramLogo} from '@phosphor-icons/react/dist/ssr';
import classNames from 'classnames';
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
				className={classNames('py-5 z-50', {
					'absolute top-0 left-0 right-0': position === 'absolute',
					'fixed top-0 left-0 right-0': position === 'fixed',
					relative: position === 'relative',
					'shadow-lg backdrop-blur': blurred,
					'border-b border-surface-main': bordered,
				})}
			>
				<Container size="lg">
					<div className="flex items-center justify-between gap-7">
						<NextLink href={`/#${Anchor.HERO}`}>
							<Logo />
						</NextLink>
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
									<NextLink
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
									</NextLink>
								</li>
								<li>
									<NextLink
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
									</NextLink>
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
