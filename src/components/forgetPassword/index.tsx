'use client';

import { useMyContext } from '@/context';
import { EMAIL_REGEX, FetchingStatus, INVALID_EMAIL_MESSAGE } from '@/types';
import { useState } from 'react';

interface ResetPasswordFormProps {
	action: (formdata: string) => Promise<void | string>;
}

export function ForgetPasswordForm({ action }: ResetPasswordFormProps) {
	const { dispatch } = useMyContext();
	const [error, setError] = useState<string>('');
	const [isSending, setIsSending] = useState<FetchingStatus>('idle');

	const onAction = async (formData: FormData) => {
		const email = formData.get('email');
		setError('');

		if (!email) {
			setError('Please Enter A Valid Email Address');
			return;
		}

		const emailAddress = email.toString().replaceAll(' ', '');

		if (!EMAIL_REGEX.test(emailAddress)) {
			setError(INVALID_EMAIL_MESSAGE);
			return;
		}

		setIsSending('fetching');

		const error = await action(emailAddress);

		if (error) {
			setError(error);
			setIsSending('idle');
			return;
		}

		dispatch({ type: 'resetPasswordEmail', payload: { userEmail: emailAddress } });
		setIsSending('idle');
	};

	return (
		<form
			aria-label='Forget Password Form'
			action={onAction}
			className='bg-zinc-900/80 backdrop-blur w-[95%] md:w-3/5 lg:w-1/2 min-h-[20vh] rounded-2xl flex-col flex gap-4 items-center py-4'>
			<input
				type='text'
				name='email'
				aria-label='Forget Password Email Input'
				placeholder={'E-Mail'}
				className={`w-[90%] md:w-3/4 h-10 px-8 outline-none border-b-2 border-pink-500 bg-transparent focus:border-b-4 placeholder:text-pink-500 placeholder:text-xl text-white text-base autofill:bg-transparent`}
			/>

			<span
				aria-errormessage='Forget Password Email Error'
				className='font-medium tracking-wider text-white text-md'>
				{error}
			</span>
			<button
				aria-disabled={isSending === 'fetching'}
				type='submit'
				className={`p-2 bg-pink-500 rounded-lg text-sm font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}>
				{isSending === 'fetching' && 'Fetching Account With Email'}
				{isSending === 'idle' && 'forget password'}
			</button>
		</form>
	);
}
