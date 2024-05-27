import RegisterForm from '@/components/auth/RegisterForm.Component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Register',
};

export default function Login() {
	return <RegisterForm />;
}
