'use client';

import {
	AnimatedTypography,
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

const MotionButton = motion(Button);
const MotionTypography = motion(Typography);

const MOON_SIZE = 370;
const CROSSHAIR_SIZE = 260;

const NB_SPACE = '\u00A0';
const FIRST_TEXT = `Hi${NB_SPACE}there,${NB_SPACE}I’m${NB_SPACE}`;
const HIGHLIGHTED_TEXT = 'Max';
const SECOND_TEXT = `I’m${NB_SPACE}a${NB_SPACE}software${NB_SPACE}engineer`;

let animDuration = 0;

const highlightedTextAnimDelay = calcAnimatedCharDelay(FIRST_TEXT.length);
animDuration = highlightedTextAnimDelay;

const secondTextAnimDelay =
	animDuration + calcAnimatedCharDelay(HIGHLIGHTED_TEXT.length);
animDuration = secondTextAnimDelay;

const buttonAnimDelay =
	animDuration + calcAnimatedCharDelay(SECOND_TEXT.length);
animDuration = buttonAnimDelay;

const BUTTON_ANIM_DURATION = 0.5;
const crosshairAnimDuration = animDuration + BUTTON_ANIM_DURATION;

interface Props {
	waveWidth: number;
	moonTopPos: number;
}

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
						duration: crosshairAnimDuration,
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
							<AnimatedTypography text={FIRST_TEXT} />
							<AnimatedTypography
								color="primary"
								text={HIGHLIGHTED_TEXT}
								delay={highlightedTextAnimDelay}
							/>
							<br />
							<AnimatedTypography
								text={SECOND_TEXT}
								delay={secondTextAnimDelay}
							/>
						</Typography>
						<MotionButton
							asLink
							href="/files/cv.pdf"
							download="CV_Maksym_Kyrychenko"
							initial={{y: 5, opacity: 0}}
							animate={{y: 0, opacity: 1}}
							transition={{
								duration: BUTTON_ANIM_DURATION,
								delay: buttonAnimDelay,
							}}
						>
							Download CV
						</MotionButton>
					</div>
					<HeroMoon
						className="absolute right-0 z-[-2] brightness-75"
						style={{top: moonTopPos}}
						size={MOON_SIZE}
					/>
					<motion.div
						className={classNames(
							'absolute top-0 right-0 brightness-90',
							{'z-[-1]': hasAnimated},
						)}
						animate={controls}
					>
						<CrosshairSimple
							color={Color.PRIMARY.MAIN}
							size={CROSSHAIR_SIZE}
							weight="light"
						/>
						<MotionTypography
							className="inline-block absolute top-4 left-[50%]"
							weight="bold"
							color="primary"
							align="center"
							noWrap
							initial={{
								opacity: 0,
								rotate: '12deg',
								scale: 0.5,
								x: '-50%',
								y: '-100%',
							}}
							animate={{opacity: 1, scale: 1}}
							transition={{delay: crosshairAnimDuration}}
						>
							Aimed for the moon!
						</MotionTypography>
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
