import { RequiredChildrenProp } from '@/types/Props';

interface Props extends RequiredChildrenProp {}

export default function FlowerCardBody({ children }: Props) {
	return <div className='card-body d'>{children}</div>;
}
