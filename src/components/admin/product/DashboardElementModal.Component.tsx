import { RequiredChildrenProp } from '@/types/Props';

interface Props extends RequiredChildrenProp {
	id: string;
	title: string;
}

export default function DashboardElementModal({ children, id, title }: Props) {
	return (
		<div
			className='modal fade'
			id={id}
			tabIndex={-1}
			aria-labelledby={`${id}Title`}
			aria-hidden='true'
		>
			<div className='modal-dialog modal-dialog-centered'>
				<div className='modal-content'>
					<div className='modal-header'>
						<h1 className='modal-title fs-5' id={`${id}Title`}>
							{title}
						</h1>
						<button
							type='button'
							className='btn-close'
							data-bs-dismiss='modal'
							aria-label='Close'
						></button>
					</div>
					<div className='modal-body p-0'>{children}</div>
				</div>
			</div>
		</div>
	);
}
