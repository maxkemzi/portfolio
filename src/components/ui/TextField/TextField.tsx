import classNames from 'classnames';
import {Typography} from '../Typography';

interface Props {
	label: string;
	name: string;
	value?: string;
	placeholder?: string;
	isMultiline?: boolean;
}

const TextField = (props: Props): JSX.Element => {
	const {label, value, placeholder, isMultiline} = props;

	const commonProps = {placeholder};
	const commonClasses = 'w-full px-4 py-3 bg-surface-main rounded-lg';

	return (
		<label>
			<Typography className="mb-1">{label}</Typography>
			{isMultiline ? (
				<textarea
					className={classNames(commonClasses, 'resize-none')}
					{...commonProps}
				>
					{value}
				</textarea>
			) : (
				<input className={commonClasses} value={value} {...commonProps} />
			)}
		</label>
	);
};

export default TextField;
