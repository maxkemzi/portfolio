'use client';

import {motion} from 'framer-motion';
import {v4 as uuidv4} from 'uuid';
import {memo} from 'react';
import {Typography, TypographyProps} from '../Typography';

interface Props {
	text: string;
	variant?: TypographyProps['variant'];
	color?: TypographyProps['color'];
	delay?: number;
}

const MotionTypography = motion(Typography);

const CHAR_ANIM_DURATION = 0.1;

const calcAnimatedCharDelay = (i: number) => i * (CHAR_ANIM_DURATION / 1.5);

const AnimatedTypography = memo((props: Props): JSX.Element => {
	const {text, variant = 'inherit', color, delay = 0} = props;

	const chars = text.split('');

	return (
		<>
			{chars.map((char, i) => {
				return (
					<MotionTypography
						key={uuidv4()}
						className="inline-block"
						initial={{y: 20, opacity: 0}}
						animate={{y: 0, opacity: 1}}
						transition={{
							delay: delay + calcAnimatedCharDelay(i),
							duration: CHAR_ANIM_DURATION,
						}}
						variant={variant}
						color={color}
					>
						{char}
					</MotionTypography>
				);
			})}
		</>
	);
});

export {calcAnimatedCharDelay};
export default AnimatedTypography;
