import React from 'react';
import styles from '@/components/auth/Auth.module.scss';
import { FormControlProps } from '@/types/Props';

interface Props extends FormControlProps {}

export default function SomeFormControl({
	register,
	errors,
	name,
	label,
	type,
	placeholder,
	options,
	formText,
	inputText,
}: Props) {
	if (errors[name]) console.log(errors[name]?.message?.toString());

	return (
		<div className='mb-2'>
			<label className='form-label' htmlFor={name}>
				{label}
			</label>

			<div className={`input-group border-2 ${styles.formControl}`}>
				{inputText && (
					<span className='input-group-text'>{inputText}</span>
				)}
				<input
					id={name}
					type={type}
					className={`form-control form-text focus-ring focus-ring-secondary m-0 ${errors[name] && 'is-invalid'}`}
					placeholder={placeholder}
					{...register(name, options)}
				/>
			</div>

			{!errors[name] && formText && (
				<div className='form-text'>{formText}</div>
			)}

			{errors[name] && (
				<>
					<div
						className='invalid-feedback'
						style={{ display: 'inline-block' }}
					>
						{errors[name]?.message?.toString()}
					</div>
				</>
			)}
		</div>
	);
}
