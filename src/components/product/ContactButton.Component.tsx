'use client';

import Row from '../Row.Component';
import Link from 'next/link';

interface Props {
	productId: string;
}

export default function ContactButton({ productId }: Props) {
	return (
		<Row className='justify-content-center'>
			<div className='col-11 col-md-7 col-lg-5'>
				<Link
					className='w-100 btn btn-secondary py-3 rounded-4 fs-5'
					href={`https://wa.me/${process.env.NEXT_PUBLIC_OWNER_PHONE}?text=Hola%20quiero%20comprar%20este%20ramo%3A%20${productId}`} /* TODO: REAL MESSAGE */
				>
					<span>Contactanos</span>
					<i className='bi bi-whatsapp ms-3'></i>
				</Link>
			</div>
		</Row>
	);
}
