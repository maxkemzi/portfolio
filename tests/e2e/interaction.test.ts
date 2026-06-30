/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import {expect, test} from '@playwright/test';

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

// test('filters should filter projects by category', async ({page}) => {
// 	await page.goto('/');
//
// 	await expect(page.getByTestId('project')).toHaveCount(mockProjects.length);
//
// 	await page.getByRole('button', {name: /all/i}).click();
// 	await expect(page.getByTestId('project')).toHaveCount(mockProjects.length);
//
// 	for (const {id, name} of mockCategories) {
// 		await page.getByRole('button', {name: new RegExp(name, 'i')}).click();
//
// 		const projectLocator = page.getByTestId('project');
// 		await expect(projectLocator).toHaveCount(
// 			mockProjects.filter(p => p.categoryId === id).length,
// 		);
//
// 		const projects = await projectLocator.all();
// 		for (const project of projects) {
// 			await expect(project).toHaveAttribute('data-category', name);
// 		}
// 	}
// });
