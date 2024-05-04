'use client';

import { useState } from 'react';

export default function SearchBarForm() {
	const [searchContent, setSearchContent] = useState<string>('');

	function submitHandler(event: any) {
		// TODO: Check event type
		event.preventDefault();
		console.log(searchContent);
	}

	return (
		<form onSubmit={submitHandler}>
			<input
				onChange={event => setSearchContent(event.target.value ?? '')}
				type="text"
			/>
		</form>
	);
}
