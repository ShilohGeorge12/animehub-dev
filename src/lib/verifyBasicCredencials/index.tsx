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

	const usernameRegex = /^[a-zA-Z\s_-]{2,}$/;
	const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,5}$/;
	const passwordRegex = /^[a-zA-Z@_-]{6,24}$/;

	if (!usernameRegex.test(username)) {
		setErrorMessage((prev) => [...prev, `Username (${username}) must be at least 2 characters long and can only contain letters, @, _, or -.`]);
		hasError = true;
	}

	if (!emailRegex.test(email)) {
		setErrorMessage((prev) => [...prev, `Invalid email address (${email}). Please enter a valid email.`]);
		hasError = true;
	}

	if (!passwordRegex.test(password)) {
		setErrorMessage((prev) => [...prev, `Password must be 6-24 characters long and can only contain letters, @, _, or -.`]);
		hasError = true;
	}
}
