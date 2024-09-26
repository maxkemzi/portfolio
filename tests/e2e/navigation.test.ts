/* eslint-disable no-await-in-loop */
import {test, expect} from '@playwright/test';
import {mockProjects} from '../../prisma/mockData';

// Flaky
test('logo link should navigate to the home page', async ({page}) => {
	await page.goto('/#hero');

	await page.getByRole('link', {name: /home page/i}).click();

	await expect(page).toHaveURL('/');
});

test('hero link should navigate to the hero section', async ({page}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /hero/i}).click();

	await expect(page).toHaveURL('/#hero');
	await expect(page.locator('#hero')).toBeInViewport();
});

test('about link should navigate to the about section', async ({page}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /about/i}).click();

	await expect(page).toHaveURL('/#about');
	await expect(page.locator('#about')).toBeInViewport();
});

test('projects link should navigate to the projects section', async ({
	page,
}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /projects/i}).click();

	await expect(page).toHaveURL('/#projects');
	await expect(page.locator('#projects')).toBeInViewport();
});

test('contact link should navigate to the contact section', async ({page}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /contact/i}).click();

	await expect(page).toHaveURL('/#contact');
	await expect(page.locator('#contact')).toBeInViewport();
});

test('continue journey link should navigate to the section below the hero section', async ({
	page,
}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /continue journey/i}).click();

	await expect(page).toHaveURL('/#about');
	await expect(page.locator('#about')).toBeInViewport();
});

test('github link should open a new tab with github profile', async ({
	page,
	context,
}) => {
	await page.goto('/');

	const pagePromise = context.waitForEvent('page');
	await page.getByRole('link', {name: /github profile/i}).click();
	const newPage = await pagePromise;

	expect(newPage.url()).toBe('https://github.com/maxkemzi');
});

test('telegram link should open a new tab with telegram profile', async ({
	page,
	context,
}) => {
	await page.goto('/');

	const pagePromise = context.waitForEvent('page');
	await page.getByRole('link', {name: /telegram profile/i}).click();
	const newPage = await pagePromise;

	expect(newPage.url()).toBe('https://t.me/maxkemzi');
});

test('each project link navigates to the correct project page', async ({
	page,
}) => {
	await page.goto('/');

	const projects = await page.getByTestId('project').all();
	// eslint-disable-next-line no-restricted-syntax
	for (const project of projects) {
		const href = await project.getAttribute('href');
		if (href) {
			await project.click();

			await expect(page).toHaveURL(href);

			await page.goBack();
		}
	}
});

test("project's live app link should navigate to the correct link", async ({
	page,
	context,
}) => {
	const mockProject = mockProjects[0];

	await page.goto(`/projects/${mockProject.name}`);

	const pagePromise = context.waitForEvent('page');
	await page.getByRole('link', {name: /live app/i}).click();
	const newPage = await pagePromise;

	expect(newPage.url()).toBe(mockProject.liveUrl);
});

test("project's repository link should navigate to the correct link", async ({
	page,
	context,
}) => {
	const mockProject = mockProjects[0];

	await page.goto(`/projects/${mockProject.name}`);

	const pagePromise = context.waitForEvent('page');
	await page.getByRole('link', {name: /repository/i}).click();
	const newPage = await pagePromise;

	expect(newPage.url()).toBe(mockProject.repoUrl);
});
