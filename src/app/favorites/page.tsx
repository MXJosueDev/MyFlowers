import FavoritesFlowerCard from '@/components/flowers/FavoritesFlowerCard.Component';
import FlowersContainer, {
	BREAKPOINTS,
} from '@/components/flowers/FlowersContainer.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Favoritos',
};

export default function Favorites() {
	return (
		<div className='min-vh-100'>
			<BackHeader title='Favoritos' />
			<div id='content' className={`mt-5 mb-3`}>
				<FlowersContainer
					flowers={[]}
					flowerCard={FavoritesFlowerCard}
					breakpoints={BREAKPOINTS.FAVORITES}
				/>
			</div>
		</div>
	);
}
