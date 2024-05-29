'use client';

import { useForm } from 'react-hook-form';
import AuthFormControl from './AuthFormControl.Component';
import AuthForm from './AuthForm.Component';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getSession, signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const schema = z.object({
	email: z
		.string({ message: 'Por favor ingresa tu email' })
		.email('Ingresa un email válido'),
	password: z
		.string({ message: 'Por favor ingresa tu contraseña' })
		.min(6, 'La contraseña debe contener minimo 6 digitos'),
});

type Schema = z.infer<typeof schema>;

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		shouldUseNativeValidation: false,
	});

	const router = useRouter();

	getSession()
		.then(session => {
			if (session !== null) {
				router.push('/dashboard');
			}
		})
		.catch();

	const [authError, setAuthError] = useState<string>();

	const onSubmit = handleSubmit(async data => {
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		});

		if (!res) {
			return; // How???
		}

		if (!res.ok) {
			setAuthError(res?.error ?? 'Ocurrio un error.');

			setTimeout(() => setAuthError(undefined), 4 * 1000); // NECESARY?
			return;
		}

		router.push('/dashboard');
	});

	return (
		<AuthForm onSubmit={onSubmit} title='Log-in'>
			<AuthFormControl
				register={register}
				errors={errors}
				name='email'
				label='Email'
				placeholder='usuario@email.com'
				type='email'
			/>

			<AuthFormControl
				register={register}
				errors={errors}
				name='password'
				label='Contraseña'
				placeholder='••••••'
				type='password'
			/>

			{authError && (
				<div className='w-100 text-bg-danger text-center py-1 rounded bg-opacity-100 mt-2'>
					{authError}
				</div>
			)}
		</AuthForm>
	);
}
