'use client';

export function HomeContent() {
	return (
		<>
			{/* {!loggedIn && (
				<div className='flex flex-col h-[80%] items-center justify-center gap-4'>
					<img
						src={notLoggedIn}
						alt='Not LoggedIn'
						title='Not LoggedIn'
						className='w-1/2 transition duration-300 md:w-1/5 hover:scale-110'
					/>
					<p className='text-3xl font-bold tracking-wider'>Your Logged Out!</p>
				</div>
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
