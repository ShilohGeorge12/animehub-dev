import { ErrorMessage, UserType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface validateUpdateProfileProps {
	details: Pick<UserType, 'username' | 'email' | 'gender' | 'password'> & { image: File | string };
	user: UserType;
	setError: Dispatch<SetStateAction<ErrorMessage>>;
}

export function validateUpdateProfile({ details, user, setError }: validateUpdateProfileProps) {
	let result: 'error' | 'ok' = 'ok';
	const usernameRegex = /^[a-zA-Z\s_-]{2,}$/;
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
	const passwordRegex = /^[a-zA-Z0-9@_-]{6,24}$/;

	if (details.username !== user.username && !usernameRegex.test(details.username)) {
		result = 'error';
		setError((prev) => [...prev, { path: 'username', message: 'Username must contain letters ( 3 or more characters ), @, _, or -.' }]);
	}

	if (details.email != user.email && !emailRegex.test(details.email)) {
		result = 'error';
		setError((prev) => [...prev, { path: 'email', message: 'Please Provide a Valid Email Address' }]);
	}

	if (details.password != '' && !passwordRegex.test(details.password)) {
		result = 'error';
		setError((prev) => [...prev, { path: 'password', message: 'Password must be 6-24 characters long and can only contain letters, numbers, @, _, or -.' }]);
	}

	return result;
}
