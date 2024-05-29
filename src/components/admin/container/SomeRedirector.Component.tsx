'use client';

import { RequiredChildrenProp } from '@/types/Props';
import Link from 'next/link';

interface Props extends RequiredChildrenProp {
	url: string;
}

export default function SomeRedirector({ url, children }: Props) {
	return (
		<Link className='text-decoration-none' href={`/dashboard/${url}`}>
			{children}
		</Link>
	);
}
