import Container from '@/components/Container.Component';

export default function LoadingApp() {
	return (
		<div className='bg-primary min-vh-100'>
			<Container className='min-vh-100'>
				<div className='min-vh-100 d-flex justify-content-center align-items-center flex-column'>
					<div className='mb-3'>
						<div
							className='spinner-border text-bg-primary border-3'
							role='status'
						>
							<span className='visually-hidden'>Loading...</span>
						</div>
					</div>
					<h1 className='fs-3 text-center'>
						La aplicacion se está cargando...
					</h1>
				</div>
			</Container>
		</div>
	);
}
