import {ForwardedRef, forwardRef, MouseEventHandler, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import {Typography} from '../Typography';

type CommonProps = {
	children?: ReactNode;
	className?: string;
};

type ButtonProps = CommonProps & {
	asLink?: false;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	href?: never;
	download?: never;
	submit?: boolean;
	disabled?: boolean;
};

type ButtonAsLinkProps = CommonProps & {
	asLink: true;
	href: string;
	download?: string;
};

type Props = ButtonProps | ButtonAsLinkProps;

const Button = forwardRef(
	(
		props: Props,
		ref: ForwardedRef<HTMLButtonElement | HTMLAnchorElement>,
	): JSX.Element => {
		const {children, className, asLink} = props;

		const commonClassNames =
			'inline-block px-6 py-3 text-primary-contrastText rounded-lg transition-all duration-300 ease-out';
		const backgroundClassNames =
			'bg-gradient-to-br from-primary-main to-secondary-main bg-[length:250%_auto] ';

		const commonChildren = (
			<Typography
				as="span"
				weight="semibold"
				letterSpacing="wider"
				textTransform="uppercase"
			>
				{children}
			</Typography>
		);

		if (asLink) {
			const {href, download} = props;
			return (
				<a
					ref={ref as ForwardedRef<HTMLAnchorElement>}
					className={twMerge(
						commonClassNames,
						backgroundClassNames,
						className,
					)}
					href={href}
					download={download}
					rel="noopener noreferrer"
				>
					{commonChildren}
				</a>
			);
		}

		const {submit, disabled, onClick} = props;
		return (
			<button
				ref={ref as ForwardedRef<HTMLButtonElement>}
				className={twMerge(
					commonClassNames,
					backgroundClassNames,
					disabled && 'brightness-75',
					className,
				)}
				type={submit ? 'submit' : 'button'}
				disabled={disabled}
				onClick={onClick}
			>
				{commonChildren}
			</button>
		);
	},
);

export default Button;
