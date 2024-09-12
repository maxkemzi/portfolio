const calcItemHeight = (index: number, length: number, cols: number) => {
	const SMALL_HEIGHT = 350;
	const LARGE_HEIGHT = 450;

	const rows = Math.ceil(length / cols);

	const rowIndex = index % rows;
	const columnIndex = Math.floor(index / rows);

	const evenPattern = [SMALL_HEIGHT, LARGE_HEIGHT];
	const oddPattern = [LARGE_HEIGHT, SMALL_HEIGHT];

	const heightPattern = columnIndex % 2 === 0 ? evenPattern : oddPattern;

	return heightPattern[rowIndex % 2];
};

export {calcItemHeight};
