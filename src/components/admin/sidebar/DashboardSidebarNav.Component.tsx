import styles from '@/components/sidebar/Sidebar.module.scss';
import DashboardSidebarHeader from './DashboardSidebarHeader.Component';
import { ISidebarState } from '@/types/Props';
import DashboardSidebarOptions from './DashboardSidebarOptions';

interface Props extends ISidebarState {}

export default function DashboardSidebarNav({
	sidebarToggled,
	setSidebarToggled,
}: Props) {
	return (
		<div
			className={`border-3 border-end z-3 ${styles.sidebarWrapper} ${sidebarToggled ? styles.sidebarToggled : ''}`}
		>
			<div className={styles.sidebarContainer}>
				<DashboardSidebarHeader
					sidebarToggled={sidebarToggled}
					setSidebarToggled={setSidebarToggled}
				/>
				<div className={`overflow-y-scroll ${styles.sidebarOptions}`}>
					<DashboardSidebarOptions />
				</div>
			</div>
		</div>
	);
}
