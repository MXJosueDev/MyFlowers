import { MouseEventHandler } from 'react';

interface Props {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	bsTarget?: string;
}

export default function AddButton({ onClick, bsTarget }: Props) {
	return (
		<button
			className='btn rounded-circle bg-secondary text-dark border-2 border-dark p-2 lh-1'
			type='button'
			onClick={onClick}
			data-bs-toggle={bsTarget && 'modal'}
			data-bs-target={bsTarget}
		>
			<i className='bi bi-plus display-3 lh-1'></i>
		</button>
	);
}
