import {Typography} from '../Typography';

const Logo = (): JSX.Element => {
	return (
		<Typography
			className="text-xl max-lg:text-lg max-md:text-base max-xs:text-sm max-xxs:text-xs"
			weight="bold"
			letterSpacing="widest"
			textTransform="uppercase"
		>
			Max Kemzi
		</Typography>
	);
};

export default Logo;
