import {ForwardedRef, forwardRef, ReactNode} from 'react';
import classNames from 'classnames';
import {Typography} from '../Typography';

interface Props {
	children?: ReactNode;
	className?: string;
	isDisabled?: boolean;
	isSubmit?: boolean;
}

const Button = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLButtonElement>): JSX.Element => {
		const {children, className, isDisabled, isSubmit} = props;

		return (
			<button
				ref={ref}
				className={classNames(
					'px-6 py-3 bg-gradient-to-br from-primary-main to-secondary-main bg-[length:200%_auto] text-primary-contrastText rounded-lg transition-all duration-300 ease-out hover:bg-[#C0219B] hover:shadow-[0_0_38px] hover:shadow-[#C0219B]',
					className,
				)}
				type={isSubmit ? 'submit' : 'button'}
				disabled={isDisabled}
			>
				<Typography variant="button">{children}</Typography>
			</button>
		);
	},
);

export default Button;
