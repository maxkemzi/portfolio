import {ProjectCategory} from '@prisma/client';
import {twMerge} from 'tailwind-merge';
import ProjectCategoryFilter from './ProjectCategoryFilter';

interface Props {
	className?: string;
	categories: ProjectCategory[];
	activeCategoryId: string | undefined;
	onCategoryClick?: (id: string | undefined) => void;
}

const ProjectCategoryFilters = (props: Props): JSX.Element => {
	const {className, categories, activeCategoryId, onCategoryClick} = props;

	const commonClassNames = 'px-3';

	return (
		<ul className={twMerge('flex justify-center items-center', className)}>
			<li>
				<ProjectCategoryFilter
					className={commonClassNames}
					name="All"
					active={activeCategoryId === undefined}
					onClick={() => onCategoryClick?.(undefined)}
				/>
			</li>
			{categories.map(c => (
				<li key={c.id}>
					<ProjectCategoryFilter
						className={commonClassNames}
						name={c.name}
						active={activeCategoryId === c.id}
						onClick={() => onCategoryClick?.(c.id)}
					/>
				</li>
			))}
		</ul>
	);
};

export default ProjectCategoryFilters;
