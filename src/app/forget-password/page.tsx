import { onForgetPassword } from '@/actions';
import { ResetPasswordForm } from '@/components/ResetPasswordForm';
import { Metadata } from 'next';
import Link from 'next/link';
// import { redirect } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

export const metadata: Metadata = {
	title: 'reset password | Experience anime like never before',
	description: 'Reset Your Password For Animehub here',
};

export default async function ForgetPassword() {
	return (
		<section className='flex flex-col items-center w-full h-full gap-4'>
			<div className='flex items-center justify-start w-[95%] md:w-3/5 lg:w-1/2'>
				<Link
					href={`/login`}
					className={`text-xl p-2 rounded-md bg-pink-500 transition duration-300 ease-in-out hover:scale-105 hover:rounded-lg dark:hover:bg-white dark:hover:text-pink-500`}>
					<FaArrowLeft />
				</Link>
				<h1 className='flex-1 text-2xl font-semibold tracking-wider text-center'>Reset Password</h1>
			</div>
			<ResetPasswordForm
				action={onForgetPassword}
				submitText='forget password'>
				<input
					type='text'
					name='email'
					placeholder={'email'}
					className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-white dark:border-pink-500 bg-transparent focus:border-b-4 placeholder:text-white dark:placeholder:text-pink-500 placeholder:text-xl text-white text-base autofill:bg-transparent`}
				/>
			</ResetPasswordForm>
			{/* <form
				action={handleEmailVerification}
				className='bg-black/80 dark:bg-zinc-900/80 backdrop-blur w-[95%] md:w-3/5 lg:w-1/2 min-h-[20vh] rounded-2xl flex-col flex gap-4 items-center py-4'>

				<button
					type='submit'
					className={`p-2 bg-pink-500 rounded-lg text-sm font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}>
					
				</button>
			</form> */}
		</section>
	);
}
