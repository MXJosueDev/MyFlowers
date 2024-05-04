import { DOMElements } from './Types';

export interface ClassNameProp {
	className?: string;
}

export interface ChildrenProp {
	children?: DOMElements;
}

export interface requiredChildrenProp {
	children: DOMElements;
}
