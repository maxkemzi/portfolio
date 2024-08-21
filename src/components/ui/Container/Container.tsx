import {ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

type Size = 'sm' | 'md' | 'lg';

interface Props {
	className?: string;
	children?: ReactNode;
	size?: Size;
}

const SIZE_TO_CLASS_NAMES_MAPPING: {[key in Size]: string} = {
	lg: 'max-w-[1472px]',
	md: 'max-w-[1172px]',
	sm: 'max-w-[872px]',
};

const Container = (props: Props): JSX.Element => {
	const {className, children, size = 'md'} = props;

	const sizeClassNames = SIZE_TO_CLASS_NAMES_MAPPING[size];

	return (
		<div
			className={twMerge(
				'h-full mx-auto relative px-4',
				sizeClassNames,
				className,
			)}
		>
			{children}
		</div>
	);
};
export default Container;
