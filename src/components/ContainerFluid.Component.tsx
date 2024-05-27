import { RequiredChildrenProp, ClassNameProp, IdProp } from '@/types/Props';

interface Props extends IdProp, ClassNameProp, RequiredChildrenProp {}

export default function ContainerFluid({ id, className, children }: Props) {
	return (
		<div id={id} className={`container-fluid ${className}`}>
			{children}
		</div>
	);
}
