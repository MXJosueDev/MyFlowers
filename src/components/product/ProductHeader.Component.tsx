import { OpenSans } from '@/utils/Fonts';
import styles from './Product.module.scss';
import AddFavoriteButton from '../favorites/AddFavoriteButton.Component';

interface Props {
	productId: string;
	category: string;
	price: number;
}

export default function ProductHeader({ productId, category, price }: Props) {
	return (
		<div className='d-flex flex-column justify-content-between h-100'>
			<h2 className={`fs-3 ${styles.headerTitle}`}>{category}</h2>
			<div className='mt-4 mt-md-0'>
				<div className='d-flex justify-content-between'>
					<p
						className={`mb-0 fs-3 ${OpenSans.className}`}
					>{`$${price}`}</p>

					<AddFavoriteButton productId={productId} />
				</div>
				<hr className='mb-0' />
			</div>
		</div>
	);
}
