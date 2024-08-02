import {z} from 'zod';

const VARS = {
	SMTP_HOST: process.env.SMTP_HOST,
	SMTP_PORT: process.env.SMTP_PORT,
	SMTP_USER: process.env.SMTP_USER,
	SMTP_PASSWORD: process.env.SMTP_PASSWORD,
	EMAIL_TO: process.env.EMAIL_TO,
};

const commonValidation = () => z.string().trim().min(1);

const stringToNumber = (value: string, ctx: z.RefinementCtx) => {
	const transformed = parseInt(value, 10);

	if (Number.isNaN(transformed)) {
		ctx.addIssue({
			code: z.ZodIssueCode.custom,
			message: 'Not a number.',
		});

		return z.NEVER;
	}

	return transformed;
};

const validationSchema = z.object({
	SMTP_HOST: commonValidation(),
	SMTP_PORT: commonValidation().transform(stringToNumber),
	SMTP_USER: commonValidation().email(),
	SMTP_PASSWORD: commonValidation(),
	EMAIL_TO: commonValidation().email(),
});

const env = validationSchema.parse(VARS);
export default env;
