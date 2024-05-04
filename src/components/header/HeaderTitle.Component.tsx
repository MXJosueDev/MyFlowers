import Container from '../Container.Component';

export default function HeaderTitle() {
	return (
		<Container>
			<h1 className="text-center">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
		</Container>
	);
}
