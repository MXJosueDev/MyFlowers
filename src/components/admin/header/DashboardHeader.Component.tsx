import Header from '@/components/header/Header.Component';
import HeaderTitle from '@/components/header/HeaderTitle.Component';
import SidebarButton from '@/components/sidebar/SidebarNavButton.Component';
import { ISidebarState } from '@/types/Props';
import React from 'react';
import LogoutButton from '../auth/LogoutButton.Component';

interface Props extends ISidebarState {
	title: string;
}

export default function DashboardHeader({
	title,
	sidebarToggled,
	setSidebarToggled,
}: Props) {
	return (
		<Header>
			<div className='d-flex justify-content-start col-2 px-0'>
				<SidebarButton
					sidebarToggled={sidebarToggled}
					setSidebarToggled={setSidebarToggled}
				/>
			</div>
			<div className='col-8'>
				<HeaderTitle
					title={title}
					url='#'
					// icon='/image/headerIcon.png'
				/>
			</div>
			<div className='d-flex justify-content-end col-2 px-0'>
				<LogoutButton />
			</div>
		</Header>
	);
}
