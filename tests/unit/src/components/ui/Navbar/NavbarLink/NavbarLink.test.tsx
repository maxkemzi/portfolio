import {NavbarLink} from '@/components/ui/Navbar';
import {Typography} from '@/components/ui/Typography';
import {render, screen} from '@testing-library/react';

vi.mock('@/components/ui/Typography', () => ({
	Typography: vi.fn(({children}) => (
		<span data-testid="typography">{children}</span>
	)),
}));

test('renders the link with the correct href and children', () => {
	render(<NavbarLink href="/about">About Us</NavbarLink>);

	const linkElement = screen.getByRole('link', {name: /about us/i});
	expect(linkElement).toBeInTheDocument();
	expect(linkElement).toHaveAttribute('href', '/about');
});

test('renders with Typography child', () => {
	render(<NavbarLink href="/about">About Us</NavbarLink>);

	expect(Typography).toHaveBeenCalledWith(
		expect.objectContaining({
			as: 'span',
		}),
		expect.anything(),
	);

	const typographyElement = screen.getByTestId('typography');
	expect(typographyElement).toBeInTheDocument();
});
