'use client';

import HomeHeader from '@/components/header/HomeHeader.Component';
import FlowersContainer from '@/components/flowers/FlowersContainer.Component';
import HomeTop from '@/components/home/HomeTop.Component';
import SidebarNav from '@/components/sidebar/SidebarNav.Component';
import { useState } from 'react';
import styles from './Home.module.scss';
import Footer from '@/components/footer/Footer.Component';

export default function Home() {
	const [sidebarToggled, setSidebarToggled] = useState<boolean>(false);

	return (
		<>
			<SidebarNav
				sidebarToggled={sidebarToggled}
				setSidebarToggled={setSidebarToggled}
			/>
			<div
				id='wrapper'
				className={`${styles.wrapper} ${sidebarToggled ? styles.sidebarToggled : ''}`}
			>
				<HomeHeader
					sidebarToggled={sidebarToggled}
					setSidebarToggled={setSidebarToggled}
				/>
				<div id='content'>
					<HomeTop />

					<FlowersContainer
						fetchParams={{ features: 'HOME' }}
						cardStyle='HOME'
						breakpoints='HOME'
					/>
				</div>
				<Footer />
			</div>
		</>
	);
}
