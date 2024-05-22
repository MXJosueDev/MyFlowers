import styles from './SearchBar.module.scss';

export default function SearchBarButton() {
	return (
		<button
			type='submit'
			className={`float-end p-0 ${styles.searchbarButton}`}
		>
			{/* <span> */}
			<i className={`bi bi-search px-2 ${styles.searchbarIcon}`}></i>
			{/* </span> */}
		</button>
	);
}
