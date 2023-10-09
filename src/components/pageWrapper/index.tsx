'use client';

import { AnimatePresence, motion } from 'framer-motion';

export function PageWrapper({ children }: { children: JSX.Element }) {
	return (
		<AnimatePresence mode='wait'>
			<motion.section
				initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
				animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
				exit={{ opacity: 0, translateZ: -100 }}
				transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
				{children}
			</motion.section>
		</AnimatePresence>
	);
}
