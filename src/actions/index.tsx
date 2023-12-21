'use server';

import { MongoDB } from '@/db';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

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

	if (!passwordFormData || !confirmPasswordFormData || !emailFormData) {
		return 'Something Went Wrong Please Try Again';
	}

	const password = passwordFormData.toString();
	// const confirmPassword = confirmPasswordFormData.toString();
	const email = emailFormData.toString();

	const user = await MongoDB.getUserModel().findOne({ email });

	if (!user) {
		return `User with Email (${email}) Was Not Found!`;
	}

	const result = await bcrypt.compare(password, user.password);
	if (!result) {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);
		user.password = hashedPassword;
		await user.save();
		redirect('/login');
	}
	// redirect('/login');
};
