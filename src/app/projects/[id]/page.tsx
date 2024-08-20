import {Footer, Header, TechnologyChipList} from '@/components';
import {Container, Link, Section, Typography} from '@/components/ui';
import {prisma} from '@/db';
import {ProjectWithTechnologies} from '@/types';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {AnchorHTMLAttributes} from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

	const renderMarkdownLink = ({
		href,
		children,
	}: AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<Link href={href ?? '#'} external>
			{children}
		</Link>
	);

	return (
		<div className="flex flex-col min-h-screen">
			<Header position="relative" bordered />
			<main className="flex-1">
				<Section>
					<Container>
						<div className="flex flex-col">
							<Typography className="mb-3" align="center" variant="h1">
								{title}
							</Typography>
							<Typography
								className="mb-6"
								align="center"
								variant="h2"
								weight="semibold"
							>
								{description}
							</Typography>
							<div className="flex gap-4 mx-auto mb-8">
								<Link variant="block" href={liveUrl} external>
									Live app
								</Link>
								<Link variant="block" href={repoUrl} external>
									Repository
								</Link>
							</div>
							<div className="flex items-start justify-between gap-4">
								<div className="flex-1">
									<div className="mb-6">
										<Typography className="mb-3" variant="h3">
											Overview
										</Typography>
										<Markdown
											remarkPlugins={[remarkGfm]}
											allowedElements={['p', 'a']}
											unwrapDisallowed
											components={{
												a: renderMarkdownLink,
											}}
										>
											{overview}
										</Markdown>
									</div>
									<div>
										<Typography className="mb-3" variant="h3">
											Technologies
										</Typography>
										<TechnologyChipList technologies={technologies} />
									</div>
								</div>
								<div className="flex-1 relative aspect-[16/10] border-surface-main overflow-hidden rounded-lg">
									<Image
										className="object-cover"
										src={image}
										fill
										alt={`${title} image`}
									/>
								</div>
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
