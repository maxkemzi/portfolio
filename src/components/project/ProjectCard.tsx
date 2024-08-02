import {Project} from '@/types';
import classNames from 'classnames';
import Image from 'next/image';
import {Link, Typography} from '../ui';
import {TechnologyChipList} from '../technology';

interface Props {
	project: Project;
	flipOrder?: boolean;
}

const ProjectCard = (props: Props): JSX.Element => {
	const {
		project: {
			id,
			title,
			description,
			screenshot,
			technologies,
			liveUrl,
			githubUrl,
		},
		flipOrder,
	} = props;

	return (
		<div
			className={classNames('flex items-center gap-8', {
				'flex-row-reverse': flipOrder,
			})}
		>
			<div className="relative flex-1 h-[350px] bg-surface-main rounded-lg">
				<div
					className={classNames(
						'w-[90%] h-[90%] absolute bottom-0 overflow-hidden',
						{
							'right-0 rounded-tl-lg rounded-br-lg': !flipOrder,
							'left-0 rounded-tr-lg rounded-bl-lg': flipOrder,
						},
					)}
				>
					<Image src={screenshot} fill alt={`${title} screenshot`} />
				</div>
			</div>
			<div className="flex-1 overflow-hidden">
				<Typography className="mb-2" variant="h3" truncate>
					{title}
				</Typography>
				<Typography className="mb-4">{description}</Typography>
				<TechnologyChipList className="mb-4" technologies={technologies} />
				<div className="flex gap-4">
					<Link href={liveUrl}>LIVE APP</Link>
					<Link href={githubUrl}>GITHUB</Link>
					<Link href={`/projects/${id}`}>CASE-STUDY</Link>
				</div>
			</div>
		</div>
	);
};

export default ProjectCard;
