'use client';

import {Container, Typography} from '@/components/ui';
import {CrosshairSimple} from '@phosphor-icons/react/dist/ssr';
import {motion, useAnimation} from 'framer-motion';
import {useLayoutEffect, useState} from 'react';
import {Anchor, Color} from '@/constants';
import classNames from 'classnames';
import HeroWave from './HeroWave';
import HeroMoon from './HeroMoon';
import HeroDownButton from './HeroDownButton';

interface Props {
	waveWidth: number;
	moonTopPos: number;
}

const MotionCrosshairSimple = motion(CrosshairSimple);

const MOON_SIZE = 370;
const CROSSHAIR_SIZE = 260;

const NB_SPACE = '\u00A0';

const HeroSection = (props: Props): JSX.Element => {
	const {waveWidth, moonTopPos} = props;

	const controls = useAnimation();
	const [hasAnimated, setHasAnimated] = useState(false);

	useLayoutEffect(() => {
		const startAnimation = async () => {
			if (hasAnimated) {
				return;
			}

			const yTopPos = moonTopPos - CROSSHAIR_SIZE / 2;
			const yCenterPos = moonTopPos + (MOON_SIZE / 2 - CROSSHAIR_SIZE / 2);
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

	useLayoutEffect(() => {
		if (hasAnimated) {
			controls.set({top: moonTopPos + (MOON_SIZE / 2 - CROSSHAIR_SIZE / 2)});
		}
	}, [controls, hasAnimated, moonTopPos]);

	const firstRow = `Hi${NB_SPACE}there,${NB_SPACE}I’m${NB_SPACE}`.split('');
	const highlightedRow = 'Max'.split('');
	const secondRow =
		`I’m${NB_SPACE}a${NB_SPACE}software${NB_SPACE}engineer`.split('');

	const calcCharDelay = (i: number) => i / 15;

	return (
		<section id={Anchor.HOME} className="h-screen">
			<Container>
				<div className="h-full flex flex-col justify-center">
					<Typography variant="h1" align="center">
						{firstRow.map((char, i) => {
							return (
								<motion.span
									// TODO: fix eslint error
									// eslint-disable-next-line react/no-array-index-key
									key={i}
									className="inline-block"
									initial={{y: 20, opacity: 0}}
									animate={{y: 0, opacity: 1}}
									transition={{
										duration: 0.1,
										delay: calcCharDelay(i),
									}}
								>
									{char}
								</motion.span>
							);
						})}
						{highlightedRow.map((char, i) => {
							return (
								<motion.span
									// TODO: fix eslint error
									// eslint-disable-next-line react/no-array-index-key
									key={i}
									className="inline-block"
									initial={{y: 20, opacity: 0}}
									animate={{y: 0, opacity: 1}}
									transition={{
										duration: 0.1,
										delay:
											calcCharDelay(firstRow.length) +
											calcCharDelay(i),
									}}
								>
									<Typography variant="highlight">{char}</Typography>
								</motion.span>
							);
						})}
						<br />
						{secondRow.map((char, i) => {
							return (
								<motion.span
									// TODO: fix eslint error
									// eslint-disable-next-line react/no-array-index-key
									key={i}
									className="inline-block"
									initial={{y: 20, opacity: 0}}
									animate={{y: 0, opacity: 1}}
									transition={{
										duration: 0.1,
										delay:
											calcCharDelay(
												firstRow.length + highlightedRow.length,
											) + calcCharDelay(i),
									}}
								>
									{char}
								</motion.span>
							);
						})}
					</Typography>
				</div>
				<HeroMoon
					className="absolute right-0 z-[-2]"
					style={{top: moonTopPos}}
					size={MOON_SIZE}
				/>
				<MotionCrosshairSimple
					className={classNames('absolute top-0 right-0', {
						'z-[-1]': hasAnimated,
					})}
					animate={controls}
					color={Color.PRIMARY.main}
					size={CROSSHAIR_SIZE}
					weight="thin"
				/>
				<HeroDownButton className="absolute bottom-6 left-[50%] translate-x-[-50%]" />
			</Container>
			<HeroWave
				className="absolute top-0 left-0 z-[-3]"
				style={{width: waveWidth}}
			/>
		</section>
	);
};

export default HeroSection;
