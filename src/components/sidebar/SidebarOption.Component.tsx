import Link from 'next/link';
import styles from './Sidebar.module.scss';

interface Props {
	optionName: string;
	optionSearchCategory: string;
	optionIcon: string;
}

export default function SidebarOption({
	optionName,
	optionSearchCategory,
	optionIcon,
}: Props) {
	return (
		<li className='nav-item my-1'>
			<Link
				className={`nav-link icon-link text-body fs-5 w-100 ${styles.sidebarOption}`}
				href={`/products?category=${optionSearchCategory}`}
			>
				<i className={'bi bi-' + optionIcon}></i>

				{optionName}
			</Link>
		</li>
	);
}
