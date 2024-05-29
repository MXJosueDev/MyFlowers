import React from 'react';
import styles from './Auth.module.scss';
import { FormControlProps } from '@/types/Props';

interface Props extends FormControlProps {}

export default function AuthFormControl({
	register,
	errors,
	name,
	label,
	type,
	placeholder,
	options,
}: Props) {
	return (
		<div className='mb-2'>
			<label className='form-label' htmlFor={name}>
				{label}
			</label>

			<input
				id={name}
				type={type}
				className={`form-control form-text focus-ring focus-ring-secondary border-2 ${styles.formControl} ${errors[name] && 'is-invalid'}`}
				placeholder={placeholder}
				{...register(name, options)}
			/>

			{errors[name] && (
				<div className='invalid-feedback'>
					{errors[name]?.message?.toString()}
				</div>
			)}
		</div>
	);
}
