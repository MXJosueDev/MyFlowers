import ProductContent from '@/components/product/ProductContent.Component';
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

export default function Product({ params }: Props) {
	return (
		<div className='min-vh-100'>
			<ProductContent productId={params.productId} />
		</div>
	);
}
