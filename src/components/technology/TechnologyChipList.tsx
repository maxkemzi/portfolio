import {Technology} from '@/types';
import classNames from 'classnames';
import TechnologyChip from './TechnologyChip';

interface Props {
	className?: string;
	technologies: Technology[];
}

const TechnologyChipList = (props: Props): JSX.Element => {
	const {technologies, className} = props;

	return (
		<ul className={classNames('flex flex-wrap gap-2', className)}>
			{technologies.map(t => (
				<li key={t.id}>
					<TechnologyChip technology={t} />
				</li>
			))}
		</ul>
	);
};

export default TechnologyChipList;
