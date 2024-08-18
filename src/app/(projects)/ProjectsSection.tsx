import {ProjectCardList} from '@/components';
import {Container, Typography} from '@/components/ui';
import {Anchor} from '@/constants';
import {Project} from '@/types';
import {motion, Transition} from 'framer-motion';

const PROJECTS: Project[] = [
	{
		id: '1',
		title: 'FOSS Directory',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
			{id: '5', name: 'Next.js'},
			{id: '6', name: 'Next.js'},
			{id: '7', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
	{
		id: '2',
		title: 'Cooper',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
	{
		id: '3',
		title: 'Cooper',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
	{
		id: '4',
		title: 'Cooper',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
	{
		id: '5',
		title: 'Cooper',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
	{
		id: '6',
		title: 'Cooper',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
	{
		id: '7',
		title: 'Cooper',
		description: 'Team Finder App',
		technologies: [
			{id: '1', name: 'Express.js'},
			{id: '2', name: 'PostgreSQL'},
			{id: '3', name: 'Socket.io'},
			{id: '4', name: 'Next.js'},
		],
		screenshot: '/images/foss-directory.png',
		liveUrl: 'https://github.com/maxkemzi/foss-directory-app',
		githubUrl: 'https://github.com/maxkemzi/foss-directory-app',
	},
];

const MotionProjectCardList = motion(ProjectCardList);

const VIEWPORT_CONFIG = {once: true, amount: 0};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const ProjectsSection = () => {
	return (
		<section id={Anchor.PROJECTS} className="py-20">
			<Container>
				<Typography className="mb-14" variant="h2" align="center">
					Projects
				</Typography>
				<MotionProjectCardList
					projects={PROJECTS}
					initial={{y: 50, opacity: 0}}
					whileInView={{y: 0, opacity: 1}}
					viewport={VIEWPORT_CONFIG}
					transition={TRANSITION_CONFIG}
				/>
			</Container>
		</section>
	);
};

export default ProjectsSection;
