import styles from './Auth.module.scss';

export default function AuthFormIcon() {
	return (
		<div className={`d-flex justify-content-center ${styles.icon}`}>
			<i className='bi bi-person-circle'></i>
		</div>
	);
}
