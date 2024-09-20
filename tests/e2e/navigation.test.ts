import {test, expect} from '@playwright/test';

test('links for navigating to sections', async ({page}) => {
	await page.goto('/');

	await page.getByRole('link', {name: /hero/i}).click();
	await expect(page).toHaveURL('/#hero');
	await expect(page.locator('#hero')).toBeInViewport();

	await page.getByRole('link', {name: /about/i}).click();
	await expect(page).toHaveURL('/#about');
	await expect(page.locator('#about')).toBeInViewport();

	await page.getByRole('link', {name: /projects/i}).click();
	await expect(page).toHaveURL('/#projects');
	await expect(page.locator('#projects')).toBeInViewport();

	await page.getByRole('link', {name: /contact/i}).click();
	await expect(page).toHaveURL('/#contact');
	await expect(page.locator('#contact')).toBeInViewport();
});
