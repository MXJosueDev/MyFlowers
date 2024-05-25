import axios from 'axios';
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
			return Object.fromEntries(request.nextUrl.searchParams);
		}
	} catch {
		return {};
	}
}

export async function isValidImageURL(url: string): Promise<boolean> {
	try {
		const response = await axios.head(url);
		const contentType = response.headers['content-type'];
		return contentType && contentType.startsWith('image/');
	} catch (error) {
		return false;
	}
}
