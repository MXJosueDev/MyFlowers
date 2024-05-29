'use client';

import { ComponentStatus, SetState } from '@/types/Types';
import { BREAKPOINTS } from '@/components/flowers/FlowersContainer.Component';
import Container from '@/components/Container.Component';
import Row from '@/components/Row.Component';
import ContainerPagination from '@/components/flowers/ContainerPagination.Component';
import ProductCard from './ProductCard.Component';
import ElementCard from './ElementCard.Component';
import SomeRedirector from './SomeRedirector.Component';

const CARD_STYLE = {
	PRODUCT: ProductCard,
	ELEMENT: ElementCard,
};

interface Props {
	breakpoints: keyof typeof BREAKPOINTS;
	cardStyle: keyof typeof CARD_STYLE;
	status: ComponentStatus;
	nextPage: boolean;
	page: number;
	setPage: SetState<number>;
	some: any[] | undefined;
	baseUrl: string;
}

export default function BaseContainer({
	breakpoints,
	cardStyle,
	status,
	nextPage,
	page,
	setPage,
	some,
	baseUrl,
}: Props) {
	const FlowerCard = CARD_STYLE[cardStyle];

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
				some &&
				(some.length > 0 ? (
					<>
						<Row
							className={`g-3 jusfify-content-center ${BREAKPOINTS[breakpoints]}`}
						>
							{some.map(isome => {
								const stringId = String(isome.id);

								return (
									<div key={stringId} className='col'>
										<SomeRedirector
											url={`${baseUrl}/${stringId}`}
										>
											<FlowerCard
												category={isome.categoryName}
												productId={stringId}
												img={isome.imageUrl}
												imageUrl={isome.imageUrl}
												name={isome.name}
												price={isome.price}
											/>
										</SomeRedirector>
									</div>
								);
							})}
						</Row>
						<ContainerPagination
							page={page}
							setPage={setPage}
							nextPage={nextPage}
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
