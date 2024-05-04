import { requiredChildrenProp, classNameProp } from '@/types/props';

interface props extends classNameProp, requiredChildrenProp {}

export default function ContainerFluid(props: props) {
	return (
		<div
			className={
				'container-fluid ' +
				(props.className === undefined ? '' : props.className)
			}
		>
			{props.children}
		</div>
	);
}
