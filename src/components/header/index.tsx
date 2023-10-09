'use client';

import { useMyContext } from '@/context';
import Image from 'next/image';
import { FaMoon } from 'react-icons/fa';
import { BiSun } from 'react-icons/bi';
import { ThemeBtn } from '../button';

export default function Header() {
	const {
		state: {
			loggedIn,
			theme,
			user: { image, username, theme: userTheme },
		},
		updateTheme,
	} = useMyContext();

	const IsTheme = () => {
		if (loggedIn) {
			return userTheme === 'light' ? BiSun : FaMoon;
		}
		return theme === 'light' ? BiSun : FaMoon;
	};

	return (
		<header className='grid grid-cols-3 items-center gap-4 p-2 md:w-[99%] mx-auto mt-[2px]'>
			<div className='flex items-center gap-4'>
				<Image
					src={'/tv-64.png'}
					title='animehub-image'
					alt='animehub-image'
					loading='eager'
					className='object-cover w-10 md:w-11'
					width={100}
					height={100}
				/>
				<h1 className='text-3xl font-bold text-transparent animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 bg-clip-text '>animehub</h1>
			</div>
			<div className=''></div>
			<div className='flex items-center justify-end gap-4'>
				<ThemeBtn
					name='theme'
					onClick={updateTheme}
					Value={IsTheme()}
				/>
				<Image
					src={loggedIn ? image : '/others/user2.png'}
					alt='profile'
					title={`${username} Image` ?? 'profileImage'}
					className='object-center w-10 md:w-12 rounded-2xl'
					width={100}
					height={100}
				/>
				{loggedIn && <p className={`hidden md:flex capitalize text-sm text-white justify-self-end`}>{username}</p>}
			</div>
		</header>
	);
}