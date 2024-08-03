import {motion} from 'framer-motion';
import {v4 as uuidv4} from 'uuid';
import {memo} from 'react';
import {Typography, TypographyProps} from '../Typography';

interface Props {
	text: string;
	variant?: TypographyProps['variant'];
	delay?: number;
}

const MotionTypography = motion(Typography);

const calcCharDelay = (i: number) => i / 15;

const AnimatedText = memo((props: Props): JSX.Element => {
	const {text, variant = 'inherit', delay = 0} = props;

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
							duration: 0.1,
							delay: delay + calcCharDelay(i),
						}}
						variant={variant}
					>
						{char}
					</MotionTypography>
				);
			})}
		</>
	);
});

export {calcCharDelay as calcAnimatedCharDelay};
export default AnimatedText;
