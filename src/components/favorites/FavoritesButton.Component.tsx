'use client';

import headerStyles from '../header/Header.module.scss';
import Link from 'next/link';

export default function FavoritesButton() {
	return (
		<Link href='/favorites'>
			<button
				type='button'
				className={`btn h-100 ${headerStyles.headerButton}`}
			>
				<i className='bi bi-heart-fill'></i>
			</button>
		</Link>
	);
}
