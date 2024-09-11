import {CustomMarkdown, Footer, Header, TechnologyChipList} from '@/components';
import {Container, CustomLink, Section, Typography} from '@/components/ui';
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
			include: {projectTechnologies: {include: {technology: true}}},
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
		liveUrl,
		repoUrl,
		overview,
		projectTechnologies,
		image,
	} = project;
	const technologies = projectTechnologies.map(pt => pt.technology);

	const markdown = overview.replace(/\\n/g, '\n');

	return (
		<div className="flex flex-col min-h-screen">
			<Header position="relative" bordered />
			<main className="flex-1">
				<Section>
					<Container size="sm">
						<div className="flex flex-col">
							<Typography className="mb-3" align="center" variant="h1">
								{title}
							</Typography>
							<Typography className="mb-6" align="center" variant="h4">
								{description}
							</Typography>
							<div className="flex gap-4 mx-auto mb-8">
								<CustomLink variant="block" href={liveUrl} external>
									Live app
								</CustomLink>
								<CustomLink variant="block" href={repoUrl} external>
									Repository
								</CustomLink>
							</div>
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
						</div>
					</Container>
				</Section>
			</main>
			<Footer />
		</div>
	);
};

export default Project;
