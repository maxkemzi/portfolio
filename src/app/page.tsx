'use client';

import {ContactForm, Header} from '@/components';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Typography} from '@/components/ui';
import {HeroSection} from './(hero)';

const Home = () => {
	const [isClient, setIsClient] = useState(false);
	const navbarRef = useRef<HTMLElement>(null);
	const [heroWaveWidth, setHeroWaveWidth] = useState(0);
	const [heroMoonTopPos, setHeroMoonTopPos] = useState(0);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useLayoutEffect(() => {
		if (isClient) {
			const updateHeroWaveWidth = () => {
				if (!navbarRef.current) {
					return;
				}

				const {top, left} = navbarRef.current.getBoundingClientRect();
				const waveSpacing = 16;
				const moonSpacing = 32;

				setHeroWaveWidth(left - waveSpacing);
				setHeroMoonTopPos(top + moonSpacing);
			};

			updateHeroWaveWidth();

			window.addEventListener('resize', updateHeroWaveWidth);

			return () => {
				window.removeEventListener('resize', updateHeroWaveWidth);
			};
		}
	}, [isClient]);

	if (!isClient) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<>
			<Header navbarRef={navbarRef} />
			<main>
				<HeroSection
					waveWidth={heroWaveWidth}
					moonTopPos={heroMoonTopPos}
				/>
				<ContactForm />
			</main>
		</>
	);
};

export default Home;
