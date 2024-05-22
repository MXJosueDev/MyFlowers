import styles from './Auth.module.scss';

export default function AuthFormSubmitButton() {
	return (
		<button
			className={`btn rounded-circle text-light ${styles.submit}`}
			type='submit'
		>
			<i className='bi bi-arrow-right'></i>
		</button>
	);
}
