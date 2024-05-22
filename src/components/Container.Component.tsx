import { ClassNameProp, IdProp, RequiredChildrenProp } from '@/types/Props';

interface Props extends IdProp, ClassNameProp, RequiredChildrenProp {}

export default function Container({ className, children }: Props) {
	return <div className={`container ${className}`}>{children}</div>;
}
