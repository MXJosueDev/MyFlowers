'use client';

import { RequiredChildrenProp } from '@/types/Props';
import Link from 'next/link';

interface Props extends RequiredChildrenProp {
	productId: string;
}

export default function FlowerRedirector({ productId, children }: Props) {
	return (
		<Link
			className='text-decoration-none mx-auto'
			href={`/product/${productId}`}
		>
			{children}
		</Link>
	);
}
