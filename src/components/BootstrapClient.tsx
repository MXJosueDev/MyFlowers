'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
	useEffect(() => {
		/* const bootstrap =  */ require('bootstrap/dist/js/bootstrap.bundle');

		/** POPPER (Tooltips, etc) */
		/* const tooltipTriggerList = document.querySelectorAll(
			'[data-bs-toggle="tooltip"]',
		);

		Array.from(tooltipTriggerList).map(
			tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl),
		); */
	}, []);

	return null;
}
