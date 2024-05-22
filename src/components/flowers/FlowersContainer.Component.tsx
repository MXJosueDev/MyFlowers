import { FlowerCardProps } from '@/types/Props';
import Container from '../Container.Component';
import Row from '../Row.Component';
import FlowerRedirector from './FlowerRedirector.Component';
import { ReactElement } from 'react';
// import HomeFlowerCard from './HomeFlowerCard.Component';

// FIXME: For testing only
// FIXME: STATIC TYPE

interface Flower extends FlowerCardProps {}

const flowers: Flower[] = [
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
	{
		category: 'NO CATEGORY',
		productId: '120321321',
		img: '/image/product.png',
		price: 100,
	},
];

export const BREAKPOINTS = {
	HOME: 'row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4',
	FAVORITES: 'row-cols-1 row-cols-lg-2',
};

interface Props {
	breakpoints: string;
	flowerCard(props: FlowerCardProps): ReactElement;
	flowers: Flower[];
}

export default function FlowersContainer({
	breakpoints,
	flowerCard: FlowerCard,
}: Props) {
	return (
		<Container className='my-5'>
			<Row className={`g-3 ${breakpoints}`}>
				{flowers.map(flower => {
					return (
						<div key={flower.productId} className='col'>
							<FlowerRedirector productId={flower.productId}>
								<FlowerCard
									category={flower.category}
									productId={flower.productId}
									img={flower.img}
									price={flower.price}
								/>
							</FlowerRedirector>
						</div>
					);
				})}
			</Row>
		</Container>
	);
}
