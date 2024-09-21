import {test, expect} from '@playwright/test';

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
	const selector = 'a[href^="/projects/"]';
	await page.goto('/');

	await page.waitForSelector(selector);

	let count = await page.locator(selector).count();
	expect(count).toBe(5);

	const buildCategorySelector = (category: string) =>
		`${selector}[data-category="${category}" i]`;

	await page.getByRole('button', {name: /full-stack/i}).click();
	count = await page.locator(buildCategorySelector('full-stack')).count();
	expect(count).toBe(3);

	await page.getByRole('button', {name: /front-end/i}).click();
	count = await page.locator(buildCategorySelector('front-end')).count();
	expect(count).toBe(1);

	await page.getByRole('button', {name: /back-end/i}).click();
	count = await page.locator(buildCategorySelector('back-end')).count();
	expect(count).toBe(1);

	await page.getByRole('button', {name: /all/i}).click();
	count = await page.locator(selector).count();
	expect(count).toBe(5);
});
