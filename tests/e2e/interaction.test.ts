/* eslint-disable no-await-in-loop */
import {test, expect} from '@playwright/test';
import {mockCategories, mockProjects} from '../../prisma/mockData';

test('download cv button should download .pdf file of CV on click', async ({
	page,
}) => {
	await page.goto('/');

	const downloadPromise = page.waitForEvent('download');
	await page.getByRole('link', {name: /download cv/i}).click();
	const download = await downloadPromise;

	const fileName = download.suggestedFilename();
	expect(fileName).toBe('CV_Maksym_Kyrychenko.pdf');
});

test('filters should filter projects by category', async ({page}) => {
	await page.goto('/');

	const projectSelector = 'a[data-type="project"]';
	const filterSelector = 'button[data-type="category-filter"]';
	await Promise.all([
		page.waitForSelector(projectSelector),
		page.waitForSelector(filterSelector),
	]);

	await expect(page.locator(projectSelector)).toHaveCount(mockProjects.length);

	await page.getByRole('button', {name: /all/i}).click();
	await expect(page.locator(projectSelector)).toHaveCount(mockProjects.length);

	const buildCategorySelector = (category: string) =>
		`${projectSelector}[data-category="${category}" i]`;

	// eslint-disable-next-line no-restricted-syntax
	for (const {id, name} of mockCategories) {
		await page.getByRole('button', {name: new RegExp(name, 'i')}).click();
		await expect(page.locator(buildCategorySelector(name))).toHaveCount(
			mockProjects.filter(p => p.categoryId === id).length,
		);
	}
});
