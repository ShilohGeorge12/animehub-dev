'use client';

import Image from 'next/image';
import { useMyContext } from '@/context';
import Link from 'next/link';
import { useState } from 'react';
import { BiUserPlus } from 'react-icons/bi';

export function ClientHeader() {
	const {
		state: {
			loggedIn,
			// theme,
			user: { image, username },
		},
		// updateTheme,
	} = useMyContext();

	const [viewProfile, setViewProfile] = useState<boolean>(false);

	// const IsTheme = () => {
	// 	if (loggedIn) {
	// 		return userTheme === 'light' ? BiSun : FaMoon;
	// 	}
	// 	return theme === 'light' ? BiSun : FaMoon;
	// };

	return (
		<div className='relative flex items-center justify-end gap-2'>
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
	);
}
