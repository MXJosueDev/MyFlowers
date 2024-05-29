import { SetState } from '@/types/Types';
import React, { MouseEvent } from 'react';

interface Props {
	page: number;
	setPage: SetState<number>;
	nextPage: boolean;
}

export default function ContainerPagination({
	page,
	setPage,
	nextPage: hasNextPage,
}: Props) {
	function prevPage(event: MouseEvent<HTMLAnchorElement>) {
		if (page > 1) {
			setPage(page - 1);
			return;
		}

		event.preventDefault();
		event.preventDefault();
	}

	function nextPage(event: MouseEvent<HTMLAnchorElement>) {
		if (hasNextPage) {
			setPage(page + 1);
			return;
		}

		event.preventDefault();
	}

	return (
		<div className='d-flex justify-content-center mt-2 text-center'>
			<ul className='pagination'>
				<li className='page-item'>
					<a
						className='page-link text-body-emphasis'
						href='#results'
						onClick={prevPage}
					>
						Pagina anterior
					</a>
				</li>

				<li className='page-item'>
					<a
						className='page-link text-body-emphasis'
						href='#results'
						onClick={nextPage}
					>
						Pagina siguiente
					</a>
				</li>
			</ul>
		</div>
	);
}
