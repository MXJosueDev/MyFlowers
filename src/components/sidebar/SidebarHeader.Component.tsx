import HeaderStyles from '../header/Header.module.scss';
import { ISidebarState } from '@/types/Props';
import HeaderIcon from '../header/HeaderIcon.Component';

interface Props extends ISidebarState {}

export default function SidebarHeader({ setSidebarToggled }: Props) {
	return (
		<div className='d-flex bg-secondary py-3 px-2 justify-content-between align-items-center'>
			<button
				type='button'
				className={`btn float-end ${HeaderStyles.headerButton}`}
			>
				<i
					className='bi bi-x'
					onClick={() => setSidebarToggled(false)}
				></i>
			</button>

			<h6 className='display-6 mb-0'>Menú</h6>

			<HeaderIcon icon='/image/sidebarIcon.png' />
		</div>
	);
}
