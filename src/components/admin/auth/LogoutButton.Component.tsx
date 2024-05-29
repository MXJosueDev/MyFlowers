'use client';

import { MouseEvent } from 'react';
import headerStyles from '@/components/header/Header.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function LogoutButton() {
	const router = useRouter();

	async function handleClick(event: MouseEvent<HTMLAnchorElement>) {
		event.preventDefault();

		await signOut({
			redirect: false,
		});

		router.refresh();
	}

	return (
		<Link href='#' onClick={handleClick}>
			<button
				type='button'
				className={`btn h-100 ${headerStyles.headerButton}`}
			>
				<i className='bi bi-box-arrow-left'></i>
			</button>
		</Link>
	);
}
