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
					'inline-block px-6 py-3 bg-gradient-to-br from-primary-main to-secondary-main bg-[length:250%_auto] text-primary-contrastText rounded-lg transition-all duration-300 ease-out hover:brightness-90',
					className,
				)}
				type={isSubmit ? 'submit' : 'button'}
				disabled={isDisabled}
			>
				<Typography
					as="span"
					weight="bold"
					letterSpacing="wider"
					textTransform="uppercase"
				>
					{children}
				</Typography>
			</button>
		);
	},
);

export default Button;
