'use client';

import {Typography} from '@/components/ui';
import {Anchor, Color} from '@/constants';
import {RocketLaunch} from '@phosphor-icons/react/dist/ssr';
import {motion} from 'framer-motion';
import Link from 'next/link';
import {twMerge} from 'tailwind-merge';

interface Props {
	className?: string;
}

const MotionRocketLaunch = motion(RocketLaunch);

const HeroScrollDownLink = (props: Props): JSX.Element => {
	const {className} = props;

	return (
		<Link
			className={twMerge('flex flex-col items-center gap-2', className)}
			href={`#${Anchor.ABOUT}`}
		>
			<Typography as="span" align="center" textTransform="capitalize">
				Continue journey
			</Typography>
			<MotionRocketLaunch
				data-testid="rocket-icon"
				color={Color.BACKGROUND.CONTRAST_TEXT}
				size={32}
				weight="light"
				initial={{rotate: 135}}
				animate={{y: [0, 6, 0]}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					repeatType: 'loop',
					ease: 'easeInOut',
				}}
			/>
		</Link>
	);
};

export default HeroScrollDownLink;
