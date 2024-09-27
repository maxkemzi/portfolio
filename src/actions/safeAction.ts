import {createSafeActionClient} from 'next-safe-action';
import rateLimitMiddleware from './rateLimitMiddleware';

const actionClient = createSafeActionClient();

if (process.env.NODE_ENV !== 'test') {
	actionClient.use(rateLimitMiddleware);
}

export {actionClient};
