import LoginClient from '@/components/loginClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default function Login() {
	return <LoginClient />;
}
