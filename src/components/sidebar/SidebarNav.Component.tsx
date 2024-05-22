import styles from './Sidebar.module.scss';
import SidebarHeader from './SidebarHeader.Component';
import SidebarOptions from './SidebarOptions.Component';
import { ISidebarState } from '@/types/Props';

interface Props extends ISidebarState {}

export default function SidebarNav({
	sidebarToggled,
	setSidebarToggled,
}: Props) {
	return (
		<div
			className={`border-3 border-end z-3 ${styles.sidebarWrapper} ${sidebarToggled ? styles.sidebarToggled : ''}`}
		>
			<div className={styles.sidebarContainer}>
				<SidebarHeader
					sidebarToggled={sidebarToggled}
					setSidebarToggled={setSidebarToggled}
				/>
				<div className={`overflow-y-scroll ${styles.sidebarOptions}`}>
					<SidebarOptions />
				</div>
			</div>
		</div>
	);
}
