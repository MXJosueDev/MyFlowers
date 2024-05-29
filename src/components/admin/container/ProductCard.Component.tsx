import Row from '@/components/Row.Component';
import styles from '@/components/flowers/Flowers.module.scss';
import { FlowerCardProps } from '@/types/Props';

import { OpenSans } from '@/utils/Fonts';
import FlowerCardImage from '@/components/flowers/FlowerCardImage.Component';

export default function ProductCard({ category, img, price }: FlowerCardProps) {
	return (
		<div
			className={`card border-2 p-2 rounded shadow ${styles.flowerCard}`}
		>
			<Row className='g-0'>
				<div className='col-5 col-sm-4'>
					<FlowerCardImage img={img} />
				</div>
				<div className='col-7 col-sm-8'>
					<div className={`d-flex h-100 ${styles.vLine}`}>
						<div className='card-body'>
							<div className='d-flex flex-column justify-content-between h-100'>
								<h5 className='card-title'>{category}</h5>

								<div className='d-flex justify-content-between align-items-center'>
									<p
										className={`mb-0 fs-3 ${OpenSans.className}`}
									>
										{`$${price}`}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Row>
		</div>
	);
}
