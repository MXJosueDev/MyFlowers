import { prisma } from '@/_lib/prisma';
import { dataJsonDeserializer } from '@/utils/Utils';
import { Categories, Features, Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const pageSize = 16;

const GetData = z.object({
	page: z.number().min(1),
	pageSize: z.number().min(1).max(50).default(pageSize),
	id: z.array(z.number().min(1)).max(100).optional(),
	minPrice: z.number().min(1).optional(),
	maxPrice: z.number().min(1).optional(),
	category: z.string().optional(),
	promotion: z.string().optional(),
	imageUrl: z.string().url().optional(),
	flowers: z.array(z.number()).optional(),
	decorations: z.array(z.number()).optional(),
	features: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
	const jsonData = await dataJsonDeserializer(request, 'GET');

	const parsedData = GetData.safeParse({
		page: Number(jsonData.page),
		pageSize: jsonData.pageSize && Number(jsonData.pageSize),
		id: jsonData.productId?.split(',').map((id: string) => {
			return Number(id);
		}),
		minPrice: jsonData.minPrice && Number(jsonData.minPrice),
		maxPrice: jsonData.maxPrice && Number(jsonData.maxPrice),
		category: jsonData.category,
		promotion: jsonData.promotion,
		flowers: jsonData.flowers?.split(',').map((id: string) => {
			return Number(id);
		}),
		decorations: jsonData.decorations?.split(',').map((id: string) => {
			return Number(id);
		}),
		features: jsonData.features?.split(','),
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

	const getIds: Prisma.ProductWhereInput[] | undefined = data.id?.map(
		productId => {
			return { id: productId };
		},
	);

	const getFlowers: Prisma.FlowerWhereInput[] | undefined = data.flowers?.map(
		flowerId => {
			return {
				id: flowerId,
			};
		},
	);

	const getDecorations: Prisma.DecorationWhereInput[] | undefined =
		data.decorations?.map(decorationId => {
			return {
				id: decorationId,
			};
		});

	const getFeatures: Prisma.FeatureWhereInput[] | undefined =
		data.features?.map(featuresName => {
			return {
				name: featuresName as Features,
			};
		});

	try {
		const products = await prisma.product.findMany({
			skip: data.pageSize * (data.page - 1),
			take: data.pageSize,
			where: {
				OR: getIds,
				price: { gte: data.minPrice, lte: data.maxPrice },
				categoryName: data.category as Categories,
				promotion: { contains: data.promotion },
				AND: [
					data.flowers
						? {
								flowers: {
									some: {
										AND: getFlowers,
									},
								},
							}
						: {},
					data.decorations
						? {
								decorations: {
									some: {
										AND: getDecorations,
									},
								},
							}
						: {},
					data.features
						? {
								features: {
									some: {
										AND: getFeatures,
									},
								},
							}
						: {},
				],
			},
			select: {
				id: true,
				categoryName: true,
				imageUrl: true,
				price: true,
				discount: true,
			},
		});

		return NextResponse.json(
			{ results: products.length, products },
			{ status: 200 },
		);
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: 'Ocurrio un error al intentar obtener el producto',
			},
		);
	}
}
