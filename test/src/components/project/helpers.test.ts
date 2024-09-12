import {calcItemHeight} from '@/components/project/helpers';

describe('calcItemHeight', () => {
	test('returns SMALL_HEIGHT for even rows in even columns', () => {
		expect(calcItemHeight(0, 10, 2)).toBe(350);
		expect(calcItemHeight(2, 10, 2)).toBe(350);
		expect(calcItemHeight(4, 10, 2)).toBe(350);
	});

	test('returns LARGE_HEIGHT for odd rows in even columns', () => {
		expect(calcItemHeight(1, 10, 2)).toBe(450);
		expect(calcItemHeight(3, 10, 2)).toBe(450);
	});

	test('returns LARGE_HEIGHT for even rows in odd columns', () => {
		expect(calcItemHeight(5, 10, 2)).toBe(450);
		expect(calcItemHeight(7, 10, 2)).toBe(450);
		expect(calcItemHeight(9, 10, 2)).toBe(450);
	});

	test('returns SMALL_HEIGHT for odd rows in odd columns', () => {
		expect(calcItemHeight(6, 10, 2)).toBe(350);
		expect(calcItemHeight(8, 10, 2)).toBe(350);
	});

	test('correctly calculates for different numbers of columns', () => {
		expect(calcItemHeight(6, 20, 4)).toBe(350);
		expect(calcItemHeight(9, 20, 4)).toBe(450);
		expect(calcItemHeight(11, 20, 5)).toBe(450);
	});

	test('returns correct heights for edge cases', () => {
		expect(calcItemHeight(0, 1, 1)).toBe(350);
		expect(calcItemHeight(1, 2, 1)).toBe(450);
	});
});
