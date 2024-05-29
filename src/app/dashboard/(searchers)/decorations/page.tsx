'use client';

import DecorationsContainer from '@/components/admin/container/DecorationsContainer.Component';
import DashboardHeader from '@/components/admin/header/DashboardHeader.Component';
import AddButton from '@/components/admin/product/AddButton.Component';
import DashboardSearchbar from '@/components/admin/searchbar/DashboardSearchbar.Component';
import { SidebarContext } from '@/context/SidebarContext';
import Link from 'next/link';
import { useContext } from 'react';

export default function DecorationsPage() {
	const { sidebarToggled, setSidebarToggled } = useContext(SidebarContext);

	return (
		<>
			<DashboardHeader
				sidebarToggled={sidebarToggled}
				setSidebarToggled={setSidebarToggled}
				title='Decoraciones'
			/>
			<DashboardSearchbar />
			<div className='mt-2 d-flex justify-content-center'>
				<Link href='/dashboard/decoration'>
					<AddButton />
				</Link>
			</div>
			<div id='content'>
				<DecorationsContainer />
			</div>
		</>
	);
}
