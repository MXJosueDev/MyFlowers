import { ClassNameProp, IdProp, RequiredChildrenProp } from '@/types/Props';

interface Props extends IdProp, ClassNameProp, RequiredChildrenProp {}

export default function Container({ id, className, children }: Props) {
	return <div  id={id} className={`container ${className}`}>{children}</div>;
}
