import { useContext, useEffect, useState } from 'react';
import DashboardElementModal from './DashboardElementModal.Component';
import styles from '@/components/admin/searchbar/DashboardSearchbar.module.scss';
import DashboardSearchBarButton from '../searchbar/DashboardSearchbarButton.Component';
import Container from '@/components/Container.Component';
import { ComponentStatus } from '@/types/Types';
import axios from 'axios';
import { API_URI } from '@/utils/Utils';
import { DecorationsContext } from '@/context/DecorationsContext';

export default function DashboardAddDecorationModal() {
	const { decorations: formDecorations, setDecorations: setFormDecorations } =
		useContext(DecorationsContext);
	const [searchValue, setSearchValue] = useState('');

	const [status, setStatus] = useState<ComponentStatus>('LOADING');
	const [decorations, setDecorations] = useState<any[]>();

	const [pageSize] = useState<number>(4);

	function addDecoration(data: any) {
		if (decorations) {
			setFormDecorations(formDecorations.concat([data]));
		}
	}

	useEffect(() => {
		async function fetchData() {
			try {
				setStatus('LOADING');

				const res = await axios
					.get(`${API_URI}/decorations/`, {
						params: {
							page: 1,
							pageSize,
							decorationId:
								searchValue.length > 0
									? searchValue
									: undefined,
							decorationName:
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
				const decorationsData = data.decorations as any[];

				setDecorations(decorationsData);

				setStatus('READY');
			} catch (error) {
				console.log(error);
				setStatus('ERROR');
			}
		}

		fetchData();
	}, [pageSize, searchValue]);

	return (
		<DashboardElementModal id='decorationModal' title='Añadir decoracion'>
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
					decorations &&
					(decorations.length > 0 ? (
						<>
							{decorations.map(decoration => {
								return (
									<button
										className='btn btn-secondary w-100 my-1'
										onClick={event => {
											event.preventDefault();

											addDecoration(decoration);
											setSearchValue('');
										}}
										key={decoration.id}
										data-bs-dismiss='modal'
									>
										{decoration.name}
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
