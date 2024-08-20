'use client';

import {ContactForm} from '@/components';
import {Container, Section} from '@/components/ui';
import {motion, Transition} from 'framer-motion';
import {Anchor} from '@/constants';
import ContactCouple from './ContactCouple';

const VIEWPORT_CONFIG = {once: true, amount: 0.5};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const ContactSection = () => {
	return (
		<Section id={Anchor.CONTACT}>
			<Container size="sm">
				<div className="flex justify-center items-center gap-12">
					<motion.div
						className="flex-1"
						initial={{x: -50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={{...TRANSITION_CONFIG, delay: 0.6}}
					>
						<ContactCouple />
					</motion.div>
					<motion.div
						className="flex-1"
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
