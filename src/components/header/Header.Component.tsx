import { RequiredChildrenProp } from '@/types/Props';
import Container from '../Container.Component';
import ContainerFluid from '../ContainerFluid.Component';
import Row from '../Row.Component';
import styles from './Header.module.scss';

interface Props extends RequiredChildrenProp {}

export default function Header({ children }: Props) {
	return (
		<header>
			<ContainerFluid className='bg-primary py-3'>
				<Container>
					<Row className={styles.headerRow}>{children}</Row>
				</Container>
			</ContainerFluid>
		</header>
	);
}
