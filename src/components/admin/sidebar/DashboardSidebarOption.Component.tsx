import Link from 'next/link';
import styles from '@/components/sidebar/Sidebar.module.scss';

interface Props {
	optionName: string;
	optionType: string;
	optionIcon: string;
}

export default function DashboardSidebarOption({
	optionName,
	optionType,
	optionIcon,
}: Props) {
	return (
		<li className='nav-item my-1'>
			<Link
				className={`nav-link icon-link text-body fs-5 w-100 ${styles.sidebarOption}`}
				href={`/dashboard/${optionType}`}
			>
				<i className={'bi bi-' + optionIcon}></i>

				{optionName}
			</Link>
		</li>
	);
}
