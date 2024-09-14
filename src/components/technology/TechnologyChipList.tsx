import {Technology} from '@prisma/client';
import {twMerge} from 'tailwind-merge';
import TechnologyChip from './TechnologyChip';

interface Props {
	className?: string;
	technologies: Technology[];
}

const TechnologyChipList = (props: Props): JSX.Element => {
	const {technologies, className} = props;

	const technologiesByPriority = technologies.toSorted(
		(a, b) => a.priority - b.priority,
	);

	return (
		<ul className={twMerge('flex flex-wrap gap-2', className)}>
			{technologiesByPriority.map(t => (
				<li key={t.id}>
					<TechnologyChip technology={t} />
				</li>
			))}
		</ul>
	);
};

export default TechnologyChipList;
