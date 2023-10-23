'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import MetaData from '@/components/metaData';
import { useLayoutEffect, useState } from 'react';

function NotFound() {
	const { push } = useRouter();
	const [location, setLocation] = useState<{ origin: string; pathname: string }>({ origin: '', pathname: '' });
	const { origin, pathname } = location;

	useLayoutEffect(() => {
		setLocation({ origin: window.location.origin, pathname: window.location.pathname });
	}, []);

	return (
		<motion.section
			className={`flex-1 flex flex-col md:flex-row items-center justify-center gap-8`}
			initial={{ opacity: 0, translateY: '-100vh', translateZ: -100 }}
			animate={{ opacity: 1, translateX: '0vw', translateY: '0vh', translateZ: 0 }}
			exit={{ opacity: 0, translateZ: -100 }}
			transition={{ type: 'spring', damping: 10, stiffness: 100 }}>
			<MetaData
				title={'404 | NotFound'}
				description={`404 Page ${pathname} NotFound`}
				path={`${origin}${pathname}`}
			/>
			<Image
				src={'/others/sad-hime.webp'}
				loading='eager'
				alt='sadhime'
				title='sadhime'
				className={`w-4/5 md:w-auto`}
				width={1000}
				height={1000}
			/>
			<div className='flex flex-col items-center gap-4'>
				<div className='flex items-center gap-1 text-xl'>
					<p className='px-3 py-2 text-white transition duration-300 bg-red-500 rounded-lg hover:scale-105'>{pathname}</p>
					<p>is Not Found</p>
				</div>
				<button
					className={`p-2 bg-pink-500 text-white rounded-lg transition duration-500 hover:shadow-md hover:scale-110`}
					onClick={() => push('/')}>
					Back To Home Page
				</button>
			</div>
		</motion.section>
	);
}

export default NotFound;
