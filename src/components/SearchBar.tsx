import { useState } from 'react';

export default function SearchBar() {
	const [searchContent, setSearchContent] = useState<string>('');

	function submitHandler(event: any) {
		console.log(searchContent);
	}

	return (
		<div>
			<form onClick={submitHandler}>
				<input
					onChange={event =>
						setSearchContent(event.target.textContent ?? '')
					}
					type="text"
				/>
			</form>
		</div>
	);
}
