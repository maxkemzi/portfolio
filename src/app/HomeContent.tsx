'use client';

import {Footer, Header} from '@/components';
import {useLayoutEffect, useRef, useState} from 'react';
import {Typography} from '@/components/ui';
import {AnimatePresence, motion} from 'framer-motion';
import {ProjectWithInclusions} from '@/types';
import {ProjectCategory} from '@prisma/client';
import {useIsClient} from '@/hooks';
import {HeroSection} from './(hero)';
import {AboutSection} from './(about)';
import ProjectsSection from './(projects)';
import ContactSection from './(contact)';

const FIXED_HEADER_TRANSITION_DURATION = 0.5;
const MotionHeader = motion(Header);

interface Props {
	projects: ProjectWithInclusions[];
	categories: ProjectCategory[];
}

const HomeContent = (props: Props): JSX.Element => {
	const {projects, categories} = props;

	const isClient = useIsClient();
	const headerRightBlockRef = useRef<HTMLDivElement>(null);
	const heroRef = useRef<HTMLElement>(null);
	const [fixedHeaderIsVisible, setFixedHeaderIsVisible] = useState(false);

	// Instantly scroll to anchor when navigating from another page
	useLayoutEffect(() => {
		if (!isClient) return;

		const {hash} = window.location;
		if (!hash) return;

		const scrollToAnchor = () => {
			const anchor = document.querySelector(hash);
			anchor?.scrollIntoView({behavior: 'instant'});
		};
		scrollToAnchor();
	}, [isClient]);

	useLayoutEffect(() => {
		if (!isClient) return;

		const updateFixedHeaderVisibility = () => {
			if (!heroRef.current) return;

			const {height: heroHeight} = heroRef.current.getBoundingClientRect();
			setFixedHeaderIsVisible(window.scrollY >= heroHeight);
		};

		updateFixedHeaderVisibility();

		window.addEventListener('scroll', updateFixedHeaderVisibility);
		return () => {
			window.removeEventListener('scroll', updateFixedHeaderVisibility);
		};
	}, [isClient]);

	if (!isClient) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<>
			<Header rightBlockRef={headerRightBlockRef} />
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
					headerRightBlockRef={headerRightBlockRef}
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
