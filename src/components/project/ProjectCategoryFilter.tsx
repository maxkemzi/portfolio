import {twMerge} from 'tailwind-merge';
import {MouseEventHandler} from 'react';
import {Typography} from '../ui';

interface Props {
	className?: string;
	name: string;
	onClick?: MouseEventHandler;
	active?: boolean;
}

const ProjectCategoryFilter = (props: Props): JSX.Element => {
	const {className, name, onClick, active} = props;

	return (
		<button className={className} onClick={onClick} type="button">
			<Typography
				className={twMerge(
					'inline-block py-1.5 px-1.5 rounded-lg transition-all duration-300',
					active && 'px-5 bg-background-contrastText/25',
				)}
				as="span"
				weight={active ? 'semibold' : 'medium'}
				textTransform="uppercase"
			>
				{name}
			</Typography>
		</button>
	);
};

export default ProjectCategoryFilter;
