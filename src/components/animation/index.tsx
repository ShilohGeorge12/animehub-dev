'use client';

// import { motion, AnimationProps } from 'framer-motion';

interface AnimationComponentProps {
	children: JSX.Element;
	styles: AnimationProps;
	className: string;
	uniqueKey: string;
}

// export function Animation({ children, styles, className, uniqueKey }: AnimationComponentProps) {
// 	return (
// 		// <AnimatePresence mode='wait'>
// 		<motion.section
// 			{...styles}
// 			className={className}
// 			key={uniqueKey}
// 			// initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
// 			// animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
// 			// exit={{ opacity: 0, translateZ: -100 }}
// 			// transition={{ type: 'spring', damping: 10, stiffness: 100 }}
// 		>
// 			{children}
// 		</motion.section>
// 		// </AnimatePresence>
// 	);
// }

import { motion, AnimatePresence, AnimationProps } from 'framer-motion';
import { useMemo } from 'react';

export function Animation({ children, styles, className, uniqueKey }: AnimationComponentProps) {
	const motionSection = useMemo(
		() => (
			<motion.section
				key={uniqueKey}
				{...styles}
				className={className}>
				{children}
			</motion.section>
		),
		[children, styles, className]
	);

	return <AnimatePresence mode='wait'>{motionSection}</AnimatePresence>;
}
