import {ForwardedRef, forwardRef} from 'react';
import {ProjectWithTechnologies} from '@/types';
import ProjectCard from './ProjectCard';

interface Props {
	projects: ProjectWithTechnologies[];
}

const COLS = 2;

const calcItemHeight = (index: number, length: number) => {
	const SMALL_HEIGHT = 350;
	const LARGE_HEIGHT = 450;

	const rows = Math.ceil(length / COLS);

	const rowIndex = index % rows;
	const columnIndex = Math.floor(index / rows);

	const evenPattern = [SMALL_HEIGHT, LARGE_HEIGHT];
	const oddPattern = [LARGE_HEIGHT, SMALL_HEIGHT];

	const heightPattern = columnIndex % 2 === 0 ? evenPattern : oddPattern;

	return heightPattern[rowIndex % 2];
};

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
								height: calcItemHeight(i, projects.length),
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
