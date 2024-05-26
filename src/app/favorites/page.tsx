import FavoritesContainer from '@/components/favorites/FavoritesContainer.Component';
import Footer from '@/components/footer/Footer.Component';
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
				<FavoritesContainer />
			</div>
			<Footer />
		</div>
	);
}
