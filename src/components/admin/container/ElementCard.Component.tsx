import { IProductElement } from '@/types/Props';
import Image from 'next/image';
import styles from '@/components/product/Product.module.scss';

interface Props extends IProductElement {}

export default function ElementCard({ imageUrl, name: elementName }: Props) {
	return (
		<div
			className={`card border-2 p-2 pe-none mx-auto ${styles.productCard}`}
		>
			<Image
				className='card-img-top'
				src={imageUrl}
				alt={elementName}
				width={125}
				height={125}
			></Image>
			<div className='card-body p-1 text-center'>
				<p className='card-title'>{elementName}</p>
			</div>
		</div>
	);
}
