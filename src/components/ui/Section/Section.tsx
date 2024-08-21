import {ForwardedRef, forwardRef, ReactNode} from 'react';
import {twMerge} from 'tailwind-merge';

interface Props {
	id?: string;
	className?: string;
	children?: ReactNode;
	fullscreen?: boolean;
}

const Section = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {id, className, children, fullscreen} = props;
		return (
			<section
				ref={ref}
				id={id}
				className={twMerge(
					fullscreen && 'h-screen',
					!fullscreen && 'py-20',
					className,
				)}
			>
				{children}
			</section>
		);
	},
);

export default Section;
