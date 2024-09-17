import {Status} from '@prisma/client';
import {ColorValue} from '../ui/types';

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

export {getStatusText, getStatusColor};
