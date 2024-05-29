import { useContext, useEffect, useState } from 'react';
import DashboardElementModal from './DashboardElementModal.Component';
import styles from '@/components/admin/searchbar/DashboardSearchbar.module.scss';
import DashboardSearchBarButton from '../searchbar/DashboardSearchbarButton.Component';
import Container from '@/components/Container.Component';
import { ComponentStatus } from '@/types/Types';
import axios from 'axios';
import { API_URI } from '@/utils/Utils';
import { FlowersContext } from '@/context/FlowersContext';

export default function DashboardAddFlowerModal() {
	const { flowers: formFlowers, setFlowers: setFormFlowers } =
		useContext(FlowersContext);
	const [searchValue, setSearchValue] = useState('');

	const [status, setStatus] = useState<ComponentStatus>('LOADING');
	const [flowers, setFlowers] = useState<any[]>();

	const [pageSize] = useState<number>(4);

	function addFlower(data: any) {
		if (flowers) {
			setFormFlowers(formFlowers.concat([data]));
		}
	}

	useEffect(() => {
		async function fetchData() {
			try {
				setStatus('LOADING');

				const res = await axios
					.get(`${API_URI}/flowers/`, {
						params: {
							page: 1,
							pageSize,
							flowerId:
								searchValue.length > 0
									? searchValue
									: undefined,
							flowerName:
								searchValue.length > 0
									? searchValue
									: undefined,
						},
					})
					.catch();

				if (res.status !== 200) {
					setStatus('ERROR');
					return;
				}

				const data = res.data;
				const flowersData = data.flowers as any[];

				setFlowers(flowersData);

				setStatus('READY');
			} catch (error) {
				console.log(error);
				setStatus('ERROR');
			}
		}

		fetchData();
	}, [pageSize, searchValue]);

	return (
		<DashboardElementModal id='flowerModal' title='Añadir flor'>
			<form
				onSubmit={event => event.preventDefault()}
				className={`d-flex w-auto p-2 ${styles.searchbarInput}`}
			>
				<input
					className={`w-100 b-0 ps-2 ${styles.searchbarInput}`}
					value={searchValue}
					onChange={e => setSearchValue(e.target.value)}
					type='text'
					placeholder='Buscar'
				></input>

				<DashboardSearchBarButton />
			</form>

			<Container className='my-2'>
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
							{flowers.map(flower => {
								return (
									<button
										className='btn btn-secondary w-100 my-1'
										onClick={event => {
											event.preventDefault();

											addFlower(flower);
											setSearchValue('');
										}}
										key={flower.id}
										data-bs-dismiss='modal'
									>
										{flower.name}
									</button>
								);
							})}
						</>
					) : (
						<div className='mx-auto text-center'>
							<h5 className='fs-3'>
								No se encontro ningun elemento con esas
								caracteristicas.
							</h5>
							<p className='fs-5'>
								Revisa que los parametros sean correctos
							</p>
						</div>
					))}
			</Container>
		</DashboardElementModal>
	);
}
