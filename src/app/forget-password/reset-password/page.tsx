import Link from 'next/link';
import type { Metadata } from 'next';
import { FaArrowLeft } from 'react-icons/fa';
import { onResetPassword } from '@/actions';
import { ResetPasswordForm } from '@/components/ResetPassword';

export const metadata: Metadata = {
	title: 'Reset Password | Experience anime like never before',
	description: 'Reset Your Password For Animehub Seamlessly Here and Continue To Experience Anime LIke Never Before',
};

export default async function ResetPassword() {
	return (
		<section className='flex flex-col items-center w-full h-full gap-4'>
			<div className='flex items-center justify-start w-[95%] md:w-3/5 lg:w-1/2'>
				<Link
					href={`/forget-password`}
					className={`text-xl p-2 rounded-md bg-pink-500 transition duration-300 ease-in-out hover:scale-105 hover:rounded-lg hover:bg-white hover:text-pink-500`}>
					<FaArrowLeft />
				</Link>
				<h1 className='flex-1 text-2xl font-semibold tracking-wider text-center'>Reset Password</h1>
			</div>
			<ResetPasswordForm action={onResetPassword} />
		</section>
	);
}
