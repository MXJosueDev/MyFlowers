'use client';

import HomeHeader from '@/components/header/HomeHeader.Component';
import FlowersContainer, {
	BREAKPOINTS,
} from '@/components/flowers/FlowersContainer.Component';
import HomeTop from '@/components/home/HomeTop.Component';
import SidebarNav from '@/components/sidebar/SidebarNav.Component';
import { useState } from 'react';
import styles from './Home.module.scss';
import HomeFlowerCard from '@/components/flowers/HomeFlowerCard.Component';

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
						flowers={[]}
						flowerCard={HomeFlowerCard}
						breakpoints={BREAKPOINTS.HOME}
					/>
				</div>
			</div>
		</>
	);
}
