import {HeroSection} from '@/app/(hero)';
import {render, screen} from '@testing-library/react';
import HeroScrollDownLink from '@/app/(hero)/HeroScrollDownLink';

vi.mock('@/app/(hero)/HeroScrollDownLink', () => ({
	default: vi.fn(() => <div data-testid="scroll-down" />),
}));

const defaultProps = {
	waveWidth: 1000,
	moonTopPos: 100,
};

describe('download CV button', () => {
	test('renders the download button with correct text', () => {
		render(<HeroSection {...defaultProps} />);

		const downloadButton = screen.getByRole('link', {name: /download cv/i});
		expect(downloadButton).toBeInTheDocument();
		expect(downloadButton).toHaveTextContent('Download CV');
	});

	test('download button has correct href attribute', () => {
		render(<HeroSection {...defaultProps} />);

		const downloadButton = screen.getByRole('link', {name: /download cv/i});
		expect(downloadButton).toHaveAttribute('href', '/files/cv.pdf');
	});

	test('download button has correct download attribute', () => {
		render(<HeroSection {...defaultProps} />);

		const downloadButton = screen.getByRole('link', {name: /download cv/i});
		expect(downloadButton).toHaveAttribute(
			'download',
			'CV_Maksym_Kyrychenko',
		);
	});
});

test('renders HeroScrollDownLink component', () => {
	render(<HeroSection {...defaultProps} />);

	expect(HeroScrollDownLink).toHaveBeenCalled();

	const scrollDownLinkElement = screen.getByTestId('scroll-down');
	expect(scrollDownLinkElement).toBeInTheDocument();
});
