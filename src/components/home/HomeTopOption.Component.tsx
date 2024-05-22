'use client';

import Link from 'next/link';
import styles from './HomeTop.module.scss';

interface Props {
	optionName: string;
	optionFeatureSearch: string;
	optionIcon: string;
}

export default function HomeTopOption({
	optionName,
	optionFeatureSearch,
	optionIcon,
}: Props) {
	return (
		<Link href={`/products?feature=${optionFeatureSearch}`}>
			<button
				type='button'
				className={`btn btn-primary border-2 rounded-circle ctooltip ctooltip-hover ${styles.optionButton}`}
			>
				<i className={'bi bi-' + optionIcon}></i>

				<div className='ctooltiptext'>{optionName}</div>
			</button>
		</Link>
	);
}
