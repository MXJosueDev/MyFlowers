'use client';

import { IDashboardProductElement } from '@/types/Props';
import Image from 'next/image';
import styles from '@/components/product/Product.module.scss';
import { SetState } from '@/types/Types';
import { MouseEvent } from 'react';

interface Props extends IDashboardProductElement {
	productElements: IDashboardProductElement[];
	setProductElements: SetState<IDashboardProductElement[]>;
}

export default function DashboardProductElementCard({
	imageUrl,
	name: elementName,
	id,
	setProductElements,
	productElements,
}: Props) {
	function handleRemove(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		console.log(
			'FILTER',
			productElements.filter(value => value.id !== id),
		);
		setProductElements(productElements.filter(value => value.id !== id));
	}
	return (
		<div className={`card border-2 p-2 ${styles.productCard}`}>
			<div className='d-flex justify-content-end'>
				<button
					onClick={handleRemove}
					className='p-0 btn-close end-0'
				/>
			</div>
			<Image
				className='card-img-top pe-none'
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
