'use client';

import useFavorites from '@/hooks/useFavorites';
import Container from '../Container.Component';
import { useEffect, useState } from 'react';
import FlowersContainer from '../flowers/FlowersContainer.Component';

export default function FavoritesContainer() {
	const [render, setRender] = useState<boolean>(false);
	const { favs } = useFavorites();

	useEffect(() => setRender(true), []);

	return render && favs.length > 0 ? (
		<FlowersContainer
			fetchParams={{ productId: favs.join(',') }}
			cardStyle='FAVORITES'
			breakpoints='FAVORITES'
		/>
	) : (
		<Container className='my-5 text-center'>
			<h5 className='display-6'>No has agregado ningun producto a favoritos aun.</h5>
		</Container>
	);
}
