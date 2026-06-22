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
			<Container>
				<div className="flex justify-center items-center gap-10 max-lg:gap-8 max-md:flex-col max-md:justify-normal max-md:gap-3 max-xxs:gap-2">
					<motion.div
						className="relative w-[325px] aspect-square rounded-full overflow-hidden max-md:w-[50%] max-md:basis-auto"
						initial={{x: -50, opacity: 0}}
						whileInView={{x: 0, opacity: 1}}
						viewport={VIEWPORT_CONFIG}
						transition={TRANSITION_CONFIG}
					>
						<Image
							className="object-cover"
							fill
							sizes="(max-width: 768px) 50vw, 325px"
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
							className="mb-3 max-md:mb-2 max-md:text-center max-xxs:mb-1"
							variant="h2"
						>
							About me
						</Typography>
						<Typography>
							With 4 years of experience in full-stack development, I
							specialize in building performant, accessible web
							applications with a focus on e-commerce and real-world
							product development. My stack centers around React,
							Next.js, and TypeScript on the frontend, paired with
							Node.js, Spring Boot, and various databases on the backend.
							I studied Software Engineering at Taras Shevchenko National
							University of Kyiv before relocating to Riga, Latvia
							following the start of the war in Ukraine. Since then, I
							have continued developing my skills independently —
							shipping real-world projects, completing professional
							certifications, and gaining hands-on experience with mobile
							development. I&apos;m fluent in English, Russian, and
							Ukrainian, and based in Riga, Latvia.
						</Typography>
					</motion.div>
				</div>
			</Container>
		</Section>
	);
};

export default AboutSection;
