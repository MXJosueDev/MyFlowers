'use client';

import SomeFormControl from '@/components/admin/form/SomeFormControl.Component';
import Footer from '@/components/footer/Footer.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import { ComponentStatus } from '@/types/Types';
import { API_URI, isValidImageURL } from '@/utils/Utils';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Container from '@/components/Container.Component';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Row from '@/components/Row.Component';
import ProductImage from '@/components/product/ProductImage.Component';
import Link from 'next/link';

interface SearchParams {
	flowerId?: string[];
}

interface Props {
	params: SearchParams;
}

const schema = z.object({
	iname: z.string({ message: 'Ingresa el nombre' }),
	imageUrl: z
		.string({ message: 'Ingresa la URL de la imagen' })
		.url('La URL no es válida'),
});

type Schema = z.infer<typeof schema>;

export default function ProductPage({ params }: Props) {
	const router = useRouter();

	const [error, setError] = useState<string | undefined>();
	const [status, setStatus] = useState<ComponentStatus>('LOADING');

	// FETCHING
	const id = params.flowerId && params.flowerId[0];
	let props;
	if (id) {
		props = {
			resolver: zodResolver(schema),
			shouldUseNativeValidation: false,
			defaultValues: async () => {
				const res = await axios
					.get(`${API_URI}/flower/`, {
						params: { flowerId: Number(id) },
					})
					.catch(error => {
						if (error instanceof AxiosError) {
							setError(error.response?.statusText);

							setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
						}
					});

				if (res?.data.flower === null) {
					setStatus('ERROR');
					return;
				}

				setStatus('READY');

				const flower = res?.data.flower;

				return {
					...flower,
					iname: flower.name,
				};
			},
		};
	} else {
		props = {
			resolver: zodResolver(schema),
			shouldUseNativeValidation: false,
		};
	}
	useEffect(() => {
		if (!id) {
			setStatus('READY');
		}
	}, [id]);

	// FORM
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<Schema>(props);

	const watchingImageUrl = watch('imageUrl');
	const [imageUrl, setImageUrl] = useState<string>('/image/camera.png');

	// UPDATE PREVIEW IMG
	useEffect(() => {
		(async () => {
			setImageUrl(
				(await isValidImageURL(watchingImageUrl))
					? watchingImageUrl
					: '/image/camera.png',
			);
		})();
	}, [watchingImageUrl]);

	async function iDelete() {
		if (id) {
			const response = await axios
				.request({
					method: 'DELETE',
					data: {
						flowerId: Number(id),
					},
					url: `${API_URI}/flower`,
				})
				.catch(error => {
					if (error instanceof AxiosError) {
						setError(error.response?.statusText);

						setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
					}
				});

			if (!response) return;
			if (response.status === 200) {
				router.push('/dashboard/flowers');
			}
		}
	}

	const onSubmit = handleSubmit(
		async data => {
			const sendData = {
				name: data.iname,
				imageUrl: data.imageUrl,
			};

			if (id) {
				const res = await axios
					.request({
						method: 'PATCH',
						data: {
							flowerId: Number(id),
							...sendData,
						},
						url: `${API_URI}/flower`,
					})
					.catch(error => {
						if (error instanceof AxiosError) {
							setError(error.response?.statusText);

							setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
						}
					});

				if (!res) return;
				if (res.status === 200) {
					alert('Los datos se actualizaron correctamente.');
				}

				console.log(res.data);
			} else {
				const res = await axios
					.request({
						method: 'POST',
						data: {
							...sendData,
						},
						url: `${API_URI}/flower`,
					})
					.catch(error => {
						if (error instanceof AxiosError) {
							setError(error.response?.statusText);

							setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
						}
					});

				if (!res) return;
				if (res.status === 200) {
					router.replace(`/dashboard/flower/${res.data.flower.id}`);
				}
			}
			console.log(data);
		},
		error => {
			console.log(error);
		},
	);

	return (
		<div id='wrapper'>
			<BackHeader title='Flor' />
			<Container className='py-3'>
				{status === 'LOADING' && (
					<div className='w-100 d-flex justify-content-center'>
						<div
							className='spinner-border border-3 mx-auto'
							role='status'
						>
							<span className='visually-hidden'>Loading...</span>
						</div>
					</div>
				)}
				{status === 'READY' && (
					<>
						{id && (
							<div className='container text-center mb-3'>
								<h1 className='fs-3'>ID: {id}</h1>
							</div>
						)}

						<form onSubmit={onSubmit}>
							<Row className='justify-content-center mb-5'>
								<div className='col-10 col-md-6 border border-3 py-3'>
									<div className='d-flex justify-content-center'>
										<ProductImage imageUrl={imageUrl} />
									</div>
								</div>
								<div className='col-10 col-md-6 mt-3 mt-md-0'>
									<SomeFormControl
										label='URL de imagen'
										errors={errors}
										register={register}
										name='imageUrl'
										placeholder=''
										type='text'
										formText={
											<span>
												Coloca el link valido de una
												imagen, te recomendamos subir
												tus imagenes a{' '}
												<Link
													href={'https://imgbb.com'}
												>
													ImgBB
												</Link>
											</span>
										}
									/>

									<SomeFormControl
										label='Nombre'
										errors={errors}
										register={register}
										name='iname'
										placeholder=''
										type='text'
									/>
								</div>
							</Row>

							{error && (
								<div className='w-100 text-bg-danger text-center py-1 rounded bg-opacity-100 mt-2'>
									{error}
								</div>
							)}

							<div className='mt-3 d-flex justify-content-end'>
								{id && (
									<button
										type='button'
										onClick={iDelete}
										className='btn btn-danger rounded p-3 me-2'
									>
										<i className='bi bi-trash-fill'></i>
									</button>
								)}

								<button
									className='btn btn-secondary rounded p-3'
									type='submit'
								>
									<i className='bi bi-save'></i>
								</button>
							</div>
						</form>
					</>
				)}
				{status === 'ERROR' && (
					<div className='mx-auto text-center'>
						<h5 className='fs-3'>
							Ocurrio un error al consultar la API.
						</h5>
						<p className='fs-5'>Probablemente la flor no existe.</p>
					</div>
				)}
			</Container>
			<Footer />
		</div>
	);
}
