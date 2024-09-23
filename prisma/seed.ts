import {PrismaClient} from '@prisma/client';
import {mockCategories, mockProjects} from './mockData';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.projectCategory.createMany({data: mockCategories});
	await prisma.project.createMany({data: mockProjects});
};

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
