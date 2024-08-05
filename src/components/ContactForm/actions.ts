'use server';

import {actionClient} from '@/actions';
import {env} from '@/config';
import nodemailer from 'nodemailer';
import {schema} from './schema';

const transporter = nodemailer.createTransport({
	host: env.SMTP_HOST,
	port: env.SMTP_PORT,
	secure: false,
	auth: {
		user: env.SMTP_USER,
		pass: env.SMTP_PASSWORD,
	},
});

const sendContactMail = actionClient
	.schema(schema)
	.action(async ({parsedInput}) => {
		const {name, email, message} = parsedInput;

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
