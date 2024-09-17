'use client';

import {ForwardedRef, forwardRef} from 'react';
import {ProjectWithInclusions} from '@/types';
import {LayoutGroup, motion, Transition} from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Props {
	projects: ProjectWithInclusions[];
}

const TRANSITION_CONFIG: Transition = {duration: 0.3, ease: 'easeOut'};

const ProjectCardList = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLUListElement>) => {
		const {projects} = props;

		return (
			<ul
				ref={ref}
				className="w-full grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-5 max-xxs:gap-4"
			>
				<LayoutGroup>
					{projects.map(p => (
						<motion.li
							key={p.id}
							className="aspect-[16/10]"
							layout
							initial={{y: 50, opacity: 0}}
							animate={{y: 0, opacity: 1}}
							transition={TRANSITION_CONFIG}
						>
							<ProjectCard project={p} />
						</motion.li>
					))}
				</LayoutGroup>
			</ul>
		);
	},
);

export default ProjectCardList;
