'use server';

import { redirect } from 'next/navigation';

export const onForgetPassword = async (data: FormData) => {
	console.log(data.get('email'));

	redirect('/forget-password/reset-password');
};

export const onResetPassword = async (data: FormData) => {
	console.log({
		password: data.get('password'),
		confirmPassword: data.get('confirm-password'),
	});

	// return { result: 'result' };
};
