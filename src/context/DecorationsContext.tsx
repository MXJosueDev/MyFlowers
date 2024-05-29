import { createContext } from 'react';

export const DecorationsContext = createContext<any>({
	decorations: [],
	setDecorations: () => {},
});
