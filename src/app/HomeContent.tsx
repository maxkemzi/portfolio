'use client';

import {Footer, Header} from '@/components';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Typography} from '@/components/ui';
import {AnimatePresence, motion} from 'framer-motion';
import {ProjectWithInclusions} from '@/types';
import {ProjectCategory} from '@prisma/client';
import {HeroSection} from './(hero)';
import {AboutSection} from './(about)';
import ProjectsSection from './(projects)';
import ContactSection from './(contact)';

interface Props {
	projects: ProjectWithInclusions[];
	categories: ProjectCategory[];
}

const MOON_SPACING = 32;
const WAVE_SPACING = 16;
const FIXED_HEADER_TRANSITION_DURATION = 0.5;

const MotionHeader = motion(Header);

const HomeContent = (props: Props): JSX.Element => {
	const {projects, categories} = props;

	const [isClient, setIsClient] = useState(false);
	const navbarRef = useRef<HTMLElement>(null);
	const heroRef = useRef<HTMLElement>(null);
	const [heroWaveWidth, setHeroWaveWidth] = useState(0);
	const [heroMoonTopPos, setHeroMoonTopPos] = useState(0);
	const [fixedHeaderIsVisible, setFixedHeaderIsVisible] = useState(false);

	useEffect(() => {
		setIsClient(true);
	}, []);

	useLayoutEffect(() => {
		if (!isClient) {
			return;
		}

		const {hash} = window.location;
		if (hash) {
			const section = document.querySelector(hash);
			section?.scrollIntoView({behavior: 'instant'});
		}
	}, [isClient]);

	useLayoutEffect(() => {
		if (!isClient) {
			return;
		}

		const updateHeroWaveWidth = () => {
			if (!navbarRef.current) {
				return;
			}

			const {top, left} = navbarRef.current.getBoundingClientRect();
			setHeroMoonTopPos(top + window.scrollY + MOON_SPACING);
			setHeroWaveWidth(left - window.scrollX - WAVE_SPACING);
		};

		updateHeroWaveWidth();

		window.addEventListener('resize', updateHeroWaveWidth);

		return () => {
			window.removeEventListener('resize', updateHeroWaveWidth);
		};
	}, [isClient]);

	useLayoutEffect(() => {
		if (!isClient) {
			return;
		}

		const updateFixedHeaderIsVisible = () => {
			if (!heroRef.current) {
				return;
			}

			const {height: heroHeight} = heroRef.current.getBoundingClientRect();
			setFixedHeaderIsVisible(window.scrollY >= heroHeight);
		};

		updateFixedHeaderIsVisible();

		window.addEventListener('scroll', updateFixedHeaderIsVisible);

		return () => {
			window.removeEventListener('scroll', updateFixedHeaderIsVisible);
		};
	}, [isClient]);

	if (!isClient) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<>
			<Header navbarRef={navbarRef} />
			<AnimatePresence>
				{fixedHeaderIsVisible ? (
					<MotionHeader
						position="fixed"
						blurred
						initial={{y: '-100%', opacity: 0}}
						animate={{
							y: 0,
							opacity: 1,
							transition: {
								duration: FIXED_HEADER_TRANSITION_DURATION,
								ease: 'easeOut',
							},
						}}
						exit={{
							y: '-100%',
							opacity: 0,
							transition: {
								duration: FIXED_HEADER_TRANSITION_DURATION,
								ease: 'easeIn',
							},
						}}
					/>
				) : null}
			</AnimatePresence>
			<main>
				<HeroSection
					ref={heroRef}
					waveWidth={heroWaveWidth}
					moonTopPos={heroMoonTopPos}
				/>
				<AboutSection />
				<ProjectsSection projects={projects} categories={categories} />
				<ContactSection />
			</main>
			<Footer />
		</>
	);
};

export default HomeContent;
