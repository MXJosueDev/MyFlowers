import Container from '../Container.Component';
import ContainerFluid from '../ContainerFluid.Component';
import HeaderTitle from './HeaderTitle.Component';
import SearchBar from './searchbar/SearchBar.Component';

export default function Header() {
	return (
		<header>
			<ContainerFluid>
				<Container>
					<HeaderTitle />
					<SearchBar />
				</Container>
			</ContainerFluid>
		</header>
	);
}
