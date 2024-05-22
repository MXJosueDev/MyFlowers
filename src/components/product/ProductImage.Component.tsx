import Image from 'next/image';
import styles from './Product.module.scss';

interface Props {
	imageUrl: string;
}

export default function ProductImage({ imageUrl }: Props) {
	return (
		<Image
			className={styles.image}
			src={imageUrl}
			alt='Flor'
			width={250}
			height={250}
			priority
		></Image>
	);
}
