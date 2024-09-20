import {act, render, screen} from '@testing-library/react';
import {ContactForm} from '@/components';
import {useAction} from 'next-safe-action/hooks';
import userEvent from '@testing-library/user-event';
import {Mock} from 'vitest';

vi.mock('next-safe-action/hooks', () => ({
	useAction: vi.fn(),
}));

vi.mock('@/components/ContactForm/actions', () => ({
	sendContactMail: vi.fn(() => Promise.resolve()),
}));

const USE_ACTION_RETURN_VALUE = {
	execute: vi.fn(),
	isExecuting: false,
	hasSucceeded: false,
	hasErrored: false,
};
const mockUseAction = (useAction as Mock).mockReturnValue(
	USE_ACTION_RETURN_VALUE,
);

afterEach(() => {
	vi.clearAllMocks();
});

test('renders form elements correctly', () => {
	render(<ContactForm />);

	expect(screen.getByLabelText('Name')).toBeInTheDocument();
	expect(screen.getByLabelText('Email')).toBeInTheDocument();
	expect(screen.getByLabelText('Message')).toBeInTheDocument();
	expect(screen.getByRole('button', {name: /submit/i})).toBeInTheDocument();
});

test('displays validation errors when submitting invalid form', async () => {
	render(<ContactForm />);

	await userEvent.click(screen.getByRole('button', {name: /submit/i}));

	expect(screen.getByText('Name is required')).toBeInTheDocument();
	expect(screen.getByText('Email is required')).toBeInTheDocument();
	expect(screen.getByText('Message is required')).toBeInTheDocument();
});

test('submits the form successfully with valid data', async () => {
	const mockExecute = vi.fn();
	mockUseAction.mockReturnValue({
		...USE_ACTION_RETURN_VALUE,
		execute: mockExecute,
	});
	render(<ContactForm />);

	await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
	await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
	await userEvent.type(
		screen.getByLabelText('Message'),
		'We would love to work with you!',
	);
	await userEvent.click(screen.getByRole('button', {name: /submit/i}));

	expect(mockExecute).toHaveBeenCalledWith({
		name: 'John Doe',
		email: 'john@example.com',
		message: 'We would love to work with you!',
	});
});

test('disables the submit button when form is submitting', async () => {
	mockUseAction.mockReturnValue({
		...USE_ACTION_RETURN_VALUE,
		isExecuting: true,
	});
	render(<ContactForm />);

	const submitButton = screen.getByRole('button', {name: /submit/i});
	expect(submitButton).toBeDisabled();
});

test('changes button color for some time after form submission success', async () => {
	vi.useFakeTimers({shouldAdvanceTime: true});

	mockUseAction.mockReturnValue({
		...USE_ACTION_RETURN_VALUE,
		hasSucceeded: true,
	});
	render(<ContactForm />);

	await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
	await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
	await userEvent.type(
		screen.getByLabelText('Message'),
		'We would love to work with you!',
	);
	const submitButton = screen.getByRole('button', {name: /submit/i});
	await userEvent.click(submitButton);

	expect(submitButton).toHaveClass('bg-success-main');
	act(() => vi.advanceTimersByTime(2000));
	expect(submitButton).not.toHaveClass('bg-success-main');

	vi.useRealTimers();
});

test('changes button color for some time after form submission failure', async () => {
	vi.useFakeTimers({shouldAdvanceTime: true});

	mockUseAction.mockReturnValue({
		...USE_ACTION_RETURN_VALUE,
		hasErrored: true,
	});
	render(<ContactForm />);

	await userEvent.type(screen.getByLabelText('Name'), 'John Doe');
	await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
	await userEvent.type(
		screen.getByLabelText('Message'),
		'We would love to work with you!',
	);
	const submitButton = screen.getByRole('button', {name: /submit/i});
	await userEvent.click(submitButton);

	expect(submitButton).toHaveClass('bg-danger-main');
	act(() => vi.advanceTimersByTime(2000));
	expect(submitButton).not.toHaveClass('bg-danger-main');

	vi.useRealTimers();
});
