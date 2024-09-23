import {Status} from '@prisma/client';

const mockCategories = [
	{id: '66e405f16975927fb0fcb517', name: 'category-1'},
	{id: '66e4061a6975927fb0fcb519', name: 'category-2'},
];

const mockProjects = [
	{
		id: '66c30e6549f0c597d3d3333c',
		name: 'project-1',
		title: 'Project 1',
		description: 'Description 1.',
		overview: 'Overview 1.',
		image: '/images/mock.gif',
		liveUrl: 'https://github.com/maxkemzi/project-1',
		repoUrl: 'https://github.com/maxkemzi/project-1',
		status: Status.completed,
		categoryId: mockCategories[0].id,
		startedAt: '2022-07-15T10:52:35.000+00:00',
	},
	{
		id: '66dc2d9f0d04036bf8e5e0bd',
		name: 'project-2',
		title: 'Project 2',
		description: 'Description 2.',
		overview: 'Overview 2.',
		image: '/images/mock.gif',
		liveUrl: 'https://github.com/maxkemzi/project-2',
		repoUrl: 'https://github.com/maxkemzi/project-2',
		status: Status.completed,
		categoryId: mockCategories[0].id,
		startedAt: '2022-07-15T10:52:35.000+00:00',
	},
	{
		id: '66e037884e69abdd10c8b502',
		name: 'project-3',
		title: 'Project 3',
		description: 'Description 3.',
		overview: 'Overview 3.',
		image: '/images/mock.gif',
		liveUrl: 'https://github.com/maxkemzi/project-3',
		repoUrl: 'https://github.com/maxkemzi/project-3',
		status: Status.completed,
		categoryId: mockCategories[1].id,
		startedAt: '2022-07-15T10:52:35.000+00:00',
	},
];

export {mockCategories, mockProjects};
