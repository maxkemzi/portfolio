import {test, expect} from '@playwright/test';

test.describe('contact form', () => {
	test('email link should have correct href', async ({page}) => {
		const EMAIL = 'iam.maxkyrychenko@gmail.com';

		await page.goto('/');

		const link = page.getByRole('link', {name: EMAIL});
		await expect(link).toHaveAttribute('href', `mailto:${EMAIL}`);
	});

	// Flaky
	test('should show errors when submitting with empty data', async ({
		page,
	}) => {
		await page.goto('/');

		await page.getByRole('button', {name: /submit/i}).click();

		await expect(page.getByText('Name is required')).toBeVisible();
		await expect(page.getByText('Email is required')).toBeVisible();
		await expect(page.getByText('Message is required')).toBeVisible();
	});

	test('should show errors when submitting with invalid data', async ({
		page,
	}) => {
		await page.goto('/');

		await page.getByLabel('Name').fill('a'.repeat(101));
		await page.getByLabel('Email').fill('example.com');
		await page.getByLabel('Message').fill('a'.repeat(401));

		await page.getByRole('button', {name: /submit/i}).click();

		await expect(
			page.getByText('Name exceeds 100 characters limit'),
		).toBeVisible();
		await expect(page.getByText('Email is invalid')).toBeVisible();
		await expect(
			page.getByText('Message exceeds 400 characters limit'),
		).toBeVisible();
	});

	// Flaky
	test('should submit successfully with valid data', async ({
		page,
		baseURL,
	}) => {
		await page.goto('/');

		await page.getByLabel('Name').fill('John Doe');
		await page.getByLabel('Email').fill('john@example.com');
		await page.getByLabel('Message').fill('We would love to work with you!');

		const responsePromise = page.waitForResponse(
			res =>
				res.url() === `${baseURL}/` &&
				res.request().method() === 'POST' &&
				res.status() === 200,
		);

		const button = page.getByRole('button', {name: /submit/i});
		await button.click();

		await expect(button).toBeDisabled();

		await responsePromise;

		await expect(button).toBeEnabled();
		await expect(button).toHaveCSS('background-color', 'rgb(62, 173, 173)');
	});
});
