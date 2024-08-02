interface Technology {
	id: string;
	name: string;
}

interface Project {
	id: string;
	title: string;
	description: string;
	technologies: Technology[];
	screenshot: string;
	liveUrl: string;
	githubUrl: string;
}

export type {Project, Technology};
