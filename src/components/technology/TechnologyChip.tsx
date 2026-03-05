import {Technology} from '@prisma/client';
import {Chip, Typography} from '../ui';
import {capitalizeName} from './helpers';

interface Props {
	technology: Technology;
}

const TechnologyChip = (props: Props): JSX.Element => {
	const {
		technology: {name},
	} = props;

	const capitalized = capitalizeName(name);

	return (
		<Chip color="surfaceLight">
			<Typography weight="medium" variant="body2" noWrap>
				{capitalized}
			</Typography>
		</Chip>
	);
};

export default TechnologyChip;
