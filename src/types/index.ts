import {Prisma} from '@prisma/client';

const projectWithInclusions = Prisma.validator<Prisma.ProjectDefaultArgs>()({
	include: {
		ProjectTechnologies: {include: {technology: true}},
		ProjectCategory: true,
	},
});

type ProjectWithInclusions = Prisma.ProjectGetPayload<
	typeof projectWithInclusions
>;

export type {ProjectWithInclusions};
