import { RequiredChildrenProp, ClassNameProp } from '@/types/Props';

interface Props extends ClassNameProp, RequiredChildrenProp {}

export default function ContainerFluid(props: Props) {
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
