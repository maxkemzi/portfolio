'use client';

import {Container, Section, Typography} from '@/components/ui';
import Image from 'next/image';
import {motion, Transition} from 'framer-motion';
import {Anchor} from '@/constants';

const VIEWPORT_CONFIG = {once: true, amount: 0, margin: '0px 0px -100px 0px'};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const AboutSection = () => {
	return (
		<Section id={Anchor.ABOUT}>
			<Container size="sm">
				<div className="flex justify-center items-center gap-10 max-lg:gap-8 max-md:flex-col max-md:justify-normal max-md:gap-3 max-xxs:gap-2">
					<motion.div
						className="relative basis-[40%] aspect-square rounded-full overflow-hidden max-md:w-[50%] max-md:basis-auto"
						initial={{x: -50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={TRANSITION_CONFIG}
					>
						<Image
							fill
							objectFit="cover"
							sizes="100vw"
							src="/images/me.jpg"
							alt="my image"
						/>
					</motion.div>
					<motion.div
						className="basis-1/2 max-md:basis-auto"
						initial={{x: 50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={{...TRANSITION_CONFIG, delay: 0.6}}
					>
						<Typography
							className="mb-2 max-md:mb-1 max-md:text-center max-xxs:mb-0.5"
							variant="h2"
						>
							About me
						</Typography>
						<Typography>
							Hello! I’m Max, a software engineer specializing in backend
							development. I’m passionate about creating software that
							benefits society. Outside of work, I enjoy reading, working
							out at the gym, and focusing on healthy living. A romantic
							at heart, I value meaningful connections and thrive in team
							environments. Let’s build something great together!
						</Typography>
					</motion.div>
				</div>
			</Container>
		</Section>
	);
};

export default AboutSection;
