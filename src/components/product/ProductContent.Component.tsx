'use client';

import React, { useEffect, useState } from 'react';
import ContactButton from './ContactButton.Component';
import ProductElements from './ProductElements.Component';
import Container from '../Container.Component';
import BackHeader from '../header/BackHeader.Component';
import MobileTitle from './MobileTitle.Component';
import Row from '../Row.Component';
import ProductImage from './ProductImage.Component';
import ProductHeader from './ProductHeader.Component';
import { ComponentStatus } from '@/types/Types';
import axios from 'axios';
import { API_URI } from '@/utils/Utils';
import Footer from '../footer/Footer.Component';

interface Props {
	productId: string;
}

export default function ProductContent({ productId }: Props) {
	const [status, setStatus] = useState<ComponentStatus>('LOADING');
	const [flower, setFlower] = useState<any>();

	useEffect(() => {
		async function fetchFlowers() {
			const res = await axios.get(`${API_URI}/product/`, {
				params: { productId },
			});
			console.log(res);

			if (res.status !== 200) {
				setStatus('ERROR');
				return;
			}

			const data = res.data;

			if (data.product === null) {
				setStatus('ERROR');
				return;
			}

			setFlower(data.product);
			setStatus('READY');
		}

		fetchFlowers();
	}, [productId]);

	return (
		<>
			<BackHeader />
			<div id='content' className={`mt-5 mb-3`}>
				<Container>
					{status === 'LOADING' && (
						<div className='w-100 d-flex justify-content-center'>
							<div
								className='spinner-border border-3 mx-auto'
								role='status'
							>
								<span className='visually-hidden'>
									Loading...
								</span>
							</div>
						</div>
					)}
					{status === 'ERROR' && (
						<div className='mx-auto text-center'>
							<h5 className='fs-3'>
								Ocurrio un error al consultar la API.
							</h5>
							<p className='fs-5'>
								Probablemente el producto ya no existe.
							</p>
						</div>
					)}
					{status === 'READY' && flower && (
						<>
							<MobileTitle category={flower.categoryName} />
							<Row className='justify-content-center mb-5'>
								<div className='col-10 col-md-6 border border-3 py-3'>
									<div className='d-flex justify-content-center'>
										<ProductImage
											imageUrl={flower.imageUrl}
										/>
									</div>
								</div>
								<div className='col-10 col-md-6'>
									<ProductHeader
										productId={productId}
										category={flower.categoryName}
										price={flower.price}
									/>
								</div>
							</Row>
							<ProductElements
								elementTitle='Flores utilizadas'
								productElements={flower.flowers}
							/>
							<ProductElements
								elementTitle='Decoraciones'
								productElements={flower.decorations}
							/>
						</>
					)}

					{status === 'READY' && (
						<ContactButton productId={productId} />
					)}
				</Container>
			</div>
			<Footer />
		</>
	);
}
