'use server';

import { MongoDB } from '@/db';
import { redirect } from 'next/navigation';

export const onForgetPassword = async (email: string) => {
	// console.log(email);
	const user = await MongoDB.getUserModel().findOne({ email });

	if (!user) {
		return `User with Email (${email}) Was Not Found!`;
	}

	redirect('/forget-password/reset-password');
};

export const onResetPassword = async (data: FormData) => {
	const passwordFormData = data.get('password');
	const confirmPasswordFormData = data.get('confirmPassword');
	const emailFormData = data.get('email');
	console.log(data);

	if (!passwordFormData || !confirmPasswordFormData || !emailFormData) {
		return 'Something Went Wrong Please Try Again';
	}

	const password = passwordFormData.toString();
	const confirmPassword = confirmPasswordFormData.toString();
	const email = emailFormData.toString();

	// return { result: 'result' };
};
