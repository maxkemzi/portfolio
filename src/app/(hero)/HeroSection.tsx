'use client';

import {
	AnimatedText,
	Button,
	calcAnimatedCharDelay,
	Container,
	Typography,
} from '@/components/ui';
import {CrosshairSimple} from '@phosphor-icons/react/dist/ssr';
import {motion, useAnimation} from 'framer-motion';
import {ForwardedRef, forwardRef, useEffect, useState} from 'react';
import {Anchor, Color} from '@/constants';
import classNames from 'classnames';
import HeroWave from './HeroWave';
import HeroMoon from './HeroMoon';
import HeroDownButton from './HeroDownButton';

interface Props {
	waveWidth: number;
	moonTopPos: number;
}

const MOON_SIZE = 370;
const CROSSHAIR_SIZE = 260;

const NB_SPACE = '\u00A0';
const FIRST_TITLE_ROW = `Hi${NB_SPACE}there,${NB_SPACE}I’m${NB_SPACE}`;
const FIRST_TITLE_HIGHLIGHTED_ROW = 'Max';
const SECOND_TITLE_ROW = `I’m${NB_SPACE}a${NB_SPACE}software${NB_SPACE}engineer`;

const MotionButton = motion(Button);

const HeroSection = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {waveWidth, moonTopPos} = props;

		const controls = useAnimation();
		const [hasAnimated, setHasAnimated] = useState(false);

		useEffect(() => {
			if (hasAnimated) {
				controls.set({
					top: moonTopPos + (MOON_SIZE / 2 - CROSSHAIR_SIZE / 2),
				});
				return;
			}

			const startAnimation = async () => {
				const yTopPos = moonTopPos - CROSSHAIR_SIZE / 2;
				const yCenterPos =
					moonTopPos + (MOON_SIZE / 2 - CROSSHAIR_SIZE / 2);
				const yBottomPos = moonTopPos + MOON_SIZE - CROSSHAIR_SIZE / 2;

				const xCenterPos = MOON_SIZE / 2 - CROSSHAIR_SIZE / 2;
				const xLeftPos = MOON_SIZE - CROSSHAIR_SIZE / 2;
				const xRightPos = -CROSSHAIR_SIZE / 2;

				await controls.start({
					top: [yTopPos, yCenterPos, yBottomPos, yCenterPos, yCenterPos],
					right: [xCenterPos, xLeftPos, xCenterPos, xRightPos, xCenterPos],
					transition: {
						duration: 4,
						ease: 'easeInOut',
					},
				});

				setHasAnimated(true);
			};

			startAnimation();
		}, [controls, hasAnimated, moonTopPos]);

		return (
			<section ref={ref} id={Anchor.HERO} className="h-screen">
				<Container size="lg">
					<div className="h-full flex flex-col items-center justify-center">
						<Typography className="mb-9" variant="h1" align="center">
							<AnimatedText text={FIRST_TITLE_ROW} />
							<AnimatedText
								variant="highlight"
								text={FIRST_TITLE_HIGHLIGHTED_ROW}
								delay={calcAnimatedCharDelay(FIRST_TITLE_ROW.length)}
							/>
							<br />
							<AnimatedText
								text={SECOND_TITLE_ROW}
								delay={calcAnimatedCharDelay(
									FIRST_TITLE_ROW.length +
										FIRST_TITLE_HIGHLIGHTED_ROW.length,
								)}
							/>
						</Typography>
						<MotionButton
							initial={{y: 5, opacity: 0}}
							animate={{y: 0, opacity: 1}}
							transition={{
								delay: calcAnimatedCharDelay(
									FIRST_TITLE_ROW.length +
										FIRST_TITLE_HIGHLIGHTED_ROW.length +
										SECOND_TITLE_ROW.length,
								),
								duration: 0.5,
							}}
						>
							Download CV
						</MotionButton>
					</div>
					<HeroMoon
						className="absolute right-0 z-[-2] opacity-80"
						style={{top: moonTopPos}}
						size={MOON_SIZE}
					/>
					<motion.div
						className={classNames('absolute top-0 right-0 opacity-80', {
							'z-[-1]': hasAnimated,
						})}
						animate={controls}
					>
						<CrosshairSimple
							color={Color.PRIMARY.MAIN}
							size={CROSSHAIR_SIZE}
							weight="light"
						/>
					</motion.div>
					<HeroDownButton className="absolute bottom-6 left-[50%] translate-x-[-50%]" />
				</Container>
				<HeroWave
					className="absolute top-0 left-0 z-[-3]"
					style={{width: waveWidth}}
				/>
			</section>
		);
	},
);

export default HeroSection;
