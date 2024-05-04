'use client';

import { useState } from 'react';

export default function SearchBar() {
	const [searchContent, setSearchContent] = useState<string>('');

	function submitHandler(event: any) {
		// TODO: Check event type
		event.preventDefault();
		console.log(searchContent);
	}

	return (
		<div className="bg-tertiary">
			<form onSubmit={submitHandler}>
				<input
					onChange={event =>
						setSearchContent(event.target.value ?? '')
					}
					type="text"
				/>
			</form>
		</div>
	);
}
