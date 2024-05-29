'use client';

import { ComponentStatus } from '@/types/Types';
import React, { useEffect, useState } from 'react';
import BaseContainer from './BaseContainer.Component';
import axios from 'axios';
import { API_URI } from '@/utils/Utils';
import { useSearchParams } from 'next/navigation';

export default function FlowersContainer() {
	const searchParams = useSearchParams();
	const searchValue = searchParams.get('search');

	const [status, setStatus] = useState<ComponentStatus>('LOADING');
	const [flowers, setFlowers] = useState<any[]>();

	const [pageSize] = useState<number>(16);
	const [page, setPage] = useState<number>(1);
	const [nextPage, setNextPage] = useState<boolean>(false);

	useEffect(() => {
		async function fetchData() {
			try {
				setStatus('LOADING');
				setNextPage(false);

				const res = await axios
					.get(`${API_URI}/flowers/`, {
						params: {
							page,
							pageSize,
							flowerId: searchValue,
							flowerName: searchValue,
						},
					})
					.catch();
				console.log(res);

				if (res.status !== 200) {
					setStatus('ERROR');
					return;
				}

				const data = res.data;
				setNextPage(data.nextPage);
				const flowersData = data.flowers as any[];

				setFlowers(flowersData);

				setStatus('READY');
			} catch (error) {
				console.log(error);
				setStatus('ERROR');
			}
		}

		fetchData();
	}, [page, pageSize, searchValue]);

	return (
		<BaseContainer
			status={status}
			page={page}
			setPage={setPage}
			breakpoints={'ELEMENT'}
			nextPage={nextPage}
			some={flowers}
			cardStyle={'ELEMENT'}
			baseUrl='flower'
		/>
	);
}
