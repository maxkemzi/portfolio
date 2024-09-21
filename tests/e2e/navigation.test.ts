/* eslint-disable no-await-in-loop */
import {test, expect} from '@playwright/test';

test('should navigate to the home page', async ({page}) => {
	await page.goto('/#hero');

	await page.getByRole('link', {name: /home page/i}).click();

	await expect(page).toHaveURL('/');
});

test.describe('navbar section links', () => {
	test('should navigate to the hero section', async ({page}) => {
		await page.goto('/');

		await page.getByRole('link', {name: /hero/i}).click();

		await expect(page).toHaveURL('/#hero');
		await expect(page.locator('#hero')).toBeInViewport();
	});

	test('should navigate to the about section', async ({page}) => {
		await page.goto('/');

		await page.getByRole('link', {name: /about/i}).click();

		await expect(page).toHaveURL('/#about');
		await expect(page.locator('#about')).toBeInViewport();
	});

	test('should navigate to the projects section', async ({page}) => {
		await page.goto('/');

		await page.getByRole('link', {name: /projects/i}).click();

		await expect(page).toHaveURL('/#projects');
		await expect(page.locator('#projects')).toBeInViewport();
	});

	test('should navigate to the contact section', async ({page}) => {
		await page.goto('/');

		await page.getByRole('link', {name: /contact/i}).click();

		await expect(page).toHaveURL('/#contact');
		await expect(page.locator('#contact')).toBeInViewport();
	});
});

test('should navigate to the section below the hero section', async ({
	page,
}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /continue journey/i}).click();

	await expect(page).toHaveURL('/#about');
	await expect(page.locator('#about')).toBeInViewport();
});

test.describe('social profile links', () => {
	test('should open a new tab with github profile', async ({
		page,
		context,
	}) => {
		await page.goto('/');

		const pagePromise = context.waitForEvent('page');
		await page.getByRole('link', {name: /github profile/i}).click();
		const newPage = await pagePromise;

		await expect(newPage).toHaveURL('https://github.com/maxkemzi');
	});

	test('should open a new tab with telegram profile', async ({
		page,
		context,
	}) => {
		await page.goto('/');

		const pagePromise = context.waitForEvent('page');
		await page.getByRole('link', {name: /telegram profile/i}).click();
		const newPage = await pagePromise;

		await expect(newPage).toHaveURL('https://t.me/maxkemzi');
	});
});

test('each project link navigates to the correct project page', async ({
	page,
}) => {
	const selector = 'a[href^="/projects/"]';
	await page.goto('/');

	await page.waitForSelector(selector);

	const projectLinks = page.locator(selector);
	const count = await projectLinks.count();

	for (let i = 0; i < count; i += 1) {
		const href = await projectLinks.nth(i).getAttribute('href');
		if (href) {
			await projectLinks.nth(i).click();

			await expect(page).toHaveURL(href);

			await page.goBack();
		}
	}
});
