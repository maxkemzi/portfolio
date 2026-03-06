import {ThemeColor} from '@/constants';

const Footer = () => {
	return (
		<footer>
			<svg
				viewBox="0 0 1440 267"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1440 51.326L1380 33.3532C1320 15.3803 1200 -20.5653 1080 15.3803C960 51.326 840 159.163 720 171.145C600 183.127 480 99.2536 360 99.2536C240 99.2536 120 183.127 60 225.063L0 267H60C120 267 240 267 360 267C480 267 600 267 720 267C840 267 960 267 1080 267C1200 267 1320 267 1380 267H1440V51.326Z"
					fill="url(#paint0_linear_2044_3)"
				/>
				<defs>
					<linearGradient
						id="paint0_linear_2044_3"
						x1="853.5"
						y1="3.77305e-05"
						x2="586.5"
						y2="267"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor={ThemeColor.PRIMARY.DARK} />
					</linearGradient>
				</defs>
			</svg>
		</footer>
	);
};

export default Footer;
