import {ForwardedRef, forwardRef, MouseEventHandler, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';
import {Typography, TypographyColorValue} from '../Typography';
import {Color, ColorValue} from '../types';

const ButtonColor = {
	PRIMARY: Color.PRIMARY,
	BACKGROUND: Color.BACKGROUND,
	SURFACE: Color.SURFACE,
	DANGER: Color.DANGER,
	SUCCESS: Color.SUCCESS,
	INFORMATION: Color.INFORMATION,
	WARNING: Color.WARNING,
} satisfies Record<string, ColorValue>;
type ButtonColorValue = (typeof ButtonColor)[keyof typeof ButtonColor];

const COLOR_TO_CLASS_NAME_MAPPING: Record<ButtonColorValue, string> = {
	[ButtonColor.PRIMARY]: 'bg-primary-main',
	[ButtonColor.BACKGROUND]: 'bg-background-main',
	[ButtonColor.SURFACE]: 'bg-surface-main',
	[ButtonColor.DANGER]: 'bg-danger-main',
	[ButtonColor.SUCCESS]: 'bg-success-main',
	[ButtonColor.INFORMATION]: 'bg-information-main',
	[ButtonColor.WARNING]: 'bg-warning-main',
} as const;

const COLOR_TO_TYPOGRAPHY_COLOR_MAPPING: Record<
	ButtonColorValue,
	TypographyColorValue
> = {
	[ButtonColor.PRIMARY]: 'primaryText',
	[ButtonColor.BACKGROUND]: 'backgroundText',
	[ButtonColor.SURFACE]: 'surfaceText',
	[ButtonColor.DANGER]: 'dangerText',
	[ButtonColor.SUCCESS]: 'successText',
	[ButtonColor.INFORMATION]: 'informationText',
	[ButtonColor.WARNING]: 'warningText',
} as const;

type CommonProps = {
	children?: ReactNode;
	className?: string;
	color?: ButtonColorValue;
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
		const {children, className, asLink, color = 'primary'} = props;

		const commonClassNames = twMerge(
			'inline-block px-6 py-3 text-primary-contrastText rounded-lg transition-all duration-300 ease-out shadow-lg shadow-transparent hover:shadow-primary-main/15 max-xs:px-5 max-xs:py-2.5 max-xxs:px-4 max-xxs:py-2',
			COLOR_TO_CLASS_NAME_MAPPING[color],
			className,
		);

		const commonChildren = (
			<Typography
				color={COLOR_TO_TYPOGRAPHY_COLOR_MAPPING[color]}
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
					className={commonClassNames}
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
				className={twMerge(commonClassNames, disabled && 'bg-surface-main')}
				type={submit ? 'submit' : 'button'}
				disabled={disabled}
				onClick={onClick}
			>
				{commonChildren}
			</button>
		);
	},
);

export type {Props as ButtonProps};
export default Button;
