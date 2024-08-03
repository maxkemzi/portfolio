'use client';

import {Footer, Header} from '@/components';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Typography} from '@/components/ui';
import {HeroSection} from './(hero)';
import {AboutSection} from './(about)';
import ProjectsSection from './(projects)';
import ContactSection from './(contact)';

const WAVE_SPACING = 16;
const MOON_SPACING = 32;

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

				setHeroWaveWidth(left - WAVE_SPACING);
				setHeroMoonTopPos(top + MOON_SPACING);
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
				<AboutSection />
				<ProjectsSection />
				<ContactSection />
			</main>
			<Footer />
		</>
	);
};

export default Home;
