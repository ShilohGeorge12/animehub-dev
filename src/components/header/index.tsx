'use client';

import { useMyContext } from '@/context';
import Image from 'next/image';
import { FaMoon } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi';
import { ThemeBtn } from '../button';
import Link from 'next/link';
import { BiUserPlus } from 'react-icons/bi';

export default function Header() {
	const {
		state: {
			loggedIn,
			// theme,
			user: { image, username },
		},
		// updateTheme,
	} = useMyContext();

	// const IsTheme = () => {
	// 	if (loggedIn) {
	// 		return userTheme === 'light' ? BiSun : FaMoon;
	// 	}
	// 	return theme === 'light' ? BiSun : FaMoon;
	// };

	return (
		<header className='grid grid-cols-3 items-center gap-4 p-2 md:w-[99%] mx-auto mt-[2px]'>
			<div className='flex items-center gap-2'>
				<Image
					src={'/tv-64.png'}
					title='animehub-image'
					alt='animehub-image'
					loading='eager'
					className='object-cover w-10 iphone_sm:w-8 md:w-11 w-xl:w-16'
					width={100}
					height={100}
				/>
				<h1 className='text-2xl font-bold text-transparent animate-text bg-gradient-to-r w-xl:text-5xl from-teal-500 via-purple-500 to-pink-500 bg-clip-text'>
					animehub
				</h1>
			</div>
			<div className=''></div>
			<div className='flex items-center justify-end gap-2'>
				{username === 'animehub' && (
					<>
						<Link
							className={`hidden md:flex p-2 bg-pink-500 text-white text-md w-xl:text-xl rounded-xl transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:bg-white hover:text-pink-500`}
							href={'signup'}>
							Sign Up
						</Link>
						<Link
							className={`flex md:hidden text-xl p-1 bg-pink-500 text-white text-md rounded-lg transition duration-300 ease-in-out hover:translate-y-1 hover:scale-110 hover:bg-white hover:text-pink-500`}
							href={'signup'}>
							<BiUserPlus />
						</Link>
					</>
				)}

				{/* <ThemeBtn
					name='theme'
					onClick={updateTheme}
					Value={IsTheme()}
				/> */}
				<Image
					src={loggedIn ? `/others/${image}` : '/others/user2.png'}
					alt='profile'
					title={`${username} Image` ?? 'profileImage'}
					className='object-center w-9 w-xl:w-16 md:w-12 rounded-2xl'
					width={100}
					height={100}
				/>
				{loggedIn && <p className={`hidden md:flex capitalize text-sm w-xl:text-xl text-white justify-self-end`}>{username}</p>}
			</div>
		</header>
	);
}
