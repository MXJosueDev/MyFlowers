'use client';

import SomeFormControl from '@/components/admin/form/SomeFormControl.Component';
import Footer from '@/components/footer/Footer.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import { ComponentStatus } from '@/types/Types';
import { API_URI, isValidImageURL } from '@/utils/Utils';
import styles from '@/components/auth/Auth.module.scss';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Container from '@/components/Container.Component';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import Row from '@/components/Row.Component';
import ProductImage from '@/components/product/ProductImage.Component';
import DashboardProductElements from '@/components/admin/product/DashboardProductElements.Component';
import { IDashboardProductElement } from '@/types/Props';
import Link from 'next/link';
import DashboardAddFlowerModal from '@/components/admin/product/DashboardAddFlowerModal.Component';
import { FlowersContext } from '@/context/FlowersContext';
import { DecorationsContext } from '@/context/DecorationsContext';
import DashboardAddDecorationModal from '@/components/admin/product/DashboardAddDecorationModal.Component';

interface SearchParams {
	productId?: string[];
}

interface Props {
	params: SearchParams;
}

const schema = z.object({
	price: z
		.number({ message: 'El precio debe ser un numero valido' })
		.min(1, 'El precio debe ser igual o mayor a 1'),
	discount: z.number({ message: 'El precio debe ser un numero valido' }),
	category: z.string({ message: 'Selecciona una categoria' }),
	promotion: z.string().optional(),
	imageUrl: z
		.string({ message: 'Ingresa la URL de la imagen' })
		.url('La URL no es válida'),
	home: z.boolean(),
	masvendido: z.boolean(),
});

type Schema = z.infer<typeof schema>;

export default function ProductPage({ params }: Props) {
	const router = useRouter();

	const [error, setError] = useState<string | undefined>();
	const [status, setStatus] = useState<ComponentStatus>('LOADING');

	const [flowers, setFlowers] = useState<IDashboardProductElement[]>([]);
	const [decorations, setDecorations] = useState<IDashboardProductElement[]>(
		[],
	);

	// FETCHING
	const id = params.productId && params.productId[0];
	let props;
	if (id) {
		props = {
			resolver: zodResolver(schema),
			shouldUseNativeValidation: false,
			defaultValues: async () => {
				const res = await axios
					.get(`${API_URI}/product/`, {
						params: { productId: Number(id) },
					})
					.catch(error => {
						if (error instanceof AxiosError) {
							setError(error.response?.statusText);

							setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
						}
					});

				if (res?.data.product === null) {
					setStatus('ERROR');
					return;
				}

				setStatus('READY');

				const product = res?.data.product;

				let homeFound = false;
				let masvendidoFound = false;
				product.features.forEach((v: any) => {
					if (v.name === 'HOME') {
						homeFound = true;
					}

					if (v.name === 'MASVENDIDOS') {
						masvendidoFound = true;
					}
				});

				setFlowers(product.flowers);
				setDecorations(product.decorations);

				const flowers: string[] = product.flowers.map((v: any) => {
					return v.id;
				});

				const decorations: string[] = product.decorations.map(
					(v: any) => {
						return v.id;
					},
				);

				return {
					...product,
					category: product.categoryName,
					home: homeFound,
					masvendido: masvendidoFound,
					flowers: flowers.join(','),
					decorations: decorations.join(','),
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
						productId: Number(id),
					},
					url: `${API_URI}/product`,
				})
				.catch(error => {
					if (error instanceof AxiosError) {
						setError(error.response?.statusText);

						setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
					}
				});

			if (!response) return;
			if (response.status === 200) {
				router.push('/dashboard/products');
			}
		}
	}

	const onSubmit = handleSubmit(
		async data => {
			const features = [];

			if (data.home) {
				features.push('HOME');
			}
			if (data.masvendido) {
				features.push('MASVENDIDOS');
			}

			const sendData = {
				price: Number(data.price),
				discount: Number(data.discount),
				category: data.category,
				promotion: data.promotion,
				imageUrl: data.imageUrl,
				flowers: flowers.map(flower => flower.id),
				decorations: decorations.map(decoration => decoration.id),
				features,
			};

			if (id) {
				const res = await axios
					.request({
						method: 'PATCH',
						data: {
							productId: Number(id),
							...sendData,
						},
						url: `${API_URI}/product`,
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
			} else {
				const res = await axios
					.request({
						method: 'POST',
						data: {
							...sendData,
						},
						url: `${API_URI}/product`,
					})
					.catch(error => {
						if (error instanceof AxiosError) {
							setError(error.response?.statusText);

							setTimeout(() => setError(undefined), 4 * 1000); // NECESARY?
						}
					});

				if (!res) return;
				if (res.status === 200) {
					router.replace(`/dashboard/product/${res.data.product.id}`);
				}
			}
			console.log(data);
		},
		error => {
			console.log(error);
		},
	);

	return (
		<>
			<FlowersContext.Provider value={{ flowers, setFlowers }}>
				<DecorationsContext.Provider
					value={{ decorations, setDecorations }}
				>
					<DashboardAddFlowerModal />
					<DashboardAddDecorationModal />
					<div id='wrapper'>
						<BackHeader title='Ramo' />
						<Container className='py-3'>
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
													<ProductImage
														imageUrl={imageUrl}
													/>
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
															Coloca el link
															valido de una
															imagen, te
															recomendamos subir
															tus imagenes a{' '}
															<Link
																href={
																	'https://imgbb.com'
																}
															>
																ImgBB
															</Link>
														</span>
													}
												/>

												<label
													className='form-label'
													htmlFor='rol'
												>
													Categoria
												</label>
												<select
													{...register('category')}
													className={`form-select focus-ring focus-ring-secondary border-2 ${styles.formControl} ${errors.category && 'is-invalid'}`}
													aria-label='Category'
													name='category'
													id='category'
												>
													<option value='ANIVERSARIOS'>
														ANIVERSARIOS
													</option>
													<option value='BODAS'>
														BODAS
													</option>
													<option value='CONDOLENCIAS'>
														CONDOLENCIAS
													</option>
													<option value='CUMPLEANOS'>
														CUMPLEAÑOS
													</option>
													<option value='DETALLES'>
														DETALLES
													</option>
													<option value='GRADUACION'>
														GRADUACION
													</option>
													<option value='PAREJAS'>
														PAREJAS
													</option>
												</select>
												{errors.category && (
													<div className='invalid-feedback'>
														{errors.category?.message?.toString()}
													</div>
												)}
												<Row className='row-cols-2 g-2 mt-2'>
													<div className='col'>
														<SomeFormControl
															label='Precio'
															errors={errors}
															register={register}
															name='price'
															placeholder=''
															type='text'
															formText='No puede ser menor que el descuento'
															inputText='$'
															options={{
																valueAsNumber:
																	true,
															}}
														/>
													</div>

													<div className='col'>
														<SomeFormControl
															label='Descuento'
															errors={errors}
															register={register}
															name='discount'
															placeholder=''
															type='text'
															formText='Ingresa un valor mayor a 0 para indicar el precio final del producto.'
															inputText='$'
															options={{
																valueAsNumber:
																	true,
															}}
														/>
													</div>
												</Row>
											</div>

											<div className='col-11'>
												<div className='d-flex justify-content-around py-3'>
													<div className='ms-0 form-check-inline form-switch'>
														<input
															{...register(
																'home',
															)}
															className='form-check-input focus-ring focus-ring-secondary border-2'
															id='home'
															type='checkbox'
														/>
														<label
															className='ms-1 form-check-label'
															htmlFor='home'
														>
															Home
														</label>
													</div>

													<div className='ms-0 form-check-inline form-switch'>
														<input
															{...register(
																'masvendido',
															)}
															className='form-check-input ms-1 focus-ring focus-ring-secondary border-2'
															id='masvendido'
															type='checkbox'
														/>
														<label
															className='ms-1 form-check-label'
															htmlFor='masvendido'
														>
															Mas vendido
														</label>
													</div>
												</div>
												<SomeFormControl
													label='Promocion'
													errors={errors}
													register={register}
													name='promotion'
													placeholder=''
													type='text'
													formText='Dejalo vacio si no quieres que se marque como "Promoción"'
												/>
											</div>
										</Row>

										<DashboardProductElements
											elementTitle='Flores'
											productElements={flowers}
											setProductElements={setFlowers}
											bsTarget='#flowerModal'
										/>

										<DashboardProductElements
											elementTitle='Decorations'
											productElements={decorations}
											setProductElements={setDecorations}
											bsTarget='#decorationModal'
										/>

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
									<p className='fs-5'>
										Probablemente el producto no existe.
									</p>
								</div>
							)}
						</Container>
						<Footer />
					</div>
				</DecorationsContext.Provider>
			</FlowersContext.Provider>
		</>
	);
}
