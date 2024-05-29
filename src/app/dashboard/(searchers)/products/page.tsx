'use client';

import ProductsContainer from '@/components/admin/container/ProductsContainer.Component';
import DashboardHeader from '@/components/admin/header/DashboardHeader.Component';
import AddButton from '@/components/admin/product/AddButton.Component';
import DashboardSearchbar from '@/components/admin/searchbar/DashboardSearchbar.Component';
import { SidebarContext } from '@/context/SidebarContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function ProductsPage() {
	const { sidebarToggled, setSidebarToggled } = useContext(SidebarContext);

	return (
		<>
			<DashboardHeader
				sidebarToggled={sidebarToggled}
				setSidebarToggled={setSidebarToggled}
				title='Ramos'
			/>
			<DashboardSearchbar />
			<div id='content'>
				<div className='mt-2 d-flex justify-content-center'>
					<Link href='/dashboard/product'>
						<AddButton />
					</Link>
				</div>
				<ProductsContainer />
			</div>
		</>
	);
}
