import {Button} from '@/components/ui';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('renders as a button by default', () => {
	render(<Button>Click Me</Button>);

	const buttonElement = screen.getByRole('button');
	expect(buttonElement).toBeInTheDocument();
	expect(buttonElement).toHaveTextContent('Click Me');
});

test('renders as a submit button when submit prop is true', () => {
	render(<Button submit>Submit</Button>);

	const buttonElement = screen.getByRole('button');
	expect(buttonElement).toHaveAttribute('type', 'submit');
});

test('renders as a disabled button when disabled prop is true', () => {
	render(<Button disabled>Disabled</Button>);

	const buttonElement = screen.getByRole('button');
	expect(buttonElement).toBeDisabled();
	expect(buttonElement).toHaveClass('brightness-75');
});

test('renders as a link when asLink is true', () => {
	render(
		<Button asLink href="https://example.com">
			Go to Example
		</Button>,
	);

	const linkElement = screen.getByRole('link');
	expect(linkElement).toBeInTheDocument();
	expect(linkElement).toHaveAttribute('href', 'https://example.com');
	expect(linkElement).toHaveTextContent('Go to Example');
});

test('applies additional class names', () => {
	render(<Button className="custom-class">Styled Button</Button>);

	const buttonElement = screen.getByRole('button');
	expect(buttonElement).toHaveClass('custom-class');
});

test('renders with Typography child', () => {
	render(<Button>Button with Typography</Button>);

	const typographyElement = screen.getByText(/Button with Typography/i);
	expect(typographyElement.tagName).toBe('SPAN');
	expect(typographyElement).toBeInTheDocument();
});

test('link has download attribute when provided', () => {
	render(
		<Button asLink href="https://example.com/file" download="file.pdf">
			Download File
		</Button>,
	);

	const linkElement = screen.getByRole('link');
	expect(linkElement).toHaveAttribute('download', 'file.pdf');
});

test('button triggers click event', async () => {
	const handleClick = vi.fn();
	render(<Button onClick={handleClick}>Click Me</Button>);

	const buttonElement = screen.getByRole('button');
	await userEvent.click(buttonElement);

	expect(handleClick).toHaveBeenCalledTimes(1);
});
