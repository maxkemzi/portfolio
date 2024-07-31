import classNames from 'classnames';
import type {Metadata} from 'next';
import {Exo_2} from 'next/font/google';
import './globals.css';

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
		<html lang="en">
			<body className={classNames(exo2Font.className, 'bg-background-main')}>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
