import Container from '@/components/Container.Component';
import ContainerFluid from '@/components/ContainerFluid.Component';
import DashboardSearchbarForm from './DashboardSearchbarForm.Component';

export default function DashboardSearchbar() {
	return (
		<ContainerFluid className='py-3 bg-primary'>
			<Container>
				<DashboardSearchbarForm />
			</Container>
		</ContainerFluid>
	);
}
