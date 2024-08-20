import classNames from 'classnames';
import {
	ChangeEventHandler,
	FocusEventHandler,
	ForwardedRef,
	forwardRef,
	RefObject,
} from 'react';
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
			'block w-full px-4 py-3 bg-surface-main rounded-lg';

		const renderElement = () => {
			if (multiline) {
				const {name, value, placeholder, onChange, onBlur} = props;
				return (
					<textarea
						ref={ref as ForwardedRef<HTMLTextAreaElement>}
						className={classNames(commonClassNames, 'resize-none')}
						name={name}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
					>
						{value}
					</textarea>
				);
			}

			const {name, value, placeholder, onChange, onBlur} = props;
			return (
				<input
					ref={ref as ForwardedRef<HTMLInputElement>}
					className={commonClassNames}
					name={name}
					value={value}
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

export default TextField;
