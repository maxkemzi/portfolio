import {ReactNode} from 'react';
import classNames from 'classnames';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
	className?: string;
	isDisabled?: boolean;
	isSubmit?: boolean;
}

const Button = (props: Props): JSX.Element => {
	const {children, className, isDisabled, isSubmit} = props;

	return (
		<button
			className={classNames(
				'px-6 py-3 bg-primary-main text-primary-contrastText rounded-lg transition-all duration-300 hover:bg-[#C0219B] hover:shadow-[0_0_38px] hover:shadow-[#C0219B]',
				className,
			)}
			type={isSubmit ? 'submit' : 'button'}
			disabled={isDisabled}
		>
			<Typography variant="button">{children}</Typography>
		</button>
	);
};

export default Button;
