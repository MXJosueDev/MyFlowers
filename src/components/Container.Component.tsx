import { ClassNameProp, RequiredChildrenProp } from '@/types/Props';

interface Props extends ClassNameProp, RequiredChildrenProp {}

export default function Container(props: Props) {
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
