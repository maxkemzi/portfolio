import {Header, TechnologyChipList} from '@/components';
import {Container, Link, Typography} from '@/components/ui';
import {prisma} from '@/db';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Project = async ({params}: {params: {id: string}}) => {
	const {id} = params;

	const project = await prisma.project.findUnique({
		where: {id},
		include: {projectTechnologies: {include: {technology: true}}},
	});
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

	return (
		<div className="flex flex-col min-h-screen">
			<Header position="relative" />
			<main className="flex-1">
				<Container size="sm">
					<div className="flex flex-col">
						<Typography className="mb-3" align="center" variant="h1">
							{title}
						</Typography>
						<Typography className="mb-6" align="center" variant="h2">
							{description}
						</Typography>
						<div className="flex gap-4 mx-auto mb-6">
							<Link href={liveUrl} isExternal>
								Live app
							</Link>
							<Link href={repoUrl} isExternal>
								Repository
							</Link>
						</div>
						<div className="mb-6">
							<Typography className="mb-3" variant="h3">
								Overview
							</Typography>
							<Markdown
								remarkPlugins={[remarkGfm]}
								components={{
									// TODO: fix eslint error
									// eslint-disable-next-line react/no-unstable-nested-components
									h1: ({children}) => (
										<Typography variant="h4">{children}</Typography>
									),
								}}
							>
								{overview}
							</Markdown>
						</div>
						<div className="mb-6">
							<Typography className="mb-3" variant="h3">
								Technologies
							</Typography>
							<TechnologyChipList technologies={technologies} />
						</div>
						<div>
							<Typography className="mb-3" variant="h3">
								Images
							</Typography>
							<Image
								src={image}
								width={500}
								height={500}
								alt={`${title} image`}
							/>
						</div>
					</div>
				</Container>
			</main>
		</div>
	);
};

export default Project;
