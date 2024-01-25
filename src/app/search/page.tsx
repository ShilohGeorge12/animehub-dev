import { SearchClient } from '@/components/searchClient';
import { Metadata } from 'next';
import { Animation } from '@/components/animation';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Search',
	description:
		"Explore endless anime options effortlessly with Animehub's powerful search. From latest releases to timeless classics, our user-friendly platform ensures a seamless streaming experience. Dive into the world of Japanese animation. Start your Animehub journey now!",
	robots: {
		index: false,
		follow: true,
	},
};

export default function Search() {
	return (
		<Animation
			className={`flex flex-col items-center w-full h-full gap-3 p-2`}
			uniqueKey={'search-animation-layer'}
			styles={{
				initial: { opacity: 0, scale: 0 },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0 },
				transition: { type: 'spring', damping: 10, stiffness: 100 },
			}}>
			<Suspense fallback={<div>loading...</div>}>
				<SearchClient />
			</Suspense>
		</Animation>
	);
}
