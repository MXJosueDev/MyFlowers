'use client';

import Container from '../Container.Component';
import Row from '../Row.Component';
import FlowerRedirector from './FlowerRedirector.Component';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URI } from '@/utils/Utils';
import HomeFlowerCard from './HomeFlowerCard.Component';
import FavoritesFlowerCard from './FavoritesFlowerCard.Component';
import { ComponentStatus } from '@/types/Types';
import ContainerPagination from './ContainerPagination.Component';

export const BREAKPOINTS = {
	HOME: 'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4',
	FAVORITES: 'row-cols-1 row-cols-lg-2',
};

const CARD_STYLE = {
	HOME: HomeFlowerCard,
	FAVORITES: FavoritesFlowerCard,
};

interface Props {
	fetchParams: { [key: string]: string };
	breakpoints: keyof typeof BREAKPOINTS;
	cardStyle: keyof typeof CARD_STYLE;
}

export default function FlowersContainer({
	fetchParams,
	breakpoints,
	cardStyle,
}: Props) {
	const FlowerCard = CARD_STYLE[cardStyle];

	const [status, setStatus] = useState<ComponentStatus>('LOADING');
	const [flowers, setFlowers] = useState<any[]>();

	const [results, setResults] = useState<number>(0);
	const [page, setPage] = useState<number>(1);
	const [pageSize] = useState<number>(16);

	useEffect(() => {
		async function fetchFlowers() {
			try {
				const res = await axios
					.get(`${API_URI}/products/`, {
						params: { page, pageSize, ...fetchParams },
					})
					.catch();
				console.log(res);

				if (res.status !== 200) {
					setStatus('ERROR');
					return;
				}

				const data = res.data;
				setResults(data.results);
				const productsData = data.products as any[];

				setFlowers(productsData);

				setStatus('READY');
			} catch (error) {
				console.log(error);
				setStatus('ERROR');
			}
		}

		fetchFlowers();
	}, [fetchParams, page, pageSize]);

	return (
		<Container id='results' className='my-5'>
			{status === 'LOADING' && (
				<div className='d-flex justify-content-center'>
					<div
						className='spinner-border border-3 mx-auto'
						role='status'
					>
						<span className='visually-hidden'>Loading...</span>
					</div>
				</div>
			)}
			{status === 'ERROR' && (
				<div className='mx-auto text-center'>
					<h5 className='fs-3'>
						Ocurrio un error al consultar la API.
					</h5>
					<p className='fs-5'>
						Revisa que los parametros sean correctos
					</p>
				</div>
			)}
			{status === 'READY' &&
				flowers &&
				(flowers.length > 0 ? (
					<>
						<Row className={`g-3 ${BREAKPOINTS[breakpoints]}`}>
							{flowers.map(flower => {
								const stringId = String(flower.id);

								return (
									<div key={stringId} className='col'>
										<FlowerRedirector productId={stringId}>
											<FlowerCard
												category={flower.categoryName}
												productId={stringId}
												img={flower.imageUrl}
												price={flower.price}
											/>
										</FlowerRedirector>
									</div>
								);
							})}
						</Row>
						<ContainerPagination
							results={results}
							page={page}
							setPage={setPage}
							pageSize={pageSize}
						/>
					</>
				) : (
					<div className='mx-auto text-center'>
						<h5 className='fs-3'>
							No se encontro ningun producto con esas
							caracteristicas.
						</h5>
						<p className='fs-5'>
							Revisa que los parametros sean correctos
						</p>
					</div>
				))}
		</Container>
	);
}
