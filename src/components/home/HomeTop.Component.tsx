import Row from '../Row.Component';
import HomeTopImage from './HomeTopImage.Component';
import HomeTopOptions from './HomeTopOptions.Component';

export default function HomeTop() {
	return (
		<div className='container-fluid container-lg px-0 mt-4'>
			<Row className='flex-lg-row-reverse mx-0'>
				<div className='col-12 col-lg-10 px-0'>
					<HomeTopImage />
				</div>
				<div className='col-12 col-lg-2 mt-5 mt-lg-0 px-5 px-lg-0 ps-lg-2 d-flex flex-lg-column justify-content-between align-items-center align-items-lg-start'>
					<HomeTopOptions />
				</div>
			</Row>
		</div>
	);
}
