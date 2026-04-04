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

const getProjectCategories = unstable_cache(
	async () => prisma.projectCategory.findMany(),
	['projectCategories'],
	{tags: ['projectCategories']},
);

export const revalidate = 3600;

const Home = async () => {
	const [projects, categories] = await Promise.all([
		getProjects(),
		getProjectCategories(),
	]);

	return <HomeContent projects={projects} categories={categories} />;
};

export default Home;
