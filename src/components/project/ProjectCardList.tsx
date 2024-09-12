import {ForwardedRef, forwardRef} from 'react';
import {ProjectWithTechnologies} from '@/types';
import ProjectCard from './ProjectCard';
import {calcItemHeight} from './helpers';

interface Props {
	projects: ProjectWithTechnologies[];
}

const COLS = 2;

const ProjectCardList = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLUListElement>) => {
		const {projects} = props;

		return (
			<ul ref={ref} className="gap-7 -mb-7" style={{columns: COLS}}>
				{projects.map((p, i) => {
					return (
						<li
							key={p.id}
							className="mb-7"
							style={{
								height: calcItemHeight(i, projects.length, COLS),
							}}
						>
							<ProjectCard project={p} />
						</li>
					);
				})}
			</ul>
		);
	},
);

export default ProjectCardList;
