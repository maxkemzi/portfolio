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
import {ProjectWithTechnologies} from '@/types';
import Image from 'next/image';
import {notFound} from 'next/navigation';

const Project = async ({params}: {params: {id: string}}) => {
	const {id} = params;

	let project: ProjectWithTechnologies | null = null;
	try {
		project = await prisma.project.findUnique({
			where: {id},
			include: {ProjectTechnologies: {include: {technology: true}}},
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
		ProjectTechnologies,
		image,
	} = project;
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
						<Typography className="mb-3" align="center" variant="h1">
							{title}
						</Typography>
						<Typography className="mb-6" align="center" variant="h4">
							{description}
						</Typography>
						<div className="flex justify-center gap-4 mb-8">
							<CustomLink variant="block" href={liveUrl} external>
								Live app
							</CustomLink>
							<CustomLink variant="block" href={repoUrl} external>
								Repository
							</CustomLink>
						</div>
						<Chip className="mb-4" size="lg" color={statusColor}>
							<Typography
								color={statusColor}
								variant="body2"
								weight="medium"
								textTransform="uppercase"
							>
								{statusText}
							</Typography>
						</Chip>
						<div className="mb-6">
							<Typography className="mb-3" variant="h3">
								Case study
							</Typography>
							<CustomMarkdown markdown={markdown} />
						</div>
						<div className="mb-6">
							<Typography className="mb-3" variant="h3">
								Technologies
							</Typography>
							<TechnologyChipList technologies={technologies} />
						</div>
						<div className="relative aspect-[16/10] overflow-hidden rounded-lg">
							<Image
								className="object-cover"
								src={image}
								fill
								alt={`${title} image`}
							/>
						</div>
					</Container>
				</Section>
			</main>
			<Footer />
		</div>
	);
};

export default Project;
