import {ThemeColor} from '@/constants';
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
			viewBox="0 0 951 267"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M0 215.674L39.625 233.647C79.25 251.62 158.5 287.565 237.75 251.62C317 215.674 396.25 107.837 475.5 95.8551C554.75 83.8732 634 167.746 713.25 167.746C792.5 167.746 871.75 83.8732 911.375 41.9366L951 -3.67651e-07V-3.67651e-07H911.375C871.75 -3.67651e-07 792.5 -3.67651e-07 713.25 -3.67651e-07C634 -3.67651e-07 554.75 -3.67651e-07 475.5 -3.67651e-07C396.25 -3.67651e-07 317 -3.67651e-07 237.75 -3.67651e-07C158.5 -3.67651e-07 79.25 -3.67651e-07 39.625 -3.67651e-07H0V215.674Z"
				fill="url(#paint0_linear_44_75)"
			/>
			<defs>
				<linearGradient
					id="paint0_linear_44_75"
					x1="342"
					y1="1.42255e-07"
					x2="609"
					y2="267"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor={ThemeColor.PRIMARY.MAIN} />
					<stop offset="1" stopColor={ThemeColor.SECONDARY.MAIN} />
				</linearGradient>
			</defs>
		</svg>
	);
};

export default HeroWave;
