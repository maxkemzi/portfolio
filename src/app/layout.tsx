import type {Metadata} from 'next';
import {Exo_2} from 'next/font/google';
import './globals.css';
import {twJoin} from 'tailwind-merge';

const exo2Font = Exo_2({subsets: ['latin']});

export const metadata: Metadata = {
	title: 'Max Kemzi Portfolio',
	description: 'Portfolio of the software engineer by the name of Max Kemzi.',
};

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) => {
	return (
		<html lang="en" className="scroll-smooth">
			<body
				className={twJoin(
					exo2Font.className,
					'relative bg-background-main bg-grid bg-[length:100px_100px] bg-center text-background-contrastText overflow-x-hidden',
				)}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
