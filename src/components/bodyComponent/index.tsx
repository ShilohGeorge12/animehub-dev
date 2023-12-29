'use client';

import { useMyContext } from '@/context';
// import { NextFont } from 'next/dist/compiled/@next/font';
import { ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
// import Image from 'next/image';
import Header from '../header';
import Nav from '../navBar';
import { isError, isUser, responseTypes } from '@/types';
import { usePathname } from 'next/navigation';
import { HelmetProvider } from 'react-helmet-async';

export default function BodyComponent({ children }: { children: ReactNode }) {
	// const luffyFull = '/bg/luffy-sun-god.webp';
	// const itachi1024 = '/bg/itachi-1024.jpg';
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
		<HelmetProvider>
			<main className={`relative w-full h-full flex flex-col items-center font-semibold font-poppins text-white`}>
				<Header key={'header-component'} />
				{children}
				<Nav key={'navBar-component'} />
			</main>
		</HelmetProvider>
	);
}
