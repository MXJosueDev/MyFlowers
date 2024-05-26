import { SetState } from '@/types/Types';
import React, { MouseEvent } from 'react';

interface Props {
	results: number;
	page: number;
	setPage: SetState<number>;
	pageSize: number;
}

export default function ContainerPagination({
	results,
	page,
	setPage,
	pageSize,
}: Props) {
	function prevPage(event: MouseEvent<HTMLAnchorElement>) {
		if (page >= 1) {
			setPage(page - 1);
			return;
		}

		event.preventDefault();
		event.preventDefault();
	}

	function nextPage(event: MouseEvent<HTMLAnchorElement>) {
		if (pageSize <= results) {
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
