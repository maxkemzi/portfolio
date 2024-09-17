import {
	CustomMarkdown,
	Footer,
	Header,
	sortTechnologiesByPriority,
	TechnologyChipList,
} from '@/components';
import {
	getProjectStatusColor,
	getProjectStatusText,
} from '@/components/project';
import {
	Chip,
	Container,
	CustomLink,
	Section,
	Typography,
} from '@/components/ui';
import {prisma} from '@/db';
import {ProjectWithInclusions} from '@/types';
import Image from 'next/image';
import {notFound} from 'next/navigation';

const Project = async ({params}: {params: {id: string}}) => {
	const {id} = params;

	let project: ProjectWithInclusions | null = null;
	try {
		project = await prisma.project.findUnique({
			where: {id},
			include: {
				ProjectTechnologies: {include: {technology: true}},
				ProjectCategory: true,
			},
		});
	} catch (e) {
		return notFound();
	}
	if (!project) {
		return notFound();
	}

	const {
		title,
		description,
		status,
		liveUrl,
		repoUrl,
		overview,
		ProjectCategory,
		ProjectTechnologies,
		image,
	} = project;

	const categoryName = ProjectCategory.name;

	let technologies = ProjectTechnologies.map(pt => pt.technology);
	technologies = sortTechnologiesByPriority(technologies);

	const markdown = overview.replace(/\\n/g, '\n');

	const statusColor = getProjectStatusColor(status);
	const statusText = getProjectStatusText(status);

	return (
		<div className="flex flex-col min-h-screen">
			<Header position="relative" bordered />
			<main className="flex-1">
				<Section>
					<Container size="sm">
						<div className="flex items-center gap-4 mb-4 max-md:mb-3 max-xxs:mb-2">
							<Chip size="lg" color="backgroundText">
								<Typography
									color="backgroundText"
									variant="body2"
									weight="medium"
									textTransform="uppercase"
								>
									{categoryName}
								</Typography>
							</Chip>
							<Chip size="lg" color={statusColor}>
								<Typography
									color={statusColor}
									variant="body2"
									weight="medium"
									textTransform="uppercase"
								>
									{statusText}
								</Typography>
							</Chip>
						</div>
						<Typography
							className="mb-2 max-md:mb-1 max-xxs:mb-0.5"
							variant="h2"
						>
							{title}
						</Typography>
						<Typography
							className="mb-4 max-md:mb-3 max-xxs:mb-2"
							size="2xl"
							weight="normal"
						>
							{description}
						</Typography>
						<div className="flex gap-4 mb-6 max-md:mb-5 max-xxs:mb-4">
							<CustomLink variant="block" href={liveUrl} external>
								Live app
							</CustomLink>
							<CustomLink variant="block" href={repoUrl} external>
								Repository
							</CustomLink>
						</div>
						<div className="w-[70%] relative aspect-[16/10] overflow-hidden rounded-xl mb-6 max-md:mb-5 max-xxs:mb-4">
							<Image
								className="object-cover"
								src={image}
								fill
								alt={`${title} image`}
							/>
						</div>
						<div className="mb-6 max-md:mb-5 max-xxs:mb-4">
							<Typography
								className="mb-2 max-md:mb-1 max-xxs:mb-0.5"
								variant="h3"
							>
								Case study
							</Typography>
							<CustomMarkdown markdown={markdown} />
						</div>
						<TechnologyChipList technologies={technologies} />
					</Container>
				</Section>
			</main>
			<Footer />
		</div>
	);
};

export default Project;
