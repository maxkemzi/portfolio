import {Project} from '@/types';
import {motion, Transition} from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Props {
	projects: Project[];
}

const VIEWPORT_CONFIG = {once: true, amount: 0.5};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const ProjectCardList = (props: Props) => {
	const {projects} = props;

	return (
		<ul className="flex flex-col gap-12">
			{projects.map((p, i) => {
				let flipOrder;

				if ((i + 1) % 2 === 0) {
					flipOrder = true;
				}

				return (
					<motion.li
						key={p.id}
						initial={{x: flipOrder ? 50 : -50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={TRANSITION_CONFIG}
					>
						<ProjectCard project={p} flipOrder={flipOrder} />
					</motion.li>
				);
			})}
		</ul>
	);
};

export default ProjectCardList;
