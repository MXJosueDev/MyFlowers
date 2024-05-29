'use client';

import Row from '../Row.Component';
import Link from 'next/link';

interface Props {
	productId: string;
}

export default function ContactButton({ productId }: Props) {
	const baseUrl =
		typeof window !== 'undefined' && window.location.origin
			? window.location.origin
			: '';

	const params = new URLSearchParams();
	params.set(
		'text',
		`Hola, me interesa adquirir el siguiente producto: ${baseUrl}/product/${productId}\n\n¿Me puedes proporcionar más informacion?`,
	);

	return (
		<Row className='justify-content-center'>
			<div className='col-11 col-md-7 col-lg-5'>
				<Link
					className='w-100 btn btn-secondary py-3 rounded-4 fs-5'
					href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_PHONE}?${params.toString()}`}
				>
					<span>Contactanos</span>
					<i className='bi bi-whatsapp ms-3'></i>
				</Link>
			</div>
		</Row>
	);
}
