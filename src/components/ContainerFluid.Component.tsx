import { RequiredChildrenProp, ClassNameProp, IdProp } from '@/types/Props';

interface Props extends IdProp, ClassNameProp, RequiredChildrenProp {}

export default function ContainerFluid({ className, children }: Props) {
	return <div className={`container-fluid ${className}`}>{children}</div>;
}
