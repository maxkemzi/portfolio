import Image from 'next/image';
import Link from 'next/link';
import {ProjectWithTechnologies} from '@/types';
import {Typography} from '../ui';
import {TechnologyChipList} from '../technology';

interface Props {
	project: ProjectWithTechnologies;
}

const ProjectCard = (props: Props): JSX.Element => {
	const {
		project: {id, title, description, image, projectTechnologies},
	} = props;
	const technologies = projectTechnologies.map(pt => pt.technology);

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
			<div className="absolute bottom-0 left-0 p-6 w-full z-20 transition-all duration-300 translate-y-[50px] opacity-0 group-hover:opacity-100 group-hover:translate-y-0">
				<Typography className="mb-1" variant="h3">
					{title}
				</Typography>
				<Typography className="mb-3">{description}</Typography>
				<TechnologyChipList technologies={technologies} />
			</div>
		</Link>
	);
};

export default ProjectCard;
