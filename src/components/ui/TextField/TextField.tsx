import {
	ChangeEventHandler,
	FocusEventHandler,
	ForwardedRef,
	forwardRef,
	RefObject,
} from 'react';
import {twJoin} from 'tailwind-merge';
import {Typography} from '../Typography';

type CommonProps = {
	containerRef?: RefObject<HTMLDivElement>;
	label: string;
	name: string;
	value?: string;
	placeholder?: string;
	error?: string;
};

type CallbackProps<T extends HTMLElement> = {
	onChange?: ChangeEventHandler<T>;
	onBlur?: FocusEventHandler<T>;
};

type NonMultilineProps = CommonProps &
	CallbackProps<HTMLInputElement> & {
		multiline?: false;
	};

type MultilineProps = CommonProps &
	CallbackProps<HTMLTextAreaElement> & {
		multiline: true;
	};

type Props = NonMultilineProps | MultilineProps;

const TextField = forwardRef(
	(
		props: Props,
		ref: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
	): JSX.Element => {
		const {containerRef, multiline, label, error} = props;

		const commonClassNames =
			'block w-full px-4 py-3 bg-transparent border border-surface-main rounded-lg focus:bg-background-dark outline-none placeholder:text-[#948FA3]';

		const renderElement = () => {
			const {name, value, placeholder} = props;

			if (multiline) {
				const {onChange, onBlur} = props;
				return (
					<textarea
						ref={ref as ForwardedRef<HTMLTextAreaElement>}
						className={twJoin(commonClassNames, 'resize-none')}
						name={name}
						{...(onChange ? {value} : {defaultValue: value})}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
					/>
				);
			}

			const {onChange, onBlur} = props;
			return (
				<input
					ref={ref as ForwardedRef<HTMLInputElement>}
					className={commonClassNames}
					name={name}
					{...(onChange ? {value} : {defaultValue: value})}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
				/>
			);
		};

		return (
			<div ref={containerRef}>
				<label className="block">
					<Typography className="mb-1">{label}</Typography>
					{renderElement()}
				</label>
				{error ? (
					<Typography className="mt-1 text-sm" color="danger">
						{error}
					</Typography>
				) : null}
			</div>
		);
	},
);

export type {Props as TextFieldProps};
export default TextField;
