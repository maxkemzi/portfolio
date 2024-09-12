import Image from 'next/image';
import Link from 'next/link';
import {ProjectWithTechnologies} from '@/types';
import {Chip, Typography} from '../ui';
import {TechnologyChipList} from '../technology';
import {getStatusColor, getStatusText} from './helpers';

interface Props {
	project: ProjectWithTechnologies;
}

const ProjectCard = (props: Props): JSX.Element => {
	const {
		project: {id, title, description, status, image, projectTechnologies},
	} = props;
	const technologies = projectTechnologies.map(pt => pt.technology);

	const statusColor = getStatusColor(status);
	const statusText = getStatusText(status);

	return (
		<Link
			className="group block relative h-full rounded-lg overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:z-10 before:opacity-0 before:bg-[linear-gradient(rgba(0,0,0,0.1)_10%,_rgba(0,0,0,0.78)_80%)] before:transition-opacity before:duration-300 hover:before:opacity-100"
			href={`/projects/${id}`}
		>
			<Image
				className="absolute top-0 left-0 object-cover"
				src={image}
				fill
				alt={`${title} screenshot`}
			/>
			<div className="absolute bottom-0 left-0 p-6 w-full h-full z-20 transition-all duration-300 translate-y-[50px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
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
						<Typography className="mb-1" variant="h3">
							{title}
						</Typography>
						<Typography className="mb-3">{description}</Typography>
						<TechnologyChipList technologies={technologies} />
					</div>
				</div>
			</div>
		</Link>
	);
};

export default ProjectCard;
