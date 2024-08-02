import classNames from 'classnames';
import {ReactNode} from 'react';

type Variant = 'main' | 'content';

interface Props {
	children?: ReactNode;
	variant?: Variant;
}

const VARIANT_TO_CLASSES_MAPPING: {[key in Variant]: string} = {
	main: 'max-w-[1472px] px-4',
	content: 'max-w-[1172px]',
};

const Container = (props: Props): JSX.Element => {
	const {children, variant = 'main'} = props;

	const variantClasses = VARIANT_TO_CLASSES_MAPPING[variant];

	return (
		<div className={classNames(variantClasses, 'h-full mx-auto relative')}>
			{children}
		</div>
	);
};
export default Container;
