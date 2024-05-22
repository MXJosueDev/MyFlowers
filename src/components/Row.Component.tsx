import { ClassNameProp, IdProp, RequiredChildrenProp } from '@/types/Props';
import React from 'react';

interface Props extends IdProp, ClassNameProp, RequiredChildrenProp {}

export default function Row({ className, children }: Props) {
	return <div className={`row ${className}`}>{children}</div>;
}
