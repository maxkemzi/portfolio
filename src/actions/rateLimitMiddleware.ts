import {prisma} from '@/db';
import {MiddlewareFn} from 'next-safe-action';
import {headers} from 'next/headers';

const getIp = () => {
	const fallbackIp = '0.0.0.0';
	const forwardedFor = headers().get('x-forwarded-for');

	if (forwardedFor) {
		return forwardedFor.split(',')[0] ?? fallbackIp;
	}

	return headers().get('x-real-ip') ?? fallbackIp;
};

const rateLimitMiddleware: MiddlewareFn<
	string,
	undefined,
	undefined,
	null
> = async ({next}) => {
	const ip = getIp();
	const requestLimit = 5;
	const resetAfterMs = 60 * 1000;

	let rateLimit = await prisma.rateLimit.findUnique({where: {ip}});
	if (!rateLimit) {
		rateLimit = await prisma.rateLimit.create({
			data: {ip, resetTime: Date.now() + resetAfterMs},
		});
	}

	if (Date.now() > rateLimit.resetTime) {
		await prisma.rateLimit.update({
			data: {requestCount: 0, resetTime: Date.now() + resetAfterMs},
			where: {id: rateLimit.id},
		});
	}

	if (rateLimit.requestCount >= requestLimit) {
		throw new Error('Too many requests.');
	}

	await prisma.rateLimit.update({
		data: {requestCount: {increment: 1}},
		where: {id: rateLimit.id},
	});

	return next({ctx: null});
};

export default rateLimitMiddleware;
