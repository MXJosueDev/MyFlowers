import HomeTopOption from './HomeTopOption.Component';

export default function HomeTopOptions() {
	return (
		<>
			<HomeTopOption
				optionName='Mas vendidos'
				optionFeatureSearch='MASVENDIDOS'
				optionIcon='fire'
			/>
			<HomeTopOption
				optionName='Ofertas'
				optionFeatureSearch='OFERTAS'
				optionIcon='star-fill'
			/>
			<HomeTopOption
				optionName='Promociones'
				optionFeatureSearch='PROMOCIONES'
				optionIcon='tags-fill'
			/>
		</>
	);
}
