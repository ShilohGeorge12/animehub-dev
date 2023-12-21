import { EMAIL_REGEX, ErrorMessage, PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX, UserType } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface validateUpdateProfileProps {
	details: Pick<UserType, 'username' | 'email' | 'gender' | 'password'> & { image: File | string };
	user: UserType;
	setError: Dispatch<SetStateAction<ErrorMessage>>;
}

export function validateUpdateProfile({ details, user, setError }: validateUpdateProfileProps) {
	let result: 'error' | 'ok' = 'ok';

	if (details.username !== user.username && !USERNAME_REGEX.test(details.username)) {
		result = 'error';
		setError((prev) => [...prev, { path: 'username', message: 'Username must contain letters ( 3 or more characters ), @, _, or -.' }]);
	}

	if (details.email != user.email && !EMAIL_REGEX.test(details.email)) {
		result = 'error';
		setError((prev) => [...prev, { path: 'email', message: 'Please Provide a Valid Email Address' }]);
	}

	if (details.password != '' && !PASSWORD_REGEX.test(details.password)) {
		result = 'error';
		setError((prev) => [...prev, { path: 'password', message: PASSWORD_FORMAT_MESSAGE }]);
	}

	return result;
}
