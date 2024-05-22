import headerStyles from '../header/Header.module.scss';
import { MouseEvent } from 'react';
import { ISidebarState } from '@/types/Props';

interface Props extends ISidebarState {}

export default function SidebarButton({
	sidebarToggled,
	setSidebarToggled,
}: Props) {
	function toggleSidebar(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();

		setSidebarToggled(!sidebarToggled);
	}

	return (
		<button
			type='button'
			className={`btn ${headerStyles.headerButton}`}
			onClick={toggleSidebar}
		>
			<i className='bi bi-list'></i>
		</button>
	);
}
