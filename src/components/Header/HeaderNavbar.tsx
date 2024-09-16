import {Anchor} from '@/constants';
import {MouseEventHandler} from 'react';
import {Navbar, NavbarItem, NavbarLink} from '../ui';

interface Props {
	listClassName?: string;
	onLinkClick?: MouseEventHandler;
}

const HeaderNavbar = (props: Props): JSX.Element => {
	const {listClassName, onLinkClick} = props;

	return (
		<Navbar listClassName={listClassName}>
			<NavbarItem>
				<NavbarLink onClick={onLinkClick} href={`/#${Anchor.HERO}`}>
					Hero
				</NavbarLink>
			</NavbarItem>
			<NavbarItem>
				<NavbarLink onClick={onLinkClick} href={`/#${Anchor.ABOUT}`}>
					About
				</NavbarLink>
			</NavbarItem>
			<NavbarItem>
				<NavbarLink onClick={onLinkClick} href={`/#${Anchor.PROJECTS}`}>
					Projects
				</NavbarLink>
			</NavbarItem>
			<NavbarItem>
				<NavbarLink onClick={onLinkClick} href={`/#${Anchor.CONTACT}`}>
					Contact
				</NavbarLink>
			</NavbarItem>
		</Navbar>
	);
};

export default HeaderNavbar;
