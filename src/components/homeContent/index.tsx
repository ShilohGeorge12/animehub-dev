'use client';

import { useMyContext } from '@/context';
import { usePagination } from '@/hooks/usePagination';
import { AnimeType, isAnimes, responseTypes } from '@/types';
import Image from 'next/image';
import { useEffect, useState, useLayoutEffect } from 'react';
import { toast } from 'sonner';
import { Anime } from '../anime';
import { useRouter } from 'next/navigation';

export function HomeContent() {
	const {
		state: { loggedIn },
		dispatch,
	} = useMyContext();
	const { push } = useRouter();
	const [animes, setAnimes] = useState<AnimeType[]>([]);
	const [totalAnimes, setTotalAnimes] = useState<number>(0);
	const limitPerPage = 8;

	const [PaginationNav, paginatedAnimes] = usePagination({
		animes,
		limitPerPage,
		totalAnimes,
		setAnimes,
		setTotalAnimes,
	});

	useLayoutEffect(() => {
		const promise = async () => {
			const req = await fetch(`/api/animes?page=0&perpage=${limitPerPage}`);
			return (await req.json()) as unknown as responseTypes;
		};

		if (loggedIn) {
			toast.promise(promise, {
				loading: `fetching animes in page 1.....`,
				success: (data) => {
					if ('error' in data) {
						const error = typeof data.error === 'string' ? data.error : data.error[0];
						toast.error(error);
						dispatch({ type: 'logOut', payload: { isloggedIn: false } });
						push('/login');
						return 'Please Log In Your Previous Session has expired!';
					}
					if (isAnimes(data)) {
						setAnimes(data.animes);
						setTotalAnimes(data.totalAnimes);
					}
					return 'successfully fetched animes in page 1';
				},
				error: (error: Error) => error.message,
				duration: 6000,
			});
		}
	}, [loggedIn]);

	return (
		<>
			{!loggedIn && (
				<div className='flex flex-col h-[80%] items-center justify-center gap-4'>
					<Image
						src={'/others/lock.png'}
						alt='Not LoggedIn'
						title='Not LoggedIn'
						className='w-1/2 transition duration-300 md:w-1/5 hover:scale-110'
						width={1000}
						height={1000}
						priority
					/>
					<p className='text-3xl font-bold tracking-wider'>Your Logged Out!</p>
				</div>
			)}
			<div className={`flex flex-col gap-3 items-center justify-center`}>
				{loggedIn && (
					<>
						<Anime animes={paginatedAnimes} />
						<div className='absolute w-full bottom-3 left-1/6'>
							<PaginationNav />
						</div>
					</>
				)}
			</div>
		</>
	);
}
