'use client';

import { useForm } from 'react-hook-form';
import AuthFormControl from './AuthFormControl.Component';
import AuthForm from './AuthForm.Component';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import styles from './Auth.module.scss';
import axios, { AxiosError } from 'axios';
import { API_URI } from '@/utils/Utils';
import { useRouter } from 'next/navigation';

const schema = z.object({
	username: z
		.string({ message: 'Por favor ingresa el nombre de usuario' })
		.regex(
			/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			'Ingresa un nombre de usuario válido',
		),
	email: z
		.string({ message: 'Por favor ingresa el email' })
		.email('Ingresa un email válido'),
	password: z
		.string({ message: 'Por favor ingresa la contraseña' })
		.min(6, 'La contraseña debe contener minimo 6 digitos'),
	role: z.string({ message: 'Por favor ingresa el rol' }),
});

type Schema = z.infer<typeof schema>;

export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		shouldUseNativeValidation: false,
	});

	const router = useRouter();

	const [authError, setAuthError] = useState<string>();

	const onSubmit = handleSubmit(async data => {
		try {
			const res = await axios.post(`${API_URI}/auth/register`, {
				...data,
			});

			if (res.status === 200) {
				alert('!El usuario se registró con exito!');

				router.push('/dashboard');
			}
		} catch (error) {
			if (error instanceof AxiosError) {
				setAuthError(error.response?.statusText);

				setTimeout(() => setAuthError(undefined), 4 * 1000); // NECESARY?
			}
		}
	});

	return (
		<AuthForm onSubmit={onSubmit} title='Registrar'>
			<AuthFormControl
				register={register}
				errors={errors}
				name='username'
				label='Username'
				placeholder='usuario_123'
				type='text'
			/>

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

			<label className='form-label' htmlFor='rol'>
				Rol
			</label>
			<select
				{...register('role')}
				className={`form-select focus-ring focus-ring-secondary border-2 ${styles.formControl} ${errors.role && 'is-invalid'}`}
				aria-label='Rol'
				defaultValue='ADMIN'
				name='rol'
				id='rol'
			>
				<option value='ADMIN'>ADMIN</option>
				<option value='ROOT'>ROOT</option>
			</select>
			{errors.role && (
				<div className='invalid-feedback'>
					{errors.role?.message?.toString()}
				</div>
			)}

			{authError && (
				<div className='w-100 text-bg-danger text-center py-1 rounded bg-opacity-100 mt-2'>
					{authError}
				</div>
			)}
		</AuthForm>
	);
}
