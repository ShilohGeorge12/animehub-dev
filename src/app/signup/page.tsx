'use client';

// import { useMyContext } from '@/context';
import Image from 'next/image';

import { Animation } from '@/components/animation';
import { SignUpClient } from '@/components/signUpClient';

interface SignUpUser {
	username: string;
	email: string;
	password: string;
	gender: 'male' | 'female' | 'Specify Your Gender';
	image: File | '';
}

export default function SignUp() {
	const initState: SignUpUser = {
		username: '',
		password: '',
		email: '',
		gender: 'Specify Your Gender',
		image: '',
	};

	return (
		<Animation
			className='flex flex-col items-center w-full h-full gap-3 lg:gap-0'
			uniqueKey={'SignUp-Animation-Layer'}
			styles={{
				initial: { opacity: 0, scale: 0 },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0 },
				transition: { type: 'spring', damping: 10, stiffness: 100 },
			}}>
			<>
				<p className='text-xl font-semibold tracking-wider text-center text-white md:text-3xl'>Create an Account</p>
				<SignUpClient />
			</>
		</Animation>
	);
}
