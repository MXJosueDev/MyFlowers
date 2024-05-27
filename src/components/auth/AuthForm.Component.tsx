'use client';

import styles from './Auth.module.scss';
import AuthFormIcon from './AuthFormIcon.Component';
import AuthFormSubmitButton from './AuthFormSubmitButton.Component';
import { RequiredChildrenProp } from '@/types/Props';
import { FormEventHandler } from 'react';

interface Props extends RequiredChildrenProp {
	title: string;
	onSubmit: FormEventHandler<HTMLFormElement>;
}

export default function AuthForm({ onSubmit, title, children }: Props) {
	return (
		<form
			className={`bg-secondary p-3 rounded-5 border border-2 shadow bg-opacity-75 ${styles.form}`}
			onSubmit={onSubmit}
		>
			<h2 className='text-center'>{title}</h2>
			<AuthFormIcon />

			{children}

			<div className='d-flex justify-content-end mt-3'>
				<AuthFormSubmitButton />
			</div>
		</form>
	);
}
