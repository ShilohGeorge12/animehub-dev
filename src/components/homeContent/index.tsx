'use client';

import { useMyContext } from '@/context';
// import { isAuthStatus, responseTypes } from '@/types';
import Image from 'next/image';
// import { useEffect } from 'react';
// import { toast } from 'sonner';

export function HomeContent() {
	const {
		state: { loggedIn },
	} = useMyContext();

	// useEffect(() => {
	// 	const promise = async () => {
	// 		const req = await fetch('/api/login');
	// 		return (await req.json()) as unknown as responseTypes;
	// 	};

	// 	toast.promise(promise, {
	// 		loading: 'verifying session....',
	// 		error: (error: Error) => error.message,
	// 		success(data){
	// 			if(isAuthStatus(data)){
	// 				if (data.authStatus === 'jwt expired') {

	// 				}
	// 			}
	// 			return ''
	// 		}
	// 	})
	// }, []);

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
					/>
					<p className='text-3xl font-bold tracking-wider'>Your Logged Out!</p>
				</div>
			)}
			<div className={`flex flex-col gap-3 items-center justify-center`}>
				{
					loggedIn && "You're Logged In"
					//  <>
					// 	<Anime animes={paginatedAnimes} />
					// 	<div className='absolute bottom-2 left-1/6'>
					// 		<PaginationNav />
					// 	</div>
					// </>
				}
			</div>
		</>
	);
}
