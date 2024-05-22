'use client';

import { RequiredChildrenProp } from '@/types/Props';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Props extends RequiredChildrenProp {
	productId: string;
}

export default function FlowerRedirector({ productId, children }: Props) {
	const router = useRouter();

	function productRedirect(event: MouseEvent<HTMLDivElement>) {
		event.preventDefault();

		router.push(`/product/${productId}`);
	}

	return <div onClick={productRedirect}>{children}</div>;
}
