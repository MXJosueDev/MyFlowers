import { prisma } from '@/_lib/prisma';
import { dataJsonDeserializer } from '@/utils/Utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const pageSize = 16;

const GetData = z.object({
	page: z.number().min(1),
	pageSize: z.number().min(1).max(50).default(pageSize),
	id: z.number().min(1).optional(),
	name: z.string().optional(),
});

export async function GET(request: NextRequest) {
	const jsonData = await dataJsonDeserializer(request, 'GET');

	const parsedData = GetData.safeParse({
		page: Number(jsonData.page),
		pageSize: jsonData.pageSize && Number(jsonData.pageSize),
		id: !isNaN(Number(jsonData.decorationId))
			? Number(jsonData.decorationId)
			: undefined,
		name: jsonData.decorationName,
	});

	if (!parsedData.success) {
		return NextResponse.json(
			{
				error: parsedData.error,
			},
			{
				status: 400,
				statusText: 'Los datos enviados no fueron correctos',
			},
		);
	}

	const data = parsedData.data;

	let where = {};
	if (data.id || data.name) {
		where = {
			OR: [
				{
					id: data.id,
				},
				{
					name: { contains: data.name },
				},
			],
		};
	}

	try {
		const decorations = await prisma.decoration.findMany({
			skip: data.pageSize * (data.page - 1),
			take: data.pageSize + 1,
			where,
			select: {
				id: true,
				name: true,
				imageUrl: true,
			},
		});

		let nextPage = false;
		if (decorations.length > pageSize) {
			nextPage = true;
			decorations.pop();
		}

		return NextResponse.json(
			{ results: decorations.length, nextPage, decorations },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar obtener la decoracion',
			},
		);
	}
}
