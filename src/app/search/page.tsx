import { SearchClient } from '@/components/searchClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Search',
	description:
		"Explore endless anime options effortlessly with Animehub's powerful search. From latest releases to timeless classics, our user-friendly platform ensures a seamless streaming experience. Dive into the world of Japanese animation. Start your Animehub journey now!",
};

export default function Search() {
	return <SearchClient />;
}
