import styles from './DashboardSearchbar.module.scss';

export default function DashboardSearchBarButton() {
	return (
		<button
			type='submit'
			className={`float-end p-0 ${styles.searchbarButton}`}
		>
			<i className={`bi bi-search px-2 ${styles.searchbarIcon}`}></i>
		</button>
	);
}
