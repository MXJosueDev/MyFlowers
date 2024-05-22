'use client';

import styles from './Header.module.scss';
import { useRouter } from 'next/navigation';
import { MouseEvent, ReactNode } from 'react';
import HeaderIcon from './HeaderIcon.Component';

interface Props {
	title?: ReactNode;
	url?: string;
	icon?: string;
}

export default function HeaderTitle({
	title = process.env.NEXT_PUBLIC_APP_NAME,
	url = '#',
	icon,
}: Props) {
	const router = useRouter();

	function handleClick(event: MouseEvent<HTMLHeadingElement>) {
		event.preventDefault();

		router.push(url);
	}

	return (
		<h1
			className={`text-center text-third display-6 user-select-none overflow-hidden ${styles.headerTitle}`}
			onClick={handleClick}
		>
			{title}
			{icon && <HeaderIcon icon={icon} />}
		</h1>
	);
}
