import {Typography} from '../ui';

interface Props {
	hasSucceeded: boolean;
	hasErrored: boolean;
}

const ContactFormStatus = (props: Props): JSX.Element | null => {
	const {hasSucceeded, hasErrored} = props;

	const commonClassNames = 'mb-2';

	if (hasSucceeded) {
		return (
			<Typography
				className={commonClassNames}
				align="center"
				color="success"
			>
				Form has been submitted.
			</Typography>
		);
	}

	if (hasErrored) {
		return (
			<Typography className={commonClassNames} align="center" color="danger">
				Something went wrong.
			</Typography>
		);
	}

	return null;
};

export default ContactFormStatus;
