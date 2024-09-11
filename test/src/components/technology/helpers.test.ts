import {capitalizeName} from '@/components/technology/helpers';

describe('capitalizeName function', () => {
	test('should capitalize a single word', () => {
		expect(capitalizeName('hello')).toBe('Hello');
	});

	test('should capitalize each word in a sentence', () => {
		expect(capitalizeName('hello world')).toBe('Hello World');
	});

	test('should handle multiple spaces between words', () => {
		expect(capitalizeName('   hello    world  ')).toBe('Hello World');
	});

	test('should handle empty strings', () => {
		expect(capitalizeName('')).toBe('');
	});

	test('should handle strings with only spaces', () => {
		expect(capitalizeName('     ')).toBe('');
	});

	test('should handle already capitalized words', () => {
		expect(capitalizeName('Hello World')).toBe('Hello World');
	});

	test('should handle mixed case input', () => {
		expect(capitalizeName('hElLo wOrLd')).toBe('HElLo WOrLd');
	});

	test('should handle single character words', () => {
		expect(capitalizeName('a b c')).toBe('A B C');
	});
});
