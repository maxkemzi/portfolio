import {z} from 'zod';

const schema = z.object({
	name: z
		.string({invalid_type_error: 'Name must be a string'})
		.trim()
		.min(1, 'Name is required')
		.max(100, 'Name exceeds 100 characters limit'),
	email: z
		.string({invalid_type_error: 'Email must be a string'})
		.trim()
		.min(1, 'Email is required')
		.email('Email is invalid'),
	message: z
		.string({invalid_type_error: 'Message must be a string'})
		.trim()
		.min(1, 'Message is required')
		.max(400, 'Message exceeds 400 characters limit'),
});

export {schema};
