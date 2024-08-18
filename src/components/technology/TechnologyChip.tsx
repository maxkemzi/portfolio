import {Technology} from '@/types';
import {Typography} from '../ui';

interface Props {
	technology: Technology;
}

const TechnologyChip = (props: Props): JSX.Element => {
	const {
		technology: {name},
	} = props;

	return (
		<div className="bg-surface-main rounded-lg py-1 px-3">
			<Typography variant="body2">{name}</Typography>
		</div>
	);
};

export default TechnologyChip;
