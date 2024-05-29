import { HTMLInputTypeAttribute, ReactNode } from 'react';
import { SetState } from './Types';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface ClassNameProp {
	className?: string;
}

export interface IdProp {
	id?: string;
}

export interface ChildrenProp {
	children?: ReactNode;
}

export interface RequiredChildrenProp {
	children: ReactNode;
}

export interface FlowerCardProps {
	productId: string;
	category: string;
	img: string;
	price: number;
	discount: number;
}

export interface ISidebarState {
	sidebarToggled: boolean;
	setSidebarToggled: SetState<boolean>;
}

export interface FormControlProps {
	register: UseFormRegister<any>;
	errors: FieldErrors;
	name: string;
	label: string;
	type: HTMLInputTypeAttribute;
	placeholder: string;
	options?: RegisterOptions;
	formText?: ReactNode;
	inputText?: string;
}

export interface IProductElement {
	imageUrl: string;
	name: string;
}

export interface IDashboardProductElement extends IProductElement {
	id: string;
}
