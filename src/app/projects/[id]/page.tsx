import {Footer, Header, TechnologyChipList} from '@/components';
import {Container, Link, Section, Typography} from '@/components/ui';
import {prisma} from '@/db';
import {ProjectWithTechnologies} from '@/types';
import Image from 'next/image';
import {notFound} from 'next/navigation';
import {AnchorHTMLAttributes, PropsWithChildren} from 'react';
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

	const renderMarkdownParagraph = ({children}: PropsWithChildren) => (
		<Typography className="mb-4 last:mb-0">{children}</Typography>
	);

	const renderMarkdownUl = ({children}: PropsWithChildren) => (
		<ul className="mb-4 last:mb-0">{children}</ul>
	);

	const renderMarkdownH2 = ({children}: PropsWithChildren) => (
		<Typography className="mb-1" variant="h4">
			{children}
		</Typography>
	);

	const renderMarkdownStrong = ({children}: PropsWithChildren) => (
		<Typography weight="semibold" variant="inherit" as="strong">
			{children}
		</Typography>
	);

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
							<Typography className="mb-6" align="center" variant="h3">
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
							<div className="mb-6">
								<Typography className="mb-3" variant="h3">
									Case study
								</Typography>
								<Markdown
									className="flex flex-col"
									remarkPlugins={[remarkGfm]}
									allowedElements={[
										'p',
										'a',
										'ul',
										'li',
										'br',
										'h2',
										'strong',
									]}
									unwrapDisallowed
									components={{
										a: renderMarkdownLink,
										p: renderMarkdownParagraph,
										ul: renderMarkdownUl,
										h2: renderMarkdownH2,
										strong: renderMarkdownStrong,
									}}
								>
									{markdown}
								</Markdown>
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
