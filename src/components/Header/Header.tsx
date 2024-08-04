import {Anchor} from '@/constants';
import {ForwardedRef, forwardRef, RefObject} from 'react';
import NextLink from 'next/link';
import {GithubLogo, TelegramLogo} from '@phosphor-icons/react/dist/ssr';
import classNames from 'classnames';
import {Container, Logo, Navbar, NavbarItem, NavbarLink} from '../ui';

interface Props {
	navbarRef?: RefObject<HTMLElement>;
	isFixed?: boolean;
}

const Header = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {navbarRef, isFixed = false} = props;

		return (
			<header
				ref={ref}
				className={classNames('top-0 left-0 right-0 z-50', {
					'absolute py-5': !isFixed,
					'fixed bg-secondary-main bg-opacity-90 shadow-lg py-4': isFixed,
				})}
			>
				<Container size="lg">
					<div className="flex items-center justify-between">
						<NextLink href={`#${Anchor.HERO}`}>
							<Logo />
						</NextLink>
						<Navbar ref={navbarRef}>
							<NavbarItem>
								<NavbarLink href={`#${Anchor.HERO}`}>Hero</NavbarLink>
							</NavbarItem>
							<NavbarItem>
								<NavbarLink href={`#${Anchor.ABOUT}`}>About</NavbarLink>
							</NavbarItem>
							<NavbarItem>
								<NavbarLink href={`#${Anchor.PROJECTS}`}>
									Projects
								</NavbarLink>
							</NavbarItem>
							<NavbarItem>
								<NavbarLink href={`#${Anchor.CONTACT}`}>
									Contact
								</NavbarLink>
							</NavbarItem>
							<NavbarItem>
								<NextLink
									className="group"
									href="https://github.com/maxkemzi"
									target="_blank"
									rel="noreferrer noopenner"
								>
									<GithubLogo
										className="fill-background-contrastText transition-colors duration-500 ease-in-out group-hover:fill-primary-main"
										size={28}
										weight="light"
									/>
								</NextLink>
							</NavbarItem>
							<NavbarItem>
								<NextLink
									className="group"
									href="https://t.me/maxkemzi"
									target="_blank"
									rel="noreferrer noopenner"
								>
									<TelegramLogo
										className="fill-background-contrastText gtransition-colors duration-500 ease-in-out group-hover:fill-primary-main"
										size={28}
										weight="light"
									/>
								</NextLink>
							</NavbarItem>
						</Navbar>
					</div>
				</Container>
			</header>
		);
	},
);

export default Header;
