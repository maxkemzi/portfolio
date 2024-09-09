import {Technology} from '@prisma/client';
import {Typography} from '../ui';

interface Props {
	technology: Technology;
}

const TechnologyChip = (props: Props): JSX.Element => {
	const {
		technology: {name},
	} = props;

	const capitalized =
		name.length !== 0 ? `${name[0].toUpperCase()}${name.slice(1)}` : null;

	return (
		<div className="bg-surface-main rounded-lg py-1 px-3">
			<Typography variant="body2">{capitalized}</Typography>
		</div>
	);
};

export default TechnologyChip;
