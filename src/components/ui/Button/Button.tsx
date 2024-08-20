import {ForwardedRef, forwardRef, ReactNode} from 'react';
import classNames from 'classnames';
import {Typography} from '../Typography';

type CommonProps = {
	children?: ReactNode;
	className?: string;
};

type ButtonProps = CommonProps & {
	asLink?: false;
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
			'inline-block px-6 py-3 text-primary-contrastText rounded-lg transition-all duration-300 ease-out hover:brightness-90';
		const backgroundClassNames =
			'bg-gradient-to-br from-primary-main to-secondary-main bg-[length:250%_auto] ';

		const commonChildren = (
			<Typography
				as="span"
				weight="bold"
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
					className={classNames(
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

		const {submit, disabled} = props;
		return (
			<button
				ref={ref as ForwardedRef<HTMLButtonElement>}
				className={classNames(
					commonClassNames,
					{[backgroundClassNames]: !disabled, 'bg-surface-main': disabled},
					className,
				)}
				type={submit ? 'submit' : 'button'}
				disabled={disabled}
			>
				{commonChildren}
			</button>
		);
	},
);

export default Button;
