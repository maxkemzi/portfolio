'use client';

import {ProjectCardList} from '@/components';
import {Container, Section, Typography} from '@/components/ui';
import {Anchor} from '@/constants';
import {ProjectWithTechnologies} from '@/types';
import {motion, Transition} from 'framer-motion';

interface Props {
	projects: ProjectWithTechnologies[];
}

const MotionProjectCardList = motion(ProjectCardList);

const VIEWPORT_CONFIG = {once: true, amount: 0};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const ProjectsSection = (props: Props): JSX.Element => {
	const {projects} = props;
	return (
		<Section id={Anchor.PROJECTS}>
			<Container>
				<Typography className="mb-14" variant="h2" align="center">
					Projects
				</Typography>
				<MotionProjectCardList
					projects={projects}
					initial={{y: 50, opacity: 0}}
					whileInView={{y: 0, opacity: 1}}
					viewport={VIEWPORT_CONFIG}
					transition={TRANSITION_CONFIG}
				/>
			</Container>
		</Section>
	);
};

export default ProjectsSection;
