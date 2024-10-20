import {prisma} from '@/db';
import HomeContent from './HomeContent';

export const revalidate = 3600;

const Home = async () => {
	const [projects, categories] = await Promise.all([
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
		prisma.projectCategory.findMany(),
	]);

	return <HomeContent projects={projects} categories={categories} />;
};

export default Home;
