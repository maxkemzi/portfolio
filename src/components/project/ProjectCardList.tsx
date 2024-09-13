'use client';

import {ForwardedRef, forwardRef} from 'react';
import {ProjectWithInclusions} from '@/types';
import {LayoutGroup, motion, Transition} from 'framer-motion';
import ProjectCard from './ProjectCard';
import {calcItemHeight} from './helpers';

interface Props {
	projects: ProjectWithInclusions[];
}

const COLS = 2;
const TRANSITION_CONFIG: Transition = {duration: 0.3, ease: 'easeOut'};

const ProjectCardList = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLUListElement>) => {
		const {projects} = props;

		return (
			<ul ref={ref} className="gap-6 -mb-6" style={{columns: COLS}}>
				<LayoutGroup>
					{projects.map((p, i) => {
						return (
							<motion.li
								key={p.id}
								className="mb-6"
								style={{
									height: calcItemHeight(i, projects.length, COLS),
								}}
								layout
								initial={{y: 50, opacity: 0}}
								animate={{y: 0, opacity: 1}}
								transition={TRANSITION_CONFIG}
							>
								<ProjectCard project={p} />
							</motion.li>
						);
					})}
				</LayoutGroup>
			</ul>
		);
	},
);

export default ProjectCardList;
