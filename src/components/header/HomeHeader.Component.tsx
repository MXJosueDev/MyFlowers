import HeaderTitle from './HeaderTitle.Component';
import SidebarButton from '../sidebar/SidebarNavButton.Component';
import FavoritesButton from '../favorites/FavoritesButton.Component';
import { ISidebarState } from '@/types/Props';
import Header from './Header.Component';

interface Props extends ISidebarState {}

export default function HomeHeader({
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
				<HeaderTitle url='/' icon='/image/headerIcon.png' />
			</div>
			<div className='d-flex justify-content-end col-2 px-0'>
				<FavoritesButton />
			</div>
		</Header>
	);
}
