'use server';

import {actionClient} from '@/actions';
import {env} from '@/config';
import nodemailer from 'nodemailer';
import {z} from 'zod';
import {zfd} from 'zod-form-data';

const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: false,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASSWORD,
	},
});

const validationSchema = zfd.formData({
	name: zfd.text(z.string().trim().min(1)),
	email: zfd.text(z.string().trim().min(1).email()),
	message: zfd.text(z.string().trim().min(1)),
});

const sendContactMail = actionClient
	.schema(validationSchema)
	.action(async ({parsedInput: {name, email, message}}) => {
		await transporter.sendMail({
			from: env.SMTP_USER,
			to: env.EMAIL_TO,
			subject: `${name} has contacted!`,
			text: message,
			html: `
			<div>
				<h1>${name}</h1>
				<h2>${email}</h2>
				<p>${message}</p>
			</div>
		`,
		});

		return {success: 'Email has been sent.'};
	});

export {sendContactMail};
