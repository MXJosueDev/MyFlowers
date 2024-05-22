'use client';

import { FormEvent, useState } from 'react';
import SearchBarButton from './SearchBarButton.Component';
import styles from './SearchBar.module.scss';

export default function SearchBarForm() {
	// TODO: Safe remove
	const [searchContent, setSearchContent] = useState<string>('');

	function submitHandler(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		console.log(searchContent);
	}

	return (
		<form className='w-auto d-flex' onSubmit={submitHandler}>
			<input
				className={`w-100 b-0 ps-2 ${styles.searchbarInput}`}
				onChange={event => setSearchContent(event.target.value ?? '')}
				type='text'
				placeholder='Buscar'
			/>
			<SearchBarButton />
		</form>
	);
}
