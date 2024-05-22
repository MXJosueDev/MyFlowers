import HomeFlowerCard from '@/components/flowers/HomeFlowerCard.Component';
import FlowersContainer, {
	BREAKPOINTS,
} from '@/components/flowers/FlowersContainer.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Productos',
};

interface SearchParams {
	productId?: string;
	category?: string;
	feature?: string;
}

interface Props {
	searchParams: SearchParams;
}

export default function Products({ searchParams }: Props) {
	return (
		<div className='min-vh-100'>
			<BackHeader title='Productos' />
			<div id='content' className={`mt-5 mb-3`}>
				{JSON.stringify(searchParams)} {/* DEBUGGIN */}
				{searchParams.productId &&
					`Se busca un producto con el ID: ${searchParams.productId}`}
				<FlowersContainer
					flowers={[]}
					flowerCard={HomeFlowerCard}
					breakpoints={BREAKPOINTS.HOME}
				/>
			</div>
		</div>
	);
}
