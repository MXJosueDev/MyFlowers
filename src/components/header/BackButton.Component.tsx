'use client';

import styles from '../header/Header.module.scss';
import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
	const router = useRouter();

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		router.back();
	}

	return (
		<button
			type='button'
			className={`btn ${styles.headerButton}`}
			onClick={handleClick}
		>
			<i className='bi bi-arrow-left'></i>
		</button>
	);
}
