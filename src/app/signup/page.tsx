import { Animation } from '@/components/animation';
import { SignUpClient } from '@/components/signUpClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Signup',
	description: 'Create an Account to explore to world of animes with us',
};

export default function SignUp() {
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
				<h2 className='text-xl font-semibold tracking-wider text-center text-white md:text-3xl'>Create an Account</h2>
				<SignUpClient />
			</>
		</Animation>
	);
}
