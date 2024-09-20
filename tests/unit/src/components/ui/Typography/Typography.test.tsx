import {
	Align,
	ALIGN_TO_CLASS_NAME_MAPPING,
	COLOR_TO_CLASS_NAME_MAPPING,
	LETTER_SPACING_TO_CLASS_NAME_MAPPING,
	LetterSpacing,
	Size,
	SIZE_TO_CLASS_NAME_MAPPING,
	TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING,
	TextTransform,
	Typography,
	TypographyColor,
	Variant,
	VARIANT_TO_ELEMENT_MAPPING,
	Weight,
	WEIGHT_TO_CLASS_NAME_MAPPING,
} from '@/components/ui/Typography';
import {cleanup, render, screen} from '@testing-library/react';

test('renders with default props when none are provided', async () => {
	render(<Typography>Test</Typography>);

	const element = screen.getByText('Test');
	expect(element.tagName).toBe('P');
	expect(element).toHaveClass(
		'text-base font-normal text-background-contrastText',
	);
});

test('renders the correct element based on the variant prop', () => {
	Object.values(Variant).forEach(variant => {
		render(<Typography variant={variant}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element.tagName.toLowerCase()).toBe(
			VARIANT_TO_ELEMENT_MAPPING[variant],
		);

		cleanup();
	});
});

test('renders with correct class names based on the size prop', () => {
	Object.values(Size).forEach(size => {
		render(<Typography size={size}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element).toHaveClass(SIZE_TO_CLASS_NAME_MAPPING[size]);

		cleanup();
	});
});

test('renders with correct class names based on the weight prop', () => {
	Object.values(Weight).forEach(weight => {
		render(<Typography weight={weight}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element).toHaveClass(WEIGHT_TO_CLASS_NAME_MAPPING[weight]);

		cleanup();
	});
});

test('renders with correct class names based on the color prop', () => {
	Object.values(TypographyColor).forEach(color => {
		render(<Typography color={color}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element).toHaveClass(COLOR_TO_CLASS_NAME_MAPPING[color]);

		cleanup();
	});
});

test('renders with correct class names based on the letterSpacing prop', () => {
	Object.values(LetterSpacing).forEach(letterSpacing => {
		render(<Typography letterSpacing={letterSpacing}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element).toHaveClass(
			LETTER_SPACING_TO_CLASS_NAME_MAPPING[letterSpacing],
		);

		cleanup();
	});
});

test('renders with correct class names based on the textTransform prop', () => {
	Object.values(TextTransform).forEach(textTransform => {
		render(<Typography textTransform={textTransform}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element).toHaveClass(
			TEXT_TRANSFORM_TO_CLASS_NAME_MAPPING[textTransform],
		);

		cleanup();
	});
});

test('renders with correct class names based on the align prop', () => {
	Object.values(Align).forEach(align => {
		render(<Typography align={align}>Test</Typography>);

		const element = screen.getByText('Test');
		expect(element).toHaveClass(ALIGN_TO_CLASS_NAME_MAPPING[align]);

		cleanup();
	});
});

test('renders with correct class name if the truncate prop is true', () => {
	render(<Typography truncate>Test</Typography>);

	const element = screen.getByText('Test');
	expect(element).toHaveClass('truncate');
});

test('renders with correct class name if the noWrap prop is true', () => {
	render(<Typography noWrap>Test</Typography>);

	const element = screen.getByText('Test');
	expect(element).toHaveClass('text-nowrap');
});

test('applies additional classes when `className` prop is provided', () => {
	render(<Typography className="additional-class">Test</Typography>);

	const element = screen.getByText('Test');
	expect(element).toHaveClass('additional-class');
});

test('merges class names with additional class names correctly', () => {
	render(
		<Typography
			className="text-xl font-bold text-danger-main tracking-wide capitalize text-center text-ellipsis text-wrap"
			size="base"
			weight="normal"
			color="backgroundText"
			letterSpacing="normal"
			textTransform="lowercase"
			align="left"
			truncate
			noWrap
		>
			Test
		</Typography>,
	);

	const element = screen.getByText('Test');
	expect(element).toHaveClass(
		'text-xl font-bold text-danger-main tracking-wide capitalize text-center text-ellipsis text-wrap',
	);
	expect(element).not.toHaveClass(
		'text-base font-normal text-background-contrastText tracking-normal lowercase text-left truncate text-nowrap',
	);
});
