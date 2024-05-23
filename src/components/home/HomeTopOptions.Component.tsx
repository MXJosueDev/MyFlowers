import HomeTopOption from './HomeTopOption.Component';

export default function HomeTopOptions() {
	return (
		<>
			<HomeTopOption
				optionName='Mas vendidos'
				optionFeatureSearch='masvendidos'
				optionIcon='fire'
			/>
			<HomeTopOption
				optionName='Ofertas'
				optionFeatureSearch='ofertas'
				optionIcon='star-fill'
			/>
			<HomeTopOption
				optionName='Promociones'
				optionFeatureSearch='promociones'
				optionIcon='tags-fill'
			/>
		</>
	);
}
