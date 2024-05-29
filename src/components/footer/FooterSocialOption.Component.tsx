import Link from 'next/link';

interface Props {
	optionUrl?: string;
	optionIcon: string;
}

export function FooterSocialOption({ optionUrl, optionIcon }: Props) {
	return (
		<li className='list-inline-item'>
			<Link href={optionUrl ?? '#'}>
				<i
					className={`text-body-emphasis fs-6 bi bi-${optionIcon}`}
				></i>
			</Link>
		</li>
	);
}
