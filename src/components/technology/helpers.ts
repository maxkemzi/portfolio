const capitalizeName = (name: string): string => {
	const trimmed = name.trim();
	if (trimmed.length === 0) return '';

	return trimmed
		.split(' ')
		.filter(w => w.length > 0)
		.map(w => `${w[0].toUpperCase()}${w.slice(1)}`)
		.join(' ');
};

export {capitalizeName};
