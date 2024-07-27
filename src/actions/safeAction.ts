import {createSafeActionClient} from 'next-safe-action';
import {headers} from 'next/headers';

const rateLimits: {[key: string]: {count: number; lastReset: number}} = {};

const actionClient = createSafeActionClient().use(async ({next}) => {
	const ip = headers().get('x-forwarded-for') || '0.0.0.0';
	const limit = 5;
	const windowMs = 60 * 1000;

	if (!(ip in rateLimits)) {
		rateLimits[ip] = {
			count: 0,
			lastReset: Date.now(),
		};
	}

	const ipData = rateLimits[ip];

	if (Date.now() - ipData.lastReset > windowMs) {
		ipData.count = 0;
		ipData.lastReset = Date.now();
	}

	if (ipData.count >= limit) {
		throw new Error('Too many requests.');
	}

	ipData.count += 1;

	return next({ctx: {rateLimits: {...rateLimits}}});
});

export {actionClient};
