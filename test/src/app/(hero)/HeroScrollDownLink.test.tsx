import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import HeroScrollDownLink from '@/app/(hero)/HeroScrollDownLink';
import {RocketLaunch} from '@phosphor-icons/react/dist/ssr';
import {Anchor, ThemeColor} from '@/constants';
import react, {ComponentType} from 'react';

vi.mock('framer-motion', async () => {
	const {forwardRef} = await vi.importActual<typeof react>('react');
	return {
		motion: (Component: ComponentType<any>) =>
			forwardRef((props, ref) => <Component {...props} ref={ref} />),
	};
});

vi.mock('@phosphor-icons/react/dist/ssr', () => {
	return {
		RocketLaunch: vi.fn(props => (
			<div data-testid="rocket-icon" {...props} />
		)),
	};
});

test('renders the link with correct text', () => {
	render(<HeroScrollDownLink />);

	const linkElement = screen.getByRole('link', {name: /continue journey/i});
	expect(linkElement).toBeInTheDocument();
	expect(linkElement).toHaveTextContent('Continue journey');
});

test('link has correct href attribute', () => {
	render(<HeroScrollDownLink />);

	const linkElement = screen.getByRole('link', {name: /continue journey/i});
	expect(linkElement).toHaveAttribute('href', `#${Anchor.ABOUT}`);
});

test('renders the RocketLaunch icon with correct properties', async () => {
	render(<HeroScrollDownLink />);

	expect(RocketLaunch).toHaveBeenCalledWith(
		expect.objectContaining({
			color: ThemeColor.BACKGROUND.CONTRAST_TEXT,
			size: 32,
			weight: 'light',
		}),
		expect.anything(),
	);

	const iconElement = screen.getByTestId('rocket-icon');
	expect(iconElement).toBeInTheDocument();
});
