import {createSafeActionClient} from 'next-safe-action';
import rateLimitMiddleware from './rateLimitMiddleware';

const actionClient = createSafeActionClient().use(rateLimitMiddleware);

export {actionClient};
