import { DOMElements } from './types';

export interface classNameProp {
	className?: string;
}

export interface childrenProp {
	children?: DOMElements;
}

export interface requiredChildrenProp {
	children: DOMElements;
}
