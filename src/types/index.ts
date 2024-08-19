import {Prisma} from '@prisma/client';

const projectWithTechnologies = Prisma.validator<Prisma.ProjectDefaultArgs>()({
	include: {projectTechnologies: {include: {technology: true}}},
});

type ProjectWithTechnologies = Prisma.ProjectGetPayload<
	typeof projectWithTechnologies
>;

export type {ProjectWithTechnologies};
