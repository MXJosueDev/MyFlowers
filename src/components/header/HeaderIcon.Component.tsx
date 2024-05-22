import styles from './Header.module.scss';

interface Props {
	icon: string;
}

export default function HeaderIcon({ icon }: Props) {
	return (
		<div
			className={styles.headerIcon}
			style={{ backgroundImage: `url('${icon}')` }}
		></div>
	);
}
