'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAction} from 'next-safe-action/hooks';
import {Button, TextField, Typography} from '../ui';
import {schema} from './schema';
import {sendContactMail} from './actions';
import ContactFormStatus from './ContactFormStatus';

const ContactForm = () => {
	const {execute, isExecuting, hasSucceeded, hasErrored} =
		useAction(sendContactMail);
	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});

	return (
		<div>
			<Typography className="mb-3" align="center" variant="h2">
				Contact
			</Typography>
			<form onSubmit={handleSubmit(data => execute(data))}>
				<ContactFormStatus
					hasSucceeded={hasSucceeded}
					hasErrored={hasErrored}
				/>
				<div className="flex flex-col gap-4 mb-5 w-full">
					<TextField
						label="Your name"
						placeholder="John Doe (HR)"
						error={errors.name?.message}
						{...register('name')}
					/>
					<TextField
						label="Your email"
						placeholder="j.doe@bestcompany.com"
						error={errors.email?.message}
						{...register('email')}
					/>
					<TextField
						label="Your message"
						placeholder="We'd like to see you in our team."
						error={errors.message?.message}
						multiline
						{...register('message')}
					/>
				</div>
				<Button
					className="block ml-auto mr-auto w-full"
					submit
					disabled={isExecuting}
				>
					Submit
				</Button>
			</form>
		</div>
	);
};

export default ContactForm;
