import {ZodError} from 'zod';

const originalEnv = process.env;

beforeEach(() => {
	vi.resetModules();
	process.env = {...originalEnv};
});

afterEach(() => {
	process.env = originalEnv;
});

const loadEnvModule = async () => {
	const env = (await import('@/config/env')).default;
	return env;
};

it('should validate and parse valid environment variables correctly', async () => {
	process.env.SMTP_HOST = 'smtp.example.com';
	process.env.SMTP_PORT = '587';
	process.env.SMTP_USER = 'user@example.com';
	process.env.SMTP_PASSWORD = 'password123';
	process.env.EMAIL_TO = 'recipient@example.com';

	const parsedEnv = await loadEnvModule();

	expect(parsedEnv.SMTP_HOST).toBe('smtp.example.com');
	expect(parsedEnv.SMTP_PORT).toBe(587);
	expect(parsedEnv.SMTP_USER).toBe('user@example.com');
	expect(parsedEnv.SMTP_PASSWORD).toBe('password123');
	expect(parsedEnv.EMAIL_TO).toBe('recipient@example.com');
});

it('should throw an error if SMTP_PORT is not a number', async () => {
	process.env.SMTP_HOST = 'smtp.example.com';
	process.env.SMTP_PORT = 'not-a-number';
	process.env.SMTP_USER = 'user@example.com';
	process.env.SMTP_PASSWORD = 'password123';
	process.env.EMAIL_TO = 'recipient@example.com';

	const error = new ZodError([
		{code: 'custom', message: 'Not a number.', path: ['SMTP_PORT']},
	]);
	expect(loadEnvModule()).rejects.toThrow(error);
});

it('should throw an error if SMTP_USER is not a valid email', () => {
	process.env.SMTP_HOST = 'smtp.example.com';
	process.env.SMTP_PORT = '587';
	process.env.SMTP_USER = 'invalid-email';
	process.env.SMTP_PASSWORD = 'password123';
	process.env.EMAIL_TO = 'recipient@example.com';

	const error = new ZodError([
		{
			validation: 'email',
			code: 'invalid_string',
			message: 'Invalid email',
			path: ['SMTP_USER'],
		},
	]);
	expect(loadEnvModule()).rejects.toThrow(error);
});

it('should throw an error if EMAIL_TO is not a valid email', () => {
	process.env.SMTP_HOST = 'smtp.example.com';
	process.env.SMTP_PORT = '587';
	process.env.SMTP_USER = 'user@example.com';
	process.env.SMTP_PASSWORD = 'password123';
	process.env.EMAIL_TO = 'invalid-email';

	const error = new ZodError([
		{
			validation: 'email',
			code: 'invalid_string',
			message: 'Invalid email',
			path: ['EMAIL_TO'],
		},
	]);
	expect(loadEnvModule()).rejects.toThrow(error);
});

it('should throw an error if any required variable is missing', () => {
	delete process.env.SMTP_HOST;
	process.env.SMTP_PORT = '587';
	process.env.SMTP_USER = 'user@example.com';
	process.env.SMTP_PASSWORD = 'password123';
	process.env.EMAIL_TO = 'recipient@example.com';

	const error = new ZodError([
		{
			code: 'invalid_type',
			expected: 'string',
			received: 'undefined',
			path: ['SMTP_HOST'],
			message: 'Required',
		},
	]);
	expect(loadEnvModule()).rejects.toThrow(error);
});

it('should throw an error if any variable is an empty string', () => {
	process.env.SMTP_HOST = '';
	process.env.SMTP_PORT = '587';
	process.env.SMTP_USER = 'user@example.com';
	process.env.SMTP_PASSWORD = 'password123';
	process.env.EMAIL_TO = 'recipient@example.com';

	const error = new ZodError([
		{
			code: 'too_small',
			minimum: 1,
			type: 'string',
			inclusive: true,
			exact: false,
			message: 'String must contain at least 1 character(s)',
			path: ['SMTP_HOST'],
		},
	]);
	expect(loadEnvModule()).rejects.toThrow(error);
});
