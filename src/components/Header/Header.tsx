import {Anchor} from '@/constants';
import {RefObject} from 'react';
import Link from 'next/link';
import {GithubLogo, TelegramLogo} from '@phosphor-icons/react/dist/ssr';
import {Container, Logo, Navbar, NavbarItem, NavbarLink} from '../ui';

interface Props {
	navbarRef: RefObject<HTMLElement>;
}

const Header = (props: Props): JSX.Element => {
	const {navbarRef} = props;

	return (
		<header className="absolute top-0 left-0 right-0 z-50 py-5">
			<Container size="lg">
				<div className="flex items-center justify-between">
					<Logo />
					<Navbar ref={navbarRef}>
						<NavbarItem>
							<NavbarLink href={`#${Anchor.HOME}`}>Home</NavbarLink>
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
							<Link
								className="group"
								href="https://github.com/maxkemzi"
								target="_blank"
								rel="noreferrer noopenner"
							>
								<GithubLogo
									className="fill-background-contrastText transition-colors duration-300 group-hover:fill-primary-main"
									size={28}
									weight="thin"
								/>
							</Link>
						</NavbarItem>
						<NavbarItem>
							<Link
								className="group"
								href="https://t.me/maxkemzi"
								target="_blank"
								rel="noreferrer noopenner"
							>
								<TelegramLogo
									className="fill-background-contrastText gtransition-colors duration-300 group-hover:fill-primary-main"
									size={28}
									weight="thin"
								/>
							</Link>
						</NavbarItem>
					</Navbar>
				</div>
			</Container>
		</header>
	);
};

export default Header;
