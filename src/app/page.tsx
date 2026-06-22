import {prisma} from '@/db';
import {unstable_cache} from 'next/cache';
import HomeContent from './HomeContent';

const getProjects = unstable_cache(
	async () =>
		prisma.project.findMany({
			orderBy: {startedAt: 'desc'},
			include: {
				ProjectTechnologies: {
					include: {technology: true},
					orderBy: {technology: {priority: 'asc'}},
				},
				ProjectCategory: true,
			},
		}),
	['projects'],
	{tags: ['projects']},
);

export const revalidate = 3600;

const Home = async () => {
	const projects = await getProjects();

	return <HomeContent projects={projects} />;
};

export default Home;
