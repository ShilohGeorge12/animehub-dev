import Image from 'next/image';
import { ClientHeader } from './client-header';
// import { FaMoon } from 'react-icons/fa';
// import { BiSun } from 'react-icons/bi';
// import { ThemeBtn } from '../button';

export default function Header() {
	return (
		<header className='grid grid-cols-3 items-center gap-4 p-2 md:w-[99%] mx-auto mt-[2px]'>
			<section className='flex items-center gap-2'>
				<Image
					src={'/tv-64.png'}
					title='animehub-image'
					alt='animehub-image'
					loading='eager'
					className='object-cover w-10 iphone_sm:w-8 md:w-11 w-xl:w-16'
					width={100}
					height={100}
					priority
				/>
				<h1 className='text-2xl font-bold text-transparent animate-text bg-gradient-to-r w-xl:text-5xl from-teal-500 via-purple-500 to-pink-500 bg-clip-text'>
					animehub
				</h1>
			</section>
			<div />
			<ClientHeader />
		</header>
	);
}
