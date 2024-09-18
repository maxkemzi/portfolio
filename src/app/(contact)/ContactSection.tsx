'use client';

import {ContactForm} from '@/components';
import {Container, Section} from '@/components/ui';
import {motion, Transition} from 'framer-motion';
import {Anchor} from '@/constants';
import ContactCouple from './ContactCouple';

const VIEWPORT_CONFIG = {once: true, amount: 0, margin: '0px 0px -100px 0px'};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const ContactSection = () => {
	return (
		<Section id={Anchor.CONTACT}>
			<Container size="sm">
				<div className="sm:flex sm:justify-center sm:items-center lg:gap-10 md:gap-8 sm:gap-5">
					<motion.div
						className="sm:basis-1/2 max-sm:hidden"
						initial={{x: -50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={{...TRANSITION_CONFIG, delay: 0.6}}
					>
						<ContactCouple />
					</motion.div>
					<motion.div
						className="sm:basis-1/2 max-sm:max-w-[350px] max-sm:w-full max-sm:mx-auto"
						initial={{x: 50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={TRANSITION_CONFIG}
					>
						<ContactForm />
					</motion.div>
				</div>
			</Container>
		</Section>
	);
};

export default ContactSection;
