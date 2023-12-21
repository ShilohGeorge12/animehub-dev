import { EMAIL_REGEX, PASSWORD_FORMAT_MESSAGE, PASSWORD_REGEX, USERNAME_REGEX } from '@/types';
import { Dispatch, SetStateAction } from 'react';

interface verifyCredencialsProps {
	details: {
		username: string;
		email: string;
		password: string;
	};
	hasError: boolean;
	setErrorMessage: Dispatch<SetStateAction<string[]>>;
}

export function verifyBasicCredencials({ hasError, setErrorMessage, details }: verifyCredencialsProps) {
	const { email, password, username } = details;

	if (!USERNAME_REGEX.test(username)) {
		setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
		hasError = true;
	}

	if (!EMAIL_REGEX.test(email)) {
		setErrorMessage((prev) => [...prev, `Invalid email address (${email}). Please enter a valid email.`]);
		hasError = true;
	}

	if (!PASSWORD_REGEX.test(password)) {
		setErrorMessage((prev) => [...prev, PASSWORD_FORMAT_MESSAGE]);
		hasError = true;
	}
}
