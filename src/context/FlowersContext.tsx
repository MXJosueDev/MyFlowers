import { createContext } from 'react';

export const FlowersContext = createContext<any>({
	flowers: [],
	setFlowers: () => {},
});
