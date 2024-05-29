import { IDashboardProductElement } from '@/types/Props';
import DashboardProductElementCard from './DashboardProductElementCard.Component';
import styles from '@/components/product/Product.module.scss';
import { SetState } from '@/types/Types';
import AddButton from './AddButton.Component';

interface Props {
	elementTitle: string;
	setProductElements: SetState<IDashboardProductElement[]>;
	productElements: IDashboardProductElement[];
	bsTarget?: string;
}

export default function DashboardProductElements({
	productElements,
	setProductElements,
	elementTitle,
	bsTarget,
}: Props) {
	const rendered: string[] = [];

	return (
		<div className='mb-5'>
			<h5 className='fs-2 d-3'>{elementTitle}</h5>
			<div
				className={`mt-3 d-flex overflow-x-scroll gap-2 ${styles.productElements}`}
			>
				{productElements.map(({ imageUrl, name: elementName, id }) => {
					if (rendered.includes(id)) return false; // Avoid multiple-rendering
					rendered.push(id);

					return (
						<div className='flex-shrink-0' key={elementName}>
							<DashboardProductElementCard
								id={id}
								imageUrl={imageUrl}
								name={elementName}
								setProductElements={setProductElements}
								productElements={productElements}
							/>
						</div>
					);
				})}

				<div className='flex-shrink-0'>
					<div className={`card p-2 border-0 ${styles.productCard}`}>
						<div className='d-flex justify-content-center align-items-center h-100'>
							<AddButton bsTarget={bsTarget} />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
