'use client';

import {useAction} from 'next-safe-action/hooks';
import {sendContactMail} from './actions';
import {Button, TextField, Typography} from '../ui';

const ContactForm = () => {
	const {execute} = useAction(sendContactMail);

	return (
		<div>
			<Typography className="mb-3" align="center" variant="h2">
				Contact
			</Typography>
			<form action={execute}>
				<div className="flex flex-col gap-4 mb-5 w-full">
					<TextField
						label="Your name"
						name="name"
						placeholder="Enter your name"
					/>
					<TextField
						label="Your email"
						name="email"
						placeholder="Enter your email"
					/>
					<TextField
						label="Your message"
						name="message"
						placeholder="Enter your message"
						isMultiline
					/>
				</div>
				<Button className="block ml-auto mr-auto w-full" isSubmit>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default ContactForm;
