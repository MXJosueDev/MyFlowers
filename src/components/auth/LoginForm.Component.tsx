'use client';

import { FieldValues, useForm } from 'react-hook-form';
import AuthFormControl from './AuthFormControl.Component';
import AuthForm from './AuthForm.Component';

interface Inputs extends FieldValues {
	email: string;
	password: string;
}

export default function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();

	return (
		<AuthForm
			onSubmit={handleSubmit(data => {
				console.log(data);
			})}
		>
			<AuthFormControl
				register={register}
				errors={errors}
				name='email'
				label='Email'
				placeholder='usuario@email.com'
				type='email'
				options={{
					required: {
						value: true,
						message: 'Por favor ingresa tu email',
					},
				}}
			/>

			<AuthFormControl
				register={register}
				errors={errors}
				name='password'
				label='Contraseña'
				placeholder='••••••'
				type='password'
				options={{
					required: {
						value: true,
						message: 'Por favor ingresa tu contraseña',
					},
					minLength: {
						value: 6,
						message: 'La contraseña debe contener minimo 6 digitos',
					},
				}}
			/>
		</AuthForm>
	);
}
