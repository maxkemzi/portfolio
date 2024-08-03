'use client';

import {Container, Typography} from '@/components/ui';
import {Anchor} from '@/constants';
import Image from 'next/image';
import {motion, Transition} from 'framer-motion';

const VIEWPORT_CONFIG = {once: true, amount: 0.5};
const TRANSITION_CONFIG: Transition = {duration: 1, ease: 'easeOut'};

const AboutSection = () => {
	return (
		<section id={Anchor.ABOUT} className="py-20">
			<Container size="sm">
				<div className="flex justify-center items-center gap-12">
					<motion.div
						className="relative shrink-0 flex-1 aspect-square bg-secondary-main rounded-full overflow-hidden"
						initial={{x: -50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={TRANSITION_CONFIG}
					>
						<Image
							className="absolute top-0 left-[53%] translate-x-[-50%] scale-x-[-1] rotate-[5deg]"
							width={705}
							height={1099}
							sizes="100vw"
							src="/images/me.png"
							alt="my image"
						/>
					</motion.div>
					<motion.div
						className="flex-1"
						initial={{x: 50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={{...TRANSITION_CONFIG, delay: 0.6}}
					>
						<Typography className="mb-3" variant="h2">
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
		</section>
	);
};

export default AboutSection;
