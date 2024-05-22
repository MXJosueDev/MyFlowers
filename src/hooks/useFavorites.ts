import { useLocalStorage } from 'usehooks-ts';

interface UseFavoritesReturn {
	favs: string[];
	toggleFavorite(productId: string): boolean;
	isFavorite(productId: string): boolean;
}

export default function useFavorites(): UseFavoritesReturn {
	// TODO: Typing
	// FIXME: Infinite calling
	function serialize(value: string[]): string {
		return value.join(',');
	}

	function deserialize(value: string): string[] {
		return value.split(',');
	}

	const [favs, setFavs] = useLocalStorage<string[]>('favoriteFlowers', [], {
		serializer: serialize,
		deserializer: deserialize,
	});

	function addFavorite(productId: string): boolean {
		if (!isFavorite(productId) && favs.length <= 100) {
			setFavs(favs.concat(productId));
			return true;
		}

		return false;
	}

	function removeFavorite(productId: string): void {
		if (isFavorite(productId)) {
			const favsCopy = Array.from(favs);
			const index = favsCopy.indexOf(productId);

			favsCopy.splice(index, 1);
			setFavs(favsCopy);
		}
	}

	function isFavorite(productId: string): boolean {
		return favs.includes(productId);
	}

	function toggleFavorite(productId: string): boolean {
		if (isFavorite(productId)) {
			removeFavorite(productId);
			return true;
		} else {
			return addFavorite(productId);
		}
	}

	return { favs, toggleFavorite, isFavorite };
}
