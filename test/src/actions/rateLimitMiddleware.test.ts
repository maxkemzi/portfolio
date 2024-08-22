import rateLimitMiddleware from '@/actions/rateLimitMiddleware';
import {prisma} from '@/db';
import {headers} from 'next/headers';
import {Mock} from 'vitest';

vi.mock('@/db', () => ({
	prisma: {
		rateLimit: {
			findUnique: vi.fn(),
			create: vi.fn(),
			update: vi.fn(),
		},
	},
}));

vi.mock('next/headers', () => ({
	headers: vi.fn(),
}));

const mockHeaders = headers as Mock;
const mockPrismaFindUnique = prisma.rateLimit.findUnique as Mock;
const mockPrismaUpdate = prisma.rateLimit.update as Mock;
const mockPrismaCreate = prisma.rateLimit.create as Mock;

describe('rateLimitMiddleware', () => {
	const mockNext = vi.fn();

	beforeEach(() => {
		vi.clearAllMocks();
		mockNext.mockResolvedValue({ctx: null});

		mockHeaders.mockReturnValue({
			get: vi.fn().mockReturnValue('127.0.0.1'),
		});
	});

	it('should allow requests within the limit', async () => {
		mockPrismaFindUnique.mockResolvedValue({
			id: 1,
			ip: '127.0.0.1',
			requestCount: 2,
			resetTime: Date.now() + 60000,
		});

		await rateLimitMiddleware({
			next: mockNext,
			ctx: undefined,
			clientInput: undefined,
			metadata: undefined,
			bindArgsClientInputs: [],
		});

		expect(mockPrismaUpdate).toHaveBeenCalledWith({
			data: {requestCount: {increment: 1}},
			where: {id: 1},
		});
		expect(mockNext).toHaveBeenCalledWith({ctx: null});
	});

	it('should throw an error when the request limit is exceeded', async () => {
		mockPrismaFindUnique.mockResolvedValue({
			id: 1,
			ip: '127.0.0.1',
			requestCount: 5,
			resetTime: Date.now() + 60000,
		});

		await expect(
			rateLimitMiddleware({
				next: mockNext,
				ctx: undefined,
				clientInput: undefined,
				metadata: undefined,
				bindArgsClientInputs: [],
			}),
		).rejects.toThrow('Too many requests.');

		expect(mockPrismaUpdate).not.toHaveBeenCalled();
		expect(mockNext).not.toHaveBeenCalled();
	});

	it('should reset the rate limit after the reset time has passed', async () => {
		const pastResetTime = Date.now() - 1;

		mockPrismaFindUnique.mockResolvedValue({
			id: 1,
			ip: '127.0.0.1',
			requestCount: 5,
			resetTime: pastResetTime,
		});

		mockPrismaUpdate.mockResolvedValueOnce({
			id: 1,
			ip: '127.0.0.1',
			requestCount: 0,
			resetTime: pastResetTime + 60000,
		});

		await rateLimitMiddleware({
			next: mockNext,
			ctx: undefined,
			clientInput: undefined,
			metadata: undefined,
			bindArgsClientInputs: [],
		});

		expect(mockPrismaUpdate).toHaveBeenCalledWith({
			data: {requestCount: 0, resetTime: expect.any(Number)},
			where: {id: 1},
		});

		expect(mockPrismaUpdate).toHaveBeenCalledWith({
			data: {requestCount: {increment: 1}},
			where: {id: 1},
		});

		expect(mockNext).toHaveBeenCalledWith({ctx: null});
	});

	it('should create a new rate limit entry if one does not exist', async () => {
		mockPrismaFindUnique.mockResolvedValue(null);

		mockPrismaCreate.mockResolvedValue({
			id: 1,
			ip: '127.0.0.1',
			requestCount: 0,
			resetTime: Date.now() + 60000,
		});

		await rateLimitMiddleware({
			next: mockNext,
			ctx: undefined,
			clientInput: undefined,
			metadata: undefined,
			bindArgsClientInputs: [],
		});

		expect(mockPrismaCreate).toHaveBeenCalledWith({
			data: {ip: '127.0.0.1', resetTime: expect.any(Number)},
		});

		expect(mockPrismaUpdate).toHaveBeenCalledWith({
			data: {requestCount: {increment: 1}},
			where: {id: 1},
		});

		expect(mockNext).toHaveBeenCalledWith({ctx: null});
	});

	it('should fallback to the default IP if headers are not available', async () => {
		mockHeaders.mockReturnValue({
			get: vi.fn().mockReturnValue(null),
		});

		mockPrismaFindUnique.mockResolvedValue({
			id: 1,
			ip: '0.0.0.0',
			requestCount: 2,
			resetTime: Date.now() + 60000,
		});

		await rateLimitMiddleware({
			next: mockNext,
			ctx: undefined,
			clientInput: undefined,
			metadata: undefined,
			bindArgsClientInputs: [],
		});

		expect(mockPrismaFindUnique).toHaveBeenCalledWith({
			where: {ip: '0.0.0.0'},
		});

		expect(mockNext).toHaveBeenCalledWith({ctx: null});
	});
});
