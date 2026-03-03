'use client';

import {ContactForm} from '@/components';
import {Container, Section} from '@/components/ui';
import {motion, Transition} from 'framer-motion';
import {Anchor} from '@/constants';

const VIEWPORT_CONFIG = {once: true, amount: 0, margin: '0px 0px -100px 0px'};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const ContactSection = () => {
	return (
		<Section id={Anchor.CONTACT}>
			<Container size="sm">
				<motion.div
					className="max-w-[400px] w-full mx-auto"
					initial={{y: 50, opacity: 0}}
					whileInView={{y: 0, opacity: 1}}
					viewport={VIEWPORT_CONFIG}
					transition={TRANSITION_CONFIG}
				>
					<ContactForm />
				</motion.div>
			</Container>
		</Section>
	);
};

export default ContactSection;
