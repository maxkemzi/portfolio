import {Color} from '@/constants';
import {CSSProperties} from 'react';

interface Props {
	className?: string;
	style?: CSSProperties;
}

const HeroWave = (props: Props): JSX.Element => {
	const {className, style} = props;

	return (
		<svg
			className={className}
			style={style}
			viewBox="0 0 976 267"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 215.674L40.6667 233.647C81.3333 251.62 162.667 287.565 244 251.62C325.333 215.674 406.667 107.837 488 95.8551C569.333 83.8732 650.667 167.746 732 167.746C813.333 167.746 894.667 83.8732 935.333 41.9366L976 -3.67651e-07V-3.67651e-07H935.333C894.667 -3.67651e-07 813.333 -3.67651e-07 732 -3.67651e-07C650.667 -3.67651e-07 569.333 -3.67651e-07 488 -3.67651e-07C406.667 -3.67651e-07 325.333 -3.67651e-07 244 -3.67651e-07C162.667 -3.67651e-07 81.3333 -3.67651e-07 40.6667 -3.67651e-07H0V215.674Z"
				fill="url(#paint0_linear_44_75)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_44_75"
					x1="0"
					y1="133.5"
					x2="976"
					y2="133.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={Color.PRIMARY.main} />
					<stop offset="1" stopColor={Color.SECONDARY.main} />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default HeroWave;
