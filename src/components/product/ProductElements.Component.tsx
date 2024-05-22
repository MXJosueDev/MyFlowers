import { IProductElement } from '@/types/Props';
import ProductElementCard from './ProductElementCard';
import styles from './Product.module.scss';

interface Props {
	elementTitle: string;
	productElements: IProductElement[];
}

export default function ProductElements({
	productElements,
	elementTitle,
}: Props) {
	return (
		<div className='mb-5'>
			<h5 className='fs-2 d-3'>{elementTitle}</h5>
			<div className={`mt-3 d-flex overflow-x-scroll gap-2 ${styles.productElements}`}>
				{productElements.flatMap(({ imageUrl, elementName }) => {
					return (
						<div className='flex-shrink-0' key={elementName}>
							<ProductElementCard
								imageUrl={imageUrl}
								elementName={elementName}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
