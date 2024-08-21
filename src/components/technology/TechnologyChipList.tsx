import {Technology} from '@prisma/client';
import {twMerge} from 'tailwind-merge';
import TechnologyChip from './TechnologyChip';

interface Props {
	className?: string;
	technologies: Technology[];
}

const TechnologyChipList = (props: Props): JSX.Element => {
	const {technologies, className} = props;

	return (
		<ul className={twMerge('flex flex-wrap gap-2', className)}>
			{technologies.map(t => (
				<li key={t.id}>
					<TechnologyChip technology={t} />
				</li>
			))}
		</ul>
	);
};

export default TechnologyChipList;
