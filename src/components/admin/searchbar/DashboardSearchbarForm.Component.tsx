'use client';

import { useEffect, useState } from 'react';
import styles from './DashboardSearchbar.module.scss';
import DashboardSearchBarButton from './DashboardSearchbarButton.Component';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function DashboardSearchbarForm() {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (searchValue !== '') {
			params.set('search', searchValue);
		} else {
			params.delete('search');
		}

		router.replace(`${pathname}?${params.toString()}`);
	}, [searchValue, pathname, router, searchParams]);

	return (
		<form
			onSubmit={event => event.preventDefault()}
			className={`d-flex w-auto bg-light p-1 ${styles.searchbarInput}`}
		>
			<input
				className={`w-100 b-0 ps-2 ${styles.searchbarInput}`}
				value={searchValue}
				onChange={e => setSearchValue(e.target.value)}
				type='text'
				placeholder='Buscar'
			></input>

			<DashboardSearchBarButton />
		</form>
	);
}
