'use client';

import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

interface ResetPasswordFormProps {
	children: React.ReactNode;
	submitText: string;
	action: (formdata: FormData) => Promise<void>;
}

export function ResetPasswordForm({ children, submitText, action }: ResetPasswordFormProps) {
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
	const path = usePathname();

	const onAction = async (formData: FormData) => {
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirm-password');
		if (path === '/forget-password' && !email) {
			toast.error('Enter a valid Email Address');
			return;
		}

		if (path.includes('/reset-password') && (!password || !confirmPassword) && password !== confirmPassword) {
			toast.error('Enter a valid Password and Confirm Password');
			return;
		}
		await action(formData);
	};

	return (
		<form
			action={onAction}
			className='bg-zinc-900/80 backdrop-blur w-[95%] md:w-3/5 lg:w-1/2 min-h-[20vh] rounded-2xl flex-col flex gap-4 items-center py-4'>
			{children}
			<button
				type='submit'
				className={`p-2 bg-pink-500 rounded-lg text-sm font-bold tracking-wider text-white transition duration-500 ease-in-out hover:scale-110 hover:shadow-xl disabled:bg-pink-700`}>
				{submitText}
			</button>
		</form>
	);
}
