import {CustomMarkdown, Footer, Header, TechnologyChipList} from '@/components';
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
	const technologies = ProjectTechnologies.map(pt => pt.technology);

	const markdown = overview.replace(/\\n/g, '\n');

	const statusColor = getProjectStatusColor(status);
	const statusText = getProjectStatusText(status);

	return (
		<div className="flex flex-col min-h-screen">
			<Header position="relative" bordered />
			<main className="flex-1">
				<Section>
					<Container size="sm">
						<div className="flex items-center gap-4 mb-4">
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
						<Typography className="mb-3" variant="h2">
							{title}
						</Typography>
						<Typography className="mb-4" size="2xl" weight="normal">
							{description}
						</Typography>
						<div className="flex gap-4 mb-6">
							<CustomLink variant="block" href={liveUrl} external>
								Live app
							</CustomLink>
							<CustomLink variant="block" href={repoUrl} external>
								Repository
							</CustomLink>
						</div>
						<div className="w-[70%] relative aspect-[16/10] overflow-hidden rounded-xl mb-6">
							<Image
								className="object-cover"
								src={image}
								fill
								alt={`${title} image`}
							/>
						</div>
						<div className="mb-6">
							<Typography className="mb-3" variant="h3">
								Case study
							</Typography>
							<CustomMarkdown markdown={markdown} />
						</div>
						<div>
							<Typography className="mb-3" variant="h3">
								Technologies
							</Typography>
							<TechnologyChipList technologies={technologies} />
						</div>
					</Container>
				</Section>
			</main>
			<Footer />
		</div>
	);
};

export default Project;
