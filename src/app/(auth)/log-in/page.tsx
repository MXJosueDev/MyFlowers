import LoginForm from '@/components/auth/LoginForm.Component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Login',
};

export default function Login() {
	return <LoginForm />;
}
