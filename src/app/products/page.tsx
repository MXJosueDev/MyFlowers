import FlowersContainer from '@/components/flowers/FlowersContainer.Component';
import Footer from '@/components/footer/Footer.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Productos',
};

interface SearchParams {
	productId?: string;
	category?: string;
	features?: string;
	minPrice?: string;
	maxPrice?: string;
	promotion?: string;
	flowers?: string;
	decorations?: string;
}

interface Props {
	searchParams: SearchParams;
}

export default function Products({ searchParams }: Props) {
	return (
		<div className='min-vh-100'>
			<BackHeader title='Productos' />
			<div id='content' className={`mt-5 mb-3`}>
				<FlowersContainer
					fetchParams={{
						...searchParams,
					}}
					cardStyle='HOME'
					breakpoints='HOME'
				/>
			</div>
			<Footer />
		</div>
	);
}
