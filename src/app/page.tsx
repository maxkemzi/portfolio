import {prisma} from '@/db';
import Content from './Content';

const Home = async () => {
	const projects = await prisma.project.findMany({
		include: {projectTechnologies: {include: {technology: true}}},
	});

	return <Content projects={projects} />;
};

export default Home;
