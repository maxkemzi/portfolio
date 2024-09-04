import {prisma} from '@/db';
import {MiddlewareFn} from 'next-safe-action';
import {headers} from 'next/headers';

const getIp = () => {
	const FALLBACK_IP = '0.0.0.0';
	const forwardedFor = headers().get('x-forwarded-for');

	const ip = forwardedFor
		? forwardedFor.split(',')[0]
		: headers().get('x-real-ip');

	return ip ?? FALLBACK_IP;
};

const rateLimitMiddleware: MiddlewareFn<string, undefined, {}, {}> = async ({
	next,
}) => {
	const ip = getIp();
	const REQUEST_LIMIT = 5;
	const RESET_AFTER_MS = 60 * 1000;

	let rateLimit = await prisma.rateLimit.findUnique({where: {ip}});
	if (!rateLimit) {
		rateLimit = await prisma.rateLimit.create({
			data: {ip, resetTime: Date.now() + RESET_AFTER_MS},
		});
	}

	const isResetTime = Date.now() > rateLimit.resetTime;
	if (isResetTime) {
		rateLimit = await prisma.rateLimit.update({
			data: {requestCount: 0, resetTime: Date.now() + RESET_AFTER_MS},
			where: {id: rateLimit.id},
		});
	}

	if (rateLimit.requestCount >= REQUEST_LIMIT) {
		throw new Error('Too many requests.');
	}

	await prisma.rateLimit.update({
		data: {requestCount: {increment: 1}},
		where: {id: rateLimit.id},
	});

	return next({ctx: {}});
};

export default rateLimitMiddleware;
