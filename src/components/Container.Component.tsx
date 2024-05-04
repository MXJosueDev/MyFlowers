import { classNameProp, requiredChildrenProp } from '@/types/props';

interface props extends classNameProp, requiredChildrenProp {}

export default function Container(props: props) {
	return (
		<div
			className={
				'container ' +
				(props.className === undefined ? '' : props.className)
			}
		>
			{props.children}
		</div>
	);
}
