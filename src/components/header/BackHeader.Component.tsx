import BackButton from './BackButton.Component';
import Header from './Header.Component';
import HeaderIcon from './HeaderIcon.Component';
import HeaderTitle from './HeaderTitle.Component';

interface Props {
	title?: string;
	icon?: string;
}

export default function BackHeader({
	title,
	icon = '/image/headerIcon.png',
}: Props) {
	return (
		<Header>
			<div className='d-flex justify-content-start col-2 px-0'>
				<BackButton />
			</div>
			<div className='col-8'>
				<HeaderTitle title={title} />
			</div>
			<div className='d-flex justify-content-end col-2 px-0'>
				<HeaderIcon icon={icon} />
			</div>
		</Header>
	);
}
