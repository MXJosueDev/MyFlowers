import styles from './Product.module.scss';

interface Props {
	category: string;
}

export default function MobileTitle({ category }: Props) {
	return (
		<h2 className={`fs-3 text-center mb-3 ${styles.mobileTitle}`}>
			{category}
		</h2>
	);
}
