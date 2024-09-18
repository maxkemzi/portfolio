import {useRef, useState, useEffect} from 'react';
import {ButtonProps} from '../ui';

const useButtonColorByStatus = ({
	hasSucceeded,
	hasErrored,
}: {
	hasSucceeded: boolean;
	hasErrored: boolean;
}) => {
	const timer = useRef<NodeJS.Timeout>();
	const [buttonColor, setButtonColor] = useState<ButtonProps['color']>();

	useEffect(() => {
		if (!hasSucceeded && !hasErrored) return;

		if (timer) {
			clearTimeout(timer.current);
		}

		setButtonColor(hasSucceeded ? 'success' : 'danger');
		timer.current = setTimeout(() => {
			setButtonColor(undefined);
		}, 2000);
	}, [hasErrored, hasSucceeded]);

	useEffect(
		() => () => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
		},
		[],
	);

	return buttonColor;
};

export {useButtonColorByStatus};
