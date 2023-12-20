'use client';

import { useMyContext } from '@/context';
import { NextFont } from 'next/dist/compiled/@next/font';
import { ReactNode, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import Image from 'next/image';
import Header from '../header';
import Nav from '../navBar';
import { HelmetProvider } from 'react-helmet-async';
import { isError, isUser, responseTypes } from '@/types';
import { usePathname } from 'next/navigation';

export default function Body({ inter, children }: { inter: NextFont; children: ReactNode }) {
	const luffyFull = '/bg/luffy-sun-god.webp';
	const itachi1024 = '/bg/itachi-1024.jpg';
	const {
		state: { loggedIn },
		dispatch,
	} = useMyContext();
	const path = usePathname();

	useEffect(() => {
		const promise = async () => {
			const loginDetails = {
				username: 'animehub',
				password: 'animehub@dev',
				// email: 'guest@animehub.dev',
			};
			const req = await fetch('/api/login', {
				method: 'POST',
				body: JSON.stringify(loginDetails),
			});
			const res = (await req.json()) as unknown as responseTypes;
			return res;
		};
		if (loggedIn === false && path !== '/login' && path !== '/signup' && !path.includes('/forget-password')) {
			toast.promise(promise, {
				loading: 'sending login credencials...',
				success: (data: responseTypes) => {
					if (isError(data)) {
						const error = typeof data.error === 'string' ? data.error : data.error.join(', ');
						throw new Error(error);
					}

					if (isUser(data)) {
						dispatch({ type: 'logIn', payload: { isloggedIn: true, user: data } });
						return `${data.username} login was successfully`;
					}

					return 'login failed!';
				},
				error: (error: Error) => error.message,
			});
		}
	}, []);

	// const imageSrc = () => {
	// 	if (loggedIn) return userTheme === 'light' ? luffyFull : itachi1024;
	// 	return theme === 'light' ? luffyFull : itachi1024;
	// };

	// const imageBrightness = () => {
	// 	if (loggedIn) return userTheme === 'dark' ? 'brightness-50' : 'brightness-75';
	// 	return theme === 'dark' ? 'brightness-50' : 'brightness-75';
	// };

	return (
		<body className={`${inter.className} w-screen h-screen overflow-hidden `}>
			<Image
				src={itachi1024}
				sizes={'(max-width: 420) 22vw, (max-width: 1024) 53.5vw, 100vw'}
				title={'__'}
				alt={'__'}
				className={`fixed top-0 left-0 w-full h-full transition duration-300 ease-in-out overflow-hidden object-cover brightness-50`}
				width={100}
				height={100}
			/>
			<HelmetProvider>
				<main className={`relative w-full h-full flex flex-col items-center font-semibold font-poppins text-white`}>
					<Header />
					{children}
					<Nav />
				</main>
			</HelmetProvider>
			<Toaster
				richColors
				position='bottom-left'
				duration={4000}
				closeButton
				theme={'dark'}
			/>
		</body>
	);
}
