import Container from '@/components/Container.Component';

export default function NotFound() {
	return (
		<div className='bg-primary min-vh-100'>
			<Container className='min-vh-100'>
				<div className='min-vh-100 d-flex justify-content-center align-items-center flex-column'>
					<i className='bi bi-exclamation-circle display-3 mb-3'></i>
					<h2 className='display-5'>404</h2>
					<h1 className='fs-3 text-center'>
						No se encontro el recurso que buscabas.
					</h1>
				</div>
			</Container>
		</div>
	);
}
