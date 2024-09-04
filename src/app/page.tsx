import {prisma} from '@/db';
import HomeContent from './HomeContent';

const Home = async () => {
	const projects = await prisma.project.findMany({
		include: {projectTechnologies: {include: {technology: true}}},
	});

	return <HomeContent projects={projects} />;
};

export default Home;
