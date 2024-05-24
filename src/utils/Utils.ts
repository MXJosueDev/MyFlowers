import { NextRequest } from 'next/server';

export function joinClassNames(
	...classNames: Array<string | undefined>
): string {
	return classNames.join(' ');
} /* TODO: Remove */

export async function dataJsonDeserializer(
	request: NextRequest,
	method: 'POST' | 'GET',
): Promise<any> {
	try {
		if (method === 'POST') {
			return await request.json();
		} else {
			return request.nextUrl.searchParams;
		}
	} catch {
		return {};
	}
}
