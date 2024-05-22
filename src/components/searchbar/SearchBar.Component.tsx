import SearchBarForm from './SearchBarForm.Component';
import ContainerFluid from '@/components/ContainerFluid.Component';

export default function SearchBar() {
	return (
		<ContainerFluid className='p-1 bg-secondary rounded-pill'>
			<SearchBarForm />
		</ContainerFluid>
	);
}
