'use client';

import {
	AnimatedTypography,
	Button,
	calcAnimatedCharDelay,
	Container,
	Section,
	Typography,
} from '@/components/ui';
import {CrosshairSimple} from '@phosphor-icons/react/dist/ssr';
import {motion} from 'framer-motion';
import {
	ForwardedRef,
	forwardRef,
	RefObject,
	useLayoutEffect,
	useState,
} from 'react';
import {Anchor} from '@/constants';
import HeroWave from './HeroWave';
import HeroMoon from './HeroMoon';
import HeroScrollDownLink from './HeroScrollDownLink';

const MOON_SPACING = 48;
const WAVE_SPACING = 16;

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

const MotionButton = motion(Button);

interface Props {
	headerRightBlockRef: RefObject<HTMLDivElement>;
}

const HeroSection = forwardRef(
	(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element => {
		const {headerRightBlockRef} = props;

		const [waveWidth, setWaveWidth] = useState(0);
		const [moonTopPos, setMoonTopPos] = useState(0);

		useLayoutEffect(() => {
			const updateWaveWidthAndMoonTopPos = () => {
				if (!headerRightBlockRef.current) return;

				const {top, left} =
					headerRightBlockRef.current.getBoundingClientRect();
				setMoonTopPos(top + window.scrollY + MOON_SPACING);
				setWaveWidth(left - window.scrollX - WAVE_SPACING);
			};

			updateWaveWidthAndMoonTopPos();

			window.addEventListener('resize', updateWaveWidthAndMoonTopPos);
			return () => {
				window.removeEventListener('resize', updateWaveWidthAndMoonTopPos);
			};
		}, [headerRightBlockRef]);

		return (
			<Section ref={ref} id={Anchor.HERO} fullscreen>
				<Container size="lg">
					<div className="h-full flex flex-col items-center justify-center">
						<Typography
							className="mb-9"
							variant="h1"
							textTransform="none"
							align="center"
						>
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
					<div
						className="absolute right-0 z-[-1] size-[360px] max-lg:size-80 max-md:size-72 max-xs:size-60 max-xxs:size-52"
						style={{top: moonTopPos}}
					>
						<HeroMoon className="brightness-[0.65] size-full" />
						<motion.div
							className="absolute top-0 left-0 size-3/4"
							animate={{
								top: [0, '50%', '100%', '50%', '50%'],
								left: ['50%', 0, '50%', '100%', '50%'],
								y: ['-50%', '-50%', '-50%', '-50%', '-50%'],
								x: ['-50%', '-50%', '-50%', '-50%', '-50%'],
							}}
							transition={{
								duration: crosshairAnimDuration,
								ease: 'easeInOut',
							}}
						>
							<CrosshairSimple
								className="text-primary-main/65 size-full"
								weight="light"
							/>
						</motion.div>
					</div>
					<HeroScrollDownLink className="absolute bottom-6 left-[50%] translate-x-[-50%]" />
				</Container>
				<HeroWave
					className="absolute top-0 left-0 z-[-2]"
					style={{width: waveWidth}}
				/>
			</Section>
		);
	},
);

export default HeroSection;
