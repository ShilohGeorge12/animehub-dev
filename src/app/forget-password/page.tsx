import { onForgetPassword } from '@/actions';
import { ForgetPasswordForm } from '@/components/forgetPassword';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'Forget Password | Experience anime like never before',
	description: 'Forgotten Your Password For Animehub. You Can Recover Your Account Using Your Email Address',
};

export default async function ForgetPassword() {
	return (
		<section className='flex flex-col items-center w-full h-full gap-4'>
			<div className='flex items-center justify-start w-[95%] md:w-3/5 lg:w-1/2'>
				<Link
					href={`/login`}
					className={`text-xl p-2 rounded-md bg-pink-500 transition duration-300 ease-in-out hover:scale-105 hover:rounded-lg hover:bg-white hover:text-pink-500`}>
					<FaArrowLeft />
				</Link>
				<h1 className='flex-1 text-2xl font-semibold tracking-wider text-center'>Reset Password</h1>
			</div>
			<ForgetPasswordForm action={onForgetPassword} />
		</section>
	);
}
