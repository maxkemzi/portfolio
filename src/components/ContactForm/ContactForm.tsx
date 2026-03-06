'use client';

import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {useAction} from 'next-safe-action/hooks';
import {useEffect, useMemo, useState} from 'react';
import {Button, ButtonProps, CustomLink, TextField, Typography} from '../ui';
import {schema} from './schema';
import {sendContactMail} from './actions';

const ContactForm = () => {
	const {
		register,
		handleSubmit,
		formState: {errors, touchedFields},
		reset,
	} = useForm<z.infer<typeof schema>>({
		resolver: zodResolver(schema),
	});
	const {execute, isExecuting, hasSucceeded, hasErrored} = useAction(
		sendContactMail,
		{onSettled: ({input}) => reset(input)},
	);

	const isTouched = useMemo(() => {
		return touchedFields.name || touchedFields.email || touchedFields.message;
	}, [touchedFields.name, touchedFields.email, touchedFields.message]);

	const [buttonColor, setButtonColor] = useState<ButtonProps['color']>();
	useEffect(() => {
		if (isTouched) {
			setButtonColor(undefined);
		} else if (hasSucceeded) {
			setButtonColor('success');
		} else if (hasErrored) {
			setButtonColor('danger');
		}
	}, [isTouched, hasSucceeded, hasErrored]);

	return (
		<div>
			<Typography
				className="mb-2 max-md:mb-1 max-xxs:mb-0.5"
				align="center"
				variant="h2"
			>
				Contact
			</Typography>
			<Typography
				className="mb-5 max-md:mb-4 max-xxs:mb-3"
				align="center"
				noWrap
			>
				Or shoot an email directly on <br />
				<CustomLink href="mailto:iam.maxkyrychenko@gmail.com" external>
					iam.maxkyrychenko@gmail.com
				</CustomLink>
			</Typography>
			<form onSubmit={handleSubmit(values => execute(values))}>
				<div className="flex flex-col gap-4 mb-6 w-full max-md:gap-3 max-md:mb-4 max-xxs:gap-2 max-xxs:mb-3">
					<TextField
						label="Name"
						placeholder="Your name"
						error={errors.name?.message}
						{...register('name')}
					/>
					<TextField
						label="Email"
						placeholder="Your email"
						error={errors.email?.message}
						{...register('email')}
					/>
					<TextField
						label="Message"
						placeholder="Your message"
						error={errors.message?.message}
						multiline
						{...register('message')}
					/>
				</div>
				<Button
					className="w-full"
					color={buttonColor}
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
