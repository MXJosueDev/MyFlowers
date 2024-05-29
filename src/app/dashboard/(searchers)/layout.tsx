'use client';

import DashboardSidebarNav from '@/components/admin/sidebar/DashboardSidebarNav.Component';
import Footer from '@/components/footer/Footer.Component';
import { SidebarContext } from '@/context/SidebarContext';
import styles from '@/styles/sidebar.module.scss';
import { ChildrenProp } from '@/types/Props';
import { useState } from 'react';

interface Props extends ChildrenProp {}

export default function Layout({ children }: Props) {
	const [sidebarToggled, setSidebarToggled] = useState<boolean>(false);

	return (
		<SidebarContext.Provider value={{ sidebarToggled, setSidebarToggled }}>
			<DashboardSidebarNav
				sidebarToggled={sidebarToggled}
				setSidebarToggled={setSidebarToggled}
			/>
			<div
				id='wrapper'
				className={`${styles.wrapper} ${sidebarToggled ? styles.sidebarToggled : ''}`}
			>
				{children}
				<Footer />
			</div>
		</SidebarContext.Provider>
	);
}
