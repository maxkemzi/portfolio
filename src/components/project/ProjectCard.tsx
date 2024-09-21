import Image from 'next/image';
import Link from 'next/link';
import {ProjectWithInclusions} from '@/types';
import {Chip, Typography} from '../ui';
import {TechnologyChipList} from '../technology';
import {getStatusColor, getStatusText} from './helpers';

interface Props {
	project: ProjectWithInclusions;
}

const ProjectCard = (props: Props): JSX.Element => {
	const {
		project: {
			name,
			title,
			description,
			status,
			image,
			ProjectTechnologies,
			ProjectCategory,
		},
	} = props;

	const statusColor = getStatusColor(status);
	const statusText = getStatusText(status);

	const technologies = ProjectTechnologies.map(pt => pt.technology);
	const category = ProjectCategory.name;

	const firstTechnologyRowLength = Math.ceil(technologies.length / 2);
	const firstTechnologyRow = technologies.slice(0, firstTechnologyRowLength);
	const secondTechnologyRow = technologies.slice(firstTechnologyRowLength);

	return (
		<Link
			className="group block relative h-full rounded-lg overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:bg-background-dark/60 md:before:opacity-0 md:before:transition-opacity md:before:duration-300 md:hover:before:opacity-100"
			href={`/projects/${name}`}
			aria-label={`${title} project page`}
			data-category={category}
		>
			<Image
				className="object-cover"
				src={image}
				fill
				alt={`${title} screenshot`}
			/>
			<div className="absolute bottom-0 left-0 p-6 w-full h-full z-20 md:transition-all md:duration-300 md:translate-y-[50px] md:opacity-0 md:group-hover:opacity-100 md:group-hover:translate-y-0 max-md:p-5 max-xxs:p-4">
				<div className="flex flex-col justify-between h-full">
					<Chip className="self-end" size="lg" color={statusColor}>
						<Typography
							color={statusColor}
							variant="body3"
							textTransform="uppercase"
							weight="medium"
						>
							{statusText}
						</Typography>
					</Chip>
					<div>
						<Typography className="mb-1 max-md:mb-0.5" variant="h3">
							{title}
						</Typography>
						<Typography className="mb-3 max-xxs:mb-2">
							{description}
						</Typography>
						<div className="overflow-x-auto">
							<TechnologyChipList
								className="flex-nowrap mb-2 max-xxs:mb-1"
								technologies={firstTechnologyRow}
							/>
							<TechnologyChipList
								className="flex-nowrap"
								technologies={secondTechnologyRow}
							/>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
