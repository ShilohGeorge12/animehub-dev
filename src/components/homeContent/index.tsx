'use client';

import { useMyContext } from '@/context';
import { usePagination } from '@/hooks/usePagination';
import { AnimeType, isAnimes, isError, responseTypes, wait } from '@/types';
import Image from 'next/image';
import { useState, useLayoutEffect } from 'react';
import { toast } from 'sonner';
import { Anime } from '../anime';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
			promise()
				.then((data) => {
					if (isError(data)) {
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
				})
				.catch((err: Error) => {
					toast.error(err.message);
				});
		}
	}, [loggedIn]);

	return (
		<>
			{!loggedIn && (
				<section className='flex flex-col h-[80%] items-center justify-center gap-4'>
					<Image
						src={'/others/lock.png'}
						alt='Not LoggedIn'
						title='Not LoggedIn'
						className='w-1/2 transition duration-300 md:w-1/5 hover:scale-110'
						width={1000}
						height={1000}
						priority
					/>
					<section className='flex items-center gap-4 text-3xl font-bold tracking-wider'>
						<Link
							href={'/login'}
							className='p-2 transition duration-700 ease-in-out bg-pink-500 rounded-xl hover:scale-110'>
							Login
						</Link>
						Or
						<Link
							href={'/signup'}
							className='p-2 transition duration-700 ease-in-out bg-pink-500 rounded-xl hover:scale-110'>
							Sign Up
						</Link>
					</section>
				</section>
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
