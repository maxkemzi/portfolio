import {prisma} from '@/db';
import HomeContent from './HomeContent';

const Home = async () => {
	const [projects, categories] = await Promise.all([
		prisma.project.findMany({
			include: {
				ProjectTechnologies: {include: {technology: true}},
				ProjectCategory: true,
			},
		}),
		prisma.projectCategory.findMany(),
	]);

	return <HomeContent projects={projects} categories={categories} />;
};

export default Home;
