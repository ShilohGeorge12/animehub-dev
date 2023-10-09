'use client';
import { useMyContext } from '@/context';

export function HomeLoggedInOrOut() {
	const {
		state: { loggedIn },
	} = useMyContext();

	return (
		<>
			{!loggedIn && (
				<div className='flex flex-col h-[80%] items-center justify-center gap-4'>
					<img
						src={'/others/lock.png'}
						alt='Not LoggedIn'
						title='Not LoggedIn'
						className='w-1/2 transition duration-300 md:w-1/5 hover:scale-110'
					/>
					<p className='text-3xl font-bold tracking-wider'>Your Logged Out!</p>
				</div>
			)}
		</>
	);
}
