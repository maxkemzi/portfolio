import classNames from 'classnames';
import {
	ChangeEventHandler,
	FocusEventHandler,
	ForwardedRef,
	forwardRef,
	RefObject,
} from 'react';
import {Typography} from '../Typography';

type CommonProps<T extends Element> = {
	label: string;
	name: string;
	value?: string;
	placeholder?: string;
	error?: string;
	onChange?: ChangeEventHandler<T>;
	onBlur?: FocusEventHandler<T>;
};

type NonMultilineProps = CommonProps<HTMLInputElement> & {
	inputRef?: RefObject<HTMLInputElement>;
	textareaRef?: never;
	isMultiline?: never;
};

type MultilineProps = CommonProps<HTMLTextAreaElement> & {
	textareaRef?: RefObject<HTMLTextAreaElement>;
	inputRef?: never;
	isMultiline: true;
};

type Props = NonMultilineProps | MultilineProps;

const TextField = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
		const {isMultiline, label, error} = props;

		const commonClasses = 'block w-full px-4 py-3 bg-surface-main rounded-lg';

		const renderElement = () => {
			if (isMultiline) {
				const {textareaRef, name, value, placeholder, onChange, onBlur} =
					props;

				return (
					<textarea
						ref={textareaRef}
						className={classNames(commonClasses, 'resize-none')}
						name={name}
						placeholder={placeholder}
						onChange={onChange}
						onBlur={onBlur}
					>
						{value}
					</textarea>
				);
			}

			const {inputRef, name, value, placeholder, onChange, onBlur} = props;

			return (
				<input
					ref={inputRef}
					className={commonClasses}
					name={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					onBlur={onBlur}
				/>
			);
		};

		return (
			<div ref={ref}>
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
