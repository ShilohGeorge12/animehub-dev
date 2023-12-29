import { onForgetPassword } from '@/actions';
import { ForgetPasswordForm } from '@/components/forgetPassword';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import { Animation } from '@/components/animation';

export const metadata: Metadata = {
	title: 'Forget Password | Experience anime like never before',
	description: 'Forgotten Your Password For Animehub. You Can Recover Your Account Using Your Email Address',
};

export default async function ForgetPassword() {
	return (
		<Animation
			className='flex flex-col items-center w-full h-full gap-4'
			uniqueKey={'forgetPassword-animation-layer'}
			styles={{
				initial: { opacity: 0, scale: 0 },
				animate: { opacity: 1, scale: 1 },
				exit: { opacity: 0, scale: 0 },
				transition: { type: 'spring', damping: 10, stiffness: 100 },
			}}>
			<>
				<section className='flex items-center justify-start w-[95%] md:w-3/5 lg:w-1/2'>
					<Link
						href={`/login`}
						className={`text-xl p-2 rounded-md bg-pink-500 transition duration-300 ease-in-out hover:scale-105 hover:rounded-lg hover:bg-white hover:text-pink-500`}>
						<FaArrowLeft />
					</Link>
					<h2 className='flex-1 text-2xl font-semibold tracking-wider text-center'>Reset Password</h2>
				</section>
				<ForgetPasswordForm action={onForgetPassword} />
			</>
		</Animation>
	);
}
