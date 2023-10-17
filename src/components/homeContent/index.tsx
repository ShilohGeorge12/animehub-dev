'use client';

import Image from 'next/image';

export function HomeContent() {
	return (
		<>
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
			{/* {!loggedIn && (
			)} */}
			<div className={`flex flex-col gap-3 items-center justify-center`}>
				{/* {loggedIn && (
					<>
						<Anime animes={paginatedAnimes} />
						<div className='absolute bottom-2 left-1/6'>
							<PaginationNav />
						</div>
					</>
				)} */}
			</div>
		</>
	);
}
