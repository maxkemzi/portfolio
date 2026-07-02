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
import {VIDEO_EXTENSIONS} from '@/constants';
import {prisma} from '@/db';
import {ProjectWithInclusions} from '@/types';
import {unstable_cache} from 'next/cache';
import Image from 'next/image';
import {notFound} from 'next/navigation';

const getProject = (name: string) =>
	unstable_cache(
		async () =>
			prisma.project.findUnique({
				where: {name},
				include: {
					ProjectTechnologies: {
						include: {technology: true},
						orderBy: {technology: {priority: 'asc'}},
					},
					ProjectCategory: true,
				},
			}),
		['project', name],
		{tags: ['projects']},
	);

const Project = async ({params}: {params: {name: string}}) => {
	const {name} = params;

	let project: ProjectWithInclusions | null = null;
	try {
		project = await getProject(name)();
	} catch (e) {
		console.error(e);
		return notFound();
	}

	if (!project) {
		return notFound();
	}

	const {
		title,
		description,
		status,
		image,
		liveUrl,
		repoUrl,
		overview,
		ProjectCategory,
		ProjectTechnologies,
	} = project;

	const categoryName = ProjectCategory.name;
	const technologies = ProjectTechnologies.map(pt => pt.technology);

	const markdown = overview.replace(/\\n/g, '\n');

	const statusColor = getProjectStatusColor(status);
	const statusText = getProjectStatusText(status);

	const isVideo = VIDEO_EXTENSIONS.some(ext =>
		image.toLowerCase().endsWith(ext),
	);

	return (
		<div className="flex flex-col min-h-screen">
			<Header position="relative" bordered />
			<main className="flex-1">
				<Section>
					<Container size="sm">
						<div className="flex items-center gap-4 mb-4 max-md:mb-3 max-xxs:mb-2">
							<Chip size="lg" color="surfaceLight">
								<Typography
									color="surfaceText"
									variant="body2"
									weight="semibold"
									textTransform="uppercase"
								>
									{categoryName}
								</Typography>
							</Chip>
							<Chip
								size="lg"
								color={statusColor ? `${statusColor}Dark` : undefined}
							>
								<Typography
									color={statusColor}
									variant="body2"
									weight="semibold"
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
							{repoUrl ? (
								<CustomLink variant="block" href={repoUrl} external>
									Repository
								</CustomLink>
							) : null}
						</div>
						<div className="w-[70%] relative aspect-[16/10] overflow-hidden rounded-xl mb-6 max-md:mb-5 max-xxs:mb-4">
							{isVideo ? (
								<video
									className="absolute inset-0 w-full h-full object-cover"
									src={image}
									autoPlay
									loop
									muted
									playsInline
									aria-label={`${title} demo`}
								/>
							) : (
								<Image
									className="object-cover"
									src={image}
									fill
									alt={`${title} image`}
									sizes="70vw"
								/>
							)}
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
