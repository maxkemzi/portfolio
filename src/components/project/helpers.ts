import {Status} from '@prisma/client';
import {ColorValue} from '../ui/types';

const calcItemHeight = (index: number, length: number, cols: number) => {
	const SMALL_HEIGHT = 350;
	const LARGE_HEIGHT = 450;

	const rows = Math.ceil(length / cols);

	const rowIndex = index % rows;
	const columnIndex = Math.floor(index / rows);

	const evenPattern = [SMALL_HEIGHT, LARGE_HEIGHT];
	const oddPattern = [LARGE_HEIGHT, SMALL_HEIGHT];

	const heightPattern = columnIndex % 2 === 0 ? evenPattern : oddPattern;

	return heightPattern[rowIndex % 2];
};

const getStatusText = (status: Status): string | undefined => {
	switch (status) {
		case 'inProgress':
			return 'in progress';
		case 'dropped':
			return 'dropped';
		case 'completed':
			return 'completed';
		case 'onHold':
			return 'on hold';
		default:
	}
};

const getStatusColor = (status: Status): ColorValue | undefined => {
	switch (status) {
		case 'inProgress':
			return 'success';
		case 'dropped':
			return 'danger';
		case 'completed':
			return 'success';
		case 'onHold':
			return 'warning';
		default:
	}
};

export {calcItemHeight, getStatusText, getStatusColor};
