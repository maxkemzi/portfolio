import {Typography} from '@/components/ui';
import {Anchor, Color} from '@/constants';
import {RocketLaunch} from '@phosphor-icons/react/dist/ssr';
import classNames from 'classnames';
import {motion} from 'framer-motion';
import Link from 'next/link';

interface Props {
	className?: string;
}

const HeroDownButton = (props: Props): JSX.Element => {
	const {className} = props;

	return (
		<Link
			className={classNames('flex flex-col items-center gap-2', className)}
			href={`#${Anchor.ABOUT}`}
		>
			<Typography as="span" align="center">
				Continue journey
			</Typography>
			<motion.div
				animate={{y: [0, 6, 0]}}
				transition={{
					duration: 1.5,
					repeat: Infinity,
					repeatType: 'loop',
					ease: 'easeInOut',
				}}
			>
				<RocketLaunch
					className="rotate-[135deg]"
					color={Color.BACKGROUND.contrastText}
					size={32}
					weight="thin"
				/>
			</motion.div>
		</Link>
	);
};

export default HeroDownButton;
