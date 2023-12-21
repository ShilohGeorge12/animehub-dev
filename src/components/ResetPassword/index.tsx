'use client';

import { PASSWORD_REGEX, type FetchingStatus, PASSWORD_FORMAT_MESSAGE } from '@/types';
import { useState } from 'react';
import { PasswordInput } from '../passwordInput';
import { useMyContext } from '@/context';

interface ResetPasswordFormProps {
	action: (formdata: FormData) => Promise<void | string>;
}

export function ResetPasswordForm({ action }: ResetPasswordFormProps) {
	const {
		state: { ResetPasswordEmail },
	} = useMyContext();
	const [error, setError] = useState<string>('');
	const [isSending, setIsSending] = useState<FetchingStatus>('idle');

	const onAction = async (formData: FormData) => {
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');
		const baseMessage = 'All input fields must be filled for password reset';
		const NotMatchingMessage = `Password and Confirm password does not match Please Verify`;
		setError('');

		if (!password || !confirmPassword) {
			setError(baseMessage);
			return;
		}

		if (!PASSWORD_REGEX.test(password.toString()) || !PASSWORD_REGEX.test(confirmPassword.toString())) {
			setError(PASSWORD_FORMAT_MESSAGE);
			return;
		}

		if (password !== confirmPassword) {
			setError(NotMatchingMessage);
			return;
		}

		const details = {
			password: password.toString().replaceAll(' ', ''),
			confirmPassword: confirmPassword.toString().replaceAll(' ', ''),
			email: ResetPasswordEmail,
		};
		console.log(ResetPasswordEmail);

		const data = new FormData();
		Object.entries(details).forEach(([key, val]) => data.append(key, val));
		setIsSending('fetching');

		const error = await action(data);
		if (error) {
			setError(error);
		}
		setIsSending('idle');
	};

	return (
		<form
			action={onAction}
			className='bg-zinc-900/80 backdrop-blur w-[95%] md:w-3/5 lg:w-1/2 min-h-[20vh] rounded-2xl flex-col flex gap-6 items-center py-4'>
			<PasswordInput name='password' />

			<PasswordInput name='confirm-password' />
			<span className='font-medium tracking-wider text-white text-md w-[80%]'>{error}</span>

			<button
				disabled={isSending === 'fetching'}
				type='submit'
				className={`p-2 bg-pink-500 rounded-lg text-sm md:text-base font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}>
				{isSending === 'fetching' && 'Resetting Password...'}
				{isSending === 'idle' && 'Reset Password'}
			</button>
		</form>
	);
}
