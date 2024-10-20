'use client';

import {ProjectCardList, ProjectCategoryFilters} from '@/components';
import {Container, Section, Typography} from '@/components/ui';
import {Anchor} from '@/constants';
import {ProjectWithInclusions} from '@/types';
import {ProjectCategory} from '@prisma/client';
import {motion, Transition} from 'framer-motion';
import {useMemo, useState} from 'react';

const MotionProjectCardList = motion(ProjectCardList);

const VIEWPORT_CONFIG = {once: true, amount: 0, margin: '0px 0px -100px 0px'};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

interface Props {
	projects: ProjectWithInclusions[];
	categories: ProjectCategory[];
}

const ProjectsSection = (props: Props): JSX.Element => {
	const {projects, categories} = props;

	const [activeCategoryId, setActiveCategoryId] = useState<string>();

	const handleCategoryClick = (id: string | undefined) =>
		setActiveCategoryId(id);

	const projectsByCategory = useMemo(() => {
		if (!activeCategoryId) return projects;
		return projects.filter(p => p.categoryId === activeCategoryId);
	}, [activeCategoryId, projects]);

	return (
		<Section id={Anchor.PROJECTS}>
			<Container>
				<Typography
					className="mb-6 max-md:mb-5 max-xxs:mb-4"
					variant="h2"
					align="center"
				>
					Projects
				</Typography>
				<ProjectCategoryFilters
					className="mb-6 max-md:mb-5 max-xxs:mb-4"
					categories={categories}
					activeCategoryId={activeCategoryId}
					onCategoryClick={handleCategoryClick}
				/>
				<MotionProjectCardList
					projects={projectsByCategory}
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
