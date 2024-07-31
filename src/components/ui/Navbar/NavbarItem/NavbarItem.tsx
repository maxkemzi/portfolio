import {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
}

const NavbarItem = (props: Props): JSX.Element => {
	const {children} = props;

	return <li>{children}</li>;
};

export default NavbarItem;
