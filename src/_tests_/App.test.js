import { shuffleCards } from '../helpers/shuffleCards';

describe('shuffleCards function', () => {
	it('shuffles an array of cards', () => {
		const originalArray = [1, 2, 3, 4, 5];
		const shuffledArray = shuffleCards(originalArray.slice());

		// Check if the shuffled array has the same elements
		expect(shuffledArray).toHaveLength(originalArray.length);
		originalArray.forEach((element) => {
			expect(shuffledArray).toContain(element);
		});

		// Check if the shuffled array is not the same as the original
		expect(shuffledArray).not.toEqual(originalArray);
	});
});
