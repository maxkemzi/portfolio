import {ThemeColor} from '@/constants';
import {IconProps} from '@phosphor-icons/react';
import {List, X} from '@phosphor-icons/react/dist/ssr';
import {MouseEventHandler} from 'react';

interface Props {
	className?: string;
	onClick?: MouseEventHandler;
	active?: boolean;
}

const BurgerMenuButton = (props: Props): JSX.Element => {
	const {className, onClick, active} = props;

	const Icon = active ? X : List;
	const iconProps: IconProps = {
		size: 32,
		color: ThemeColor.BACKGROUND.CONTRAST_TEXT,
		weight: 'light',
	};

	return (
		<button
			className={className}
			aria-label="burger menu button"
			type="button"
			onClick={onClick}
		>
			<Icon {...iconProps} />
		</button>
	);
};

export default BurgerMenuButton;
