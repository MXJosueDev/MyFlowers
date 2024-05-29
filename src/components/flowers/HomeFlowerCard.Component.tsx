import styles from './Flowers.module.scss';
import FlowerCardImage from './FlowerCardImage.Component';
import AddFavoriteButton from '../favorites/AddFavoriteButton.Component';

import { OpenSans } from '@/utils/Fonts';
import { FlowerCardProps } from '@/types/Props';

interface Props extends FlowerCardProps {}

export default function HomeFlowerCard({
	productId,
	img,
	price,
	discount,
}: Props) {
	return (
		<div
			className={`card border-2 rounded p-2 shadow ${styles.flowerCard}`}
		>
			<FlowerCardImage img={img} />

			<hr />

			<div className='card-body'>
				<div className='d-flex justify-content-between'>
					<p className={`mb-0 fs-3 ${OpenSans.className}`}>
						<span
							className={`${discount > 0 ? 'text-decoration-line-through opacity-75' : ''}`}
						>
							{`$${price}`}
						</span>

						{discount > 0 && (
							<span className='ms-1 text-decoration-none'>{`$${discount}`}</span>
						)}
					</p>

					<AddFavoriteButton productId={productId} />
				</div>
			</div>
		</div>
	);
}
