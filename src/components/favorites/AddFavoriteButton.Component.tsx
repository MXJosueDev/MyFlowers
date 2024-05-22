'use client';

import useFavorites from '@/hooks/useFavorites';
import { MouseEvent, useState } from 'react';
import styles from './Favorites.module.scss';

interface Props {
	productId: string;
}

export default function AddFavoriteButton({ productId }: Props) {
	const { toggleFavorite, isFavorite } = useFavorites();
	const [error, setError] = useState<boolean>(false);

	function handleClick(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		event.stopPropagation();

		if (!toggleFavorite(productId)) {
			setError(true);

			setTimeout(() => setError(false), 2.5 * 1000);
		}
	}

	return (
		<button
			className={`btn border-0 ctooltip ctooltip-hover ${error && 'ctooltip-enabled'} ${styles.addFavorite}`}
			onClick={handleClick}
		>
			<i
				className={
					isFavorite(productId) ? 'bi bi-heart-fill' : 'bi bi-heart'
				}
			/>

			<div className='ctooltiptext'>
				{error
					? 'No puedes añadir mas de 100 favoritos'
					: 'Añadir a favoritos'}
			</div>
		</button>
	);
}
