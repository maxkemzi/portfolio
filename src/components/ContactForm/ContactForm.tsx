'use client';

import {useAction} from 'next-safe-action/hooks';
import {sendContactMail} from './actions';

const ContactForm = () => {
	const {execute} = useAction(sendContactMail);

	return (
		<form action={execute}>
			<div>
				<label htmlFor="name">
					Your name
					<input name="name" placeholder="Enter your name" />
				</label>
				<label htmlFor="email">
					Your email
					<input name="email" placeholder="Enter your email" />
				</label>
				<label htmlFor="message">
					Your message
					<textarea name="message" placeholder="Enter your message" />
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default ContactForm;
