'use client';

import { useMyContext } from '@/context';
import { NextFont } from 'next/dist/compiled/@next/font';
import { ReactNode, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import Image from 'next/image';
import Header from '../header';
import Nav from '../navBar';
import { HelmetProvider } from 'react-helmet-async';
import { isAuthStatus, responseTypes } from '@/types';
import { usePathname, useRouter } from 'next/navigation';

export default function Body({ inter, children }: { inter: NextFont; children: ReactNode }) {
	const luffyFull = '/bg/luffy-sun-god.webp';
	const itachi1024 = '/bg/itachi-1024.jpg';
	const {
		state: {
			loggedIn,
			theme,
			user: { theme: userTheme },
		},
		dispatch,
	} = useMyContext();
	const { push } = useRouter();
	const path = usePathname();

	useEffect(() => {
		const promise = async () => {
			const req = await fetch('/api/verify-session');
			return (await req.json()) as unknown as responseTypes;
		};

		toast.promise(promise, {
			loading: 'verifying session....',
			error: (error: Error) => error.message,
			success(data) {
				if (isAuthStatus(data)) {
					if (data.authStatus === 'invalid token') {
						dispatch({ type: 'logOut', payload: { isloggedIn: false } });
						push('/login');
						return `your session has expired, Please Sign In`;
					}

					if (data.authStatus === 'Still Valid') {
						console.log(data.user, path);
						dispatch({ type: 'logIn', payload: { isloggedIn: true, user: data.user } });
						if (path === '/login') {
							push('/');
							return `your session is ${data.authStatus}`;
						}
						return `your session is ${data.authStatus}`;
					}
				}
				return 'Field to verify Your Session';
			},
		});
	}, []);

	const imageSrc = () => {
		if (loggedIn) return userTheme === 'light' ? luffyFull : itachi1024;
		return theme === 'light' ? luffyFull : itachi1024;
	};

	const imageBrightness = () => {
		if (loggedIn) return userTheme === 'dark' ? 'brightness-50' : 'brightness-75';
		return theme === 'dark' ? 'brightness-50' : 'brightness-75';
	};

	return (
		<body className={`${inter.className} ${loggedIn ? userTheme : theme} w-screen h-screen overflow-hidden `}>
			<Image
				src={imageSrc()}
				sizes={'(max-width: 420) 22vw, (max-width: 1024) 53.5vw, 100vw'}
				title={'__'}
				alt={'__'}
				className={`fixed top-0 left-0 w-full h-full transition duration-300 ease-in-out overflow-hidden object-cover ${imageBrightness()}`}
				width={100}
				height={100}
			/>
			<HelmetProvider>
				<main className={`relative w-full h-full flex flex-col items-center font-semibold font-poppins text-white dark:text-white`}>
					<Header />
					{children}
					<Nav />
				</main>
			</HelmetProvider>
			<Toaster
				richColors
				position='bottom-left'
				duration={4000}
				theme={loggedIn ? userTheme : theme}
			/>
		</body>
	);
}
