import Image from 'next/image';
import styles from './HomeTop.module.scss';

export default function HomeTopImage() {
	return (
		<div className={styles.img}>
			<Image
				width={1920}
				height={1080}
				src='/image/homeTop.png'
				alt='Home Top'
				className='opacity-0'
			></Image>
		</div>
	);
}
