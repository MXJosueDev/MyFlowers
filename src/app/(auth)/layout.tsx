import { RequiredChildrenProp } from '@/types/Props';
import Container from '@/components/Container.Component';
import Row from '@/components/Row.Component';
import BackHeader from '@/components/header/BackHeader.Component';
import styles from '@/components/auth/Auth.module.scss';

interface Props extends RequiredChildrenProp {}

export default function AuthLayout({ children }: Props) {
	return (
		<div className='min-vh-100'>
			<BackHeader title='Log-in' />
			<div id='content' className={`mt-5 mb-3 ${styles.container}`}>
				<Container>
					<Row className='justify-content-center'>
						<div className='col-12 col-sm-10 col-md-8 col-lg-5'>
							{children}
						</div>
					</Row>
				</Container>
			</div>
		</div>
	);
}
