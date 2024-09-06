import {render, screen, fireEvent} from '@testing-library/react';
import {TextField} from '@/components/ui';
import {TextFieldProps} from '@/components/ui/TextField';

const baseProps = {
	label: 'Test Label',
	name: 'test-input',
};

describe('input element', () => {
	const nonMultilineProps: TextFieldProps = {...baseProps, multiline: false};

	test('renders when multiline is false', () => {
		render(<TextField {...nonMultilineProps} />);

		expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLInputElement);
	});

	test('renders with correct value', () => {
		render(<TextField {...nonMultilineProps} value="Test Value" />);

		const input = screen.getByRole<HTMLInputElement>('textbox');
		expect(input.value).toBe('Test Value');
	});

	test('renders with correct placeholder text', () => {
		render(<TextField {...nonMultilineProps} placeholder="Text" />);

		expect(screen.getByPlaceholderText('Text')).toBeInTheDocument();
	});

	test('renders with correct name', () => {
		render(<TextField {...nonMultilineProps} name="test-input" />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('name', 'test-input');
	});

	test('calls onChange handler', () => {
		const handleChange = vi.fn();
		render(<TextField {...nonMultilineProps} onChange={handleChange} />);

		const input = screen.getByRole('textbox');
		fireEvent.change(input, {target: {value: 'New Value'}});

		expect(handleChange).toHaveBeenCalledOnce();
	});

	test('calls onBlur handler', () => {
		const handleBlur = vi.fn();
		render(<TextField {...nonMultilineProps} onBlur={handleBlur} />);

		const input = screen.getByRole('textbox');
		fireEvent.blur(input);

		expect(handleBlur).toHaveBeenCalledTimes(1);
	});
});

describe('textarea element', () => {
	const multilineProps: TextFieldProps = {...baseProps, multiline: true};

	test('renders when multiline is true', () => {
		render(<TextField {...multilineProps} />);

		expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
		expect(screen.getByRole('textbox')).toBeInstanceOf(HTMLTextAreaElement);
	});

	test('renders correct value in textarea element', () => {
		render(<TextField {...multilineProps} value="Test Value" />);

		const textarea = screen.getByRole<HTMLTextAreaElement>('textbox');
		expect(textarea.value).toBe('Test Value');
	});

	test('calls onChange handler for textarea element', () => {
		const handleChange = vi.fn();
		render(<TextField {...multilineProps} onChange={handleChange} />);

		const textarea = screen.getByRole('textbox');
		fireEvent.change(textarea, {target: {value: 'New Value'}});

		expect(handleChange).toHaveBeenCalledOnce();
	});

	test('calls onBlur handler for textarea element', () => {
		const handleBlur = vi.fn();
		render(<TextField {...multilineProps} onBlur={handleBlur} />);

		const textarea = screen.getByRole('textbox');
		fireEvent.blur(textarea);

		expect(handleBlur).toHaveBeenCalledTimes(1);
	});

	test('renders textarea with correct placeholder text', () => {
		render(<TextField {...multilineProps} placeholder="Enter text" />);

		expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
	});

	test('renders textarea with correct name', () => {
		render(<TextField {...multilineProps} name="test-input" />);

		const input = screen.getByRole('textbox');
		expect(input).toHaveAttribute('name', 'test-input');
	});
});

test('renders error message when error prop is provided', () => {
	render(<TextField {...baseProps} error="Error message" />);

	expect(screen.getByText('Error message')).toBeInTheDocument();
});

test('does not render error message when error prop is not provided', () => {
	render(<TextField {...baseProps} />);

	expect(screen.queryByText('Error message')).toBeNull();
});

test('renders with correct label text', () => {
	render(<TextField {...baseProps} label="Test Label" />);

	expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
});
