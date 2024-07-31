import classNames from 'classnames';
import {forwardRef, ReactNode} from 'react';

type Variant = 'main' | 'content';

interface Props {
	children?: ReactNode;
	variant?: Variant;
}

const variantToClassesMapping: {[key in Variant]: string} = {
	main: 'max-w-[1472px] px-4',
	content: 'max-w-[1172px]',
};

const Container = forwardRef<HTMLDivElement, Props>(
	(props, ref): JSX.Element => {
		const {children, variant = 'main'} = props;

		const variantClasses = variantToClassesMapping[variant];

		return (
			<div
				ref={ref}
				className={classNames(variantClasses, 'h-full mx-auto relative')}
			>
				{children}
			</div>
		);
	},
);

export default Container;
