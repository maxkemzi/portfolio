import {Technology} from '@prisma/client';

const capitalizeName = (name: string): string => {
	const trimmed = name.trim();
	if (trimmed.length === 0) return '';

	return trimmed
		.split(' ')
		.filter(w => w.length > 0)
		.map(w => `${w[0].toUpperCase()}${w.slice(1)}`)
		.join(' ');
};

const sortTechnologiesByPriority = (technologies: Technology[]) =>
	technologies.toSorted((a, b) => a.priority - b.priority);

export {capitalizeName, sortTechnologiesByPriority};
