import {Color} from '@/constants';

const Footer = () => {
	return (
		<footer>
			<svg
				viewBox="0 0 1440 267"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M0 51.326L60 33.3532C120 15.3803 240 -20.5653 360 15.3803C480 51.326 600 159.163 720 171.145C840 183.127 960 99.2536 1080 99.2536C1200 99.2536 1320 183.127 1380 225.063L1440 267H1380C1320 267 1200 267 1080 267C960 267 840 267 720 267C600 267 480 267 360 267C240 267 120 267 60 267H0V51.326Z"
					fill="url(#paint0_linear_44_74)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_44_74"
						x1="0"
						y1="133.5"
						x2="1440"
						y2="133.5"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor={Color.SECONDARY.MAIN} />
						<stop offset="1" stopColor={Color.PRIMARY.MAIN} />
					</linearGradient>
				</defs>
			</svg>
		</footer>
	);
};

export default Footer;
