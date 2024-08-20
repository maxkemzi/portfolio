import classNames from 'classnames';
import {ForwardedRef, forwardRef, ReactNode} from 'react';

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
				className={classNames(
					{
						'h-screen': fullscreen,
						'py-20': !fullscreen,
					},
					className,
				)}
			>
				{children}
			</section>
		);
	},
);

export default Section;
