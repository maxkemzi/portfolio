'use client';

import {Container, Typography} from '@/components/ui';
import {CrosshairSimple} from '@phosphor-icons/react/dist/ssr';
import {motion, useAnimation} from 'framer-motion';
import {useLayoutEffect, useMemo, useRef, useState} from 'react';
import {Color} from '@/constants';
import classNames from 'classnames';
import HeroWave from './HeroWave';
import HeroMoon from './HeroMoon';
import HeroDownButton from './HeroDownButton';

interface Props {
	waveWidth: number;
	moonTopPos: number;
}

const MotionCrosshairSimple = motion(CrosshairSimple);

const HeroSection = (props: Props): JSX.Element => {
	const {waveWidth, moonTopPos} = props;

	const moonSize = 370;
	const crosshairSize = 260;

	const controls = useAnimation();
	const [hasAnimated, setHasAnimated] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const crosshairFinalTopPos = useMemo(
		() => moonTopPos + (moonSize / 2 - crosshairSize / 2),
		[moonTopPos],
	);

	useLayoutEffect(() => {
		const startAnimation = async () => {
			if (!containerRef.current || hasAnimated) {
				return;
			}

			const {width: containerWidth, height: containerHeight} =
				containerRef.current.getBoundingClientRect();

			await controls.start({
				top: [
					containerHeight - crosshairSize,
					containerHeight / 2 - crosshairSize / 2,
					crosshairFinalTopPos,
				],
				right: [
					containerWidth - crosshairSize,
					containerWidth / 2 - crosshairSize / 2,
					moonSize / 2 - crosshairSize / 2,
				],
				transition: {
					duration: 2,
					ease: 'easeInOut',
				},
			});

			setHasAnimated(true);
		};

		startAnimation();
	}, [controls, crosshairFinalTopPos, hasAnimated]);

	useLayoutEffect(() => {
		if (hasAnimated) {
			controls.set({top: crosshairFinalTopPos});
		}
	}, [controls, crosshairFinalTopPos, hasAnimated]);

	return (
		<section className="h-screen">
			<Container ref={containerRef}>
				<div className="h-full flex flex-col justify-center">
					<div>
						<Typography variant="h1" align="center">
							Hi there, I’m{' '}
							<Typography variant="highlight">Max</Typography>
							. <br /> I’m a software engineer.
						</Typography>
					</div>
				</div>
				<HeroMoon
					className="absolute right-0 z-[-2]"
					style={{top: moonTopPos}}
					size={moonSize}
				/>
				<MotionCrosshairSimple
					className={classNames('absolute top-0 right-0', {
						'z-[-1]': hasAnimated,
					})}
					animate={controls}
					color={Color.PRIMARY.main}
					size={crosshairSize}
					weight="thin"
				/>
				<HeroDownButton className="absolute bottom-5 left-[50%] translate-x-[-50%]" />
			</Container>
			<HeroWave
				className="absolute top-0 left-0 z-[-3]"
				style={{width: waveWidth}}
			/>
		</section>
	);
};

export default HeroSection;
