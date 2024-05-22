import Container from '@/components/Container.Component';
import Row from '@/components/Row.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import ContactButton from '@/components/product/ContactButton.Component';
import MobileTitle from '@/components/product/MobileTitle.Component';
import ProductElements from '@/components/product/ProductElements.Component';
import ProductHeader from '@/components/product/ProductHeader.Component';
import ProductImage from '@/components/product/ProductImage.Component';
import { FlowerCardProps } from '@/types/Props';
import { Metadata } from 'next';

interface Params {
	productId: string;
}

interface Props {
	params: Params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	return {
		title: params.productId,
	};
}

const testFlower: FlowerCardProps = {
	productId: '123432',
	category: 'NO CATEGORY',
	img: '/image/product.png',
	price: 213,
};

export default function Product({ params }: Props) {
	return (
		<div className='min-vh-100'>
			<BackHeader /> {/* TODO: Dynamic */}
			<div id='content' className={`mt-5 mb-3`}>
				<Container>
					<MobileTitle category={testFlower.category} />
					<Row className='justify-content-center mb-5'>
						<div className='col-10 col-md-6 border border-3 py-3'>
							<div className='d-flex justify-content-center'>
								<ProductImage imageUrl={testFlower.img} />
							</div>
						</div>
						<div className='col-10 col-md-6'>
							<ProductHeader
								productId={testFlower.productId}
								category={testFlower.category}
								price={testFlower.price}
							/>
						</div>
					</Row>
					<ProductElements
						elementTitle='Flores utilizadas'
						productElements={[
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
							{
								imageUrl: '/flowers/generic.png',
								elementName: 'FLOR',
							},
						]}
					/>
					<ProductElements
						elementTitle='Decoraciones'
						productElements={[
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
							{
								imageUrl: '/flowers/decoration.png',
								elementName: 'DECORACION',
							},
						]}
					/>
				</Container>

				<ContactButton productId={params.productId} />
			</div>
		</div>
	);
}
