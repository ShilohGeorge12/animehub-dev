'use client';

import { ImSpinner9 } from 'react-icons/im';
import { FaSearch, FaCheckCircle, FaSpinner } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';
import { AnimeType, isAuthStatus, isSearchResult, responseTypes } from '@/types';
import { toast } from 'sonner';
import { Anime } from '@/components/anime';
import { useMyContext } from '@/context';

export function SearchClient() {
	const { push } = useRouter();
	const { dispatch } = useMyContext();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') ?? '');
	const [query] = useDebounce(searchQuery, 600);
	const [results, setResults] = useState<AnimeType[]>([]);
	const [fetchStatus, setFetchStatus] = useState<'idle' | 'fetching'>('idle');

	useEffect(() => {
		if (query === '') {
			setSearchQuery('');
			setResults([]);
			push('/search', { scroll: false });
			return;
		}

		if (query !== '') {
			push(`?q=${query.replace(/\s/g, '_')}`, { scroll: false });
			const fetchAnime = async () => {
				setFetchStatus('fetching');
				const req = await fetch(`/api/animes/search?q=${query}`);
				const res = (await req.json()) as responseTypes;
				if ('error' in res) {
					toast.error(res.error);
					return;
				}

				if (isAuthStatus(res) && res.authStatus === 'invalid token') {
					dispatch({ type: 'logOut', payload: { isloggedIn: false } });
					push('/login');
					return;
				}

				if (isSearchResult(res)) {
					setResults(res.animes);
					return;
				}
			};
			fetchAnime()
				.catch((err) => err instanceof Error && toast.error(err.message))
				.finally(() => setFetchStatus('idle'));
		}
	}, [query]);

	return (
		<>
			<form
				aria-aria-label='Search Anime Form'
				className={`w-4/5 md:w-2/4 flex flex-col items-center relative mx-auto h-fit text-white`}>
				<input
					type='text'
					value={searchQuery}
					placeholder='Search Your Favorite Anime...'
					onChange={(e) => setSearchQuery(e.target.value)}
					className={`w-full py-2 px-7 rounded-xl border-2 bg-black/60 bg-opacity-70 border-opacity-40 focus-within:shadow focus-within:shadow-pink-500 border-pink-500 outline-0 tracking-wider`}
				/>
				<span className='absolute text-pink-500 font-bold text-sm top-[14px] left-2'>
					<FaSearch />
				</span>
				{fetchStatus === 'fetching' && (
					<span className='absolute text-white font-bold text-sm top-[14px] right-2 animate-rotate'>
						<FaSpinner />
					</span>
				)}
				{fetchStatus === 'idle' && query != '' && (
					<span className='absolute text-green-500 font-bold text-sm top-[14px] right-2'>
						<FaCheckCircle />
					</span>
				)}
			</form>
			<section className='flex flex-col items-center justify-center w-full gap-2'>
				{fetchStatus === 'idle' && results.length > 0 && <Anime animes={results} />}
				{fetchStatus === 'fetching' && (
					<section className='w-full min-h-[150px] flex flex-col items-center justify-end'>
						<span className='text-5xl text-white transition duration-500 animate-rotate'>
							<ImSpinner9 />
						</span>
					</section>
				)}
				{fetchStatus === 'idle' && query !== '' && results.length === 0 && <p className='text-3xl'>&quot;{query}&quot; Was Not Found!</p>}
			</section>
		</>
	);
}
