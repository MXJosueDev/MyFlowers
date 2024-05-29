import { prisma } from '@/_lib/prisma';
import { dataJsonDeserializer, isValidImageURL } from '@/utils/Utils';
import { Categories, Features, Prisma } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/authOptions';

const GetData = z.object({
	productId: z.number().min(1),
});

export async function GET(request: NextRequest) {
	const jsonData = await dataJsonDeserializer(request, 'GET');

	const parsedData = GetData.safeParse({
		productId: Number(jsonData.productId),
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

	try {
		const product = await prisma.product.findUnique({
			where: {
				id: data.productId,
			},
			include: {
				category: true,
				decorations: true,
				features: true,
				flowers: true,
			},
		});

		return NextResponse.json({ product }, { status: 200 });
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

const PostData = z.object({
	price: z.number().min(1),
	discount: z.number(),
	category: z.string(),
	promotion: z.string().optional(),
	imageUrl: z.string().url(),
	flowers: z.array(z.number()),
	decorations: z.array(z.number()),
	features: z.array(z.string()),
});

export async function POST(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json(
			{},
			{
				status: 401,
				statusText: 'Necesitas autenticarte para completar esta accion',
			},
		);
	}

	const jsonData = await dataJsonDeserializer(request, 'POST');

	const parsedData = PostData.safeParse({
		...jsonData,
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

	if (data.price <= data.discount) {
		return NextResponse.json(
			{},
			{
				status: 400,
				statusText: 'El descuento no puede ser mayor que el precio',
			},
		);
	}

	if (!(await isValidImageURL(data.imageUrl))) {
		return NextResponse.json(
			{},
			{
				status: 400,
				statusText:
					'La URL de imagen que proporcionaste no es correcta',
			},
		);
	}

	const flowers: Prisma.FlowerWhereUniqueInput[] = data.flowers.map(
		flower => {
			return { id: flower };
		},
	);

	const decorations: Prisma.DecorationWhereUniqueInput[] =
		data.decorations.map(decoration => {
			return { id: decoration };
		});

	const features: Prisma.FeatureWhereUniqueInput[] = data.features.map(
		feature => {
			return { name: Features[feature as keyof typeof Features] };
		},
	);

	if (data.promotion && data.promotion !== '') {
		features.push({ name: 'PROMOCIONES' });
	}

	if (data.discount >= 1) {
		features.push({ name: 'OFERTAS' });
	}

	try {
		const product = await prisma.product.create({
			data: {
				price: data.price,
				discount: data.discount,
				category: {
					connect: {
						name: data.category as Categories,
					},
				},
				promotion: data.promotion,
				imageUrl: data.imageUrl,
				flowers: {
					connect: flowers,
				},
				features: {
					connect: features,
				},
				decorations: {
					connect: decorations,
				},
			},
			include: {
				flowers: true,
				decorations: true,
				features: true,
			},
		});

		return NextResponse.json({ product }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar registrar el producto',
			},
		);
	}
}

const PatchData = z.object({
	id: z.number().min(1),
	price: z.number().min(1).optional(),
	discount: z.number().optional(),
	category: z.string().optional(),
	promotion: z.string().optional(),
	imageUrl: z.string().url().optional(),
	flowers: z.array(z.number()).optional(),
	decorations: z.array(z.number()).optional(),
	features: z.array(z.string()).optional(),
});

export async function PATCH(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json(
			{},
			{
				status: 401,
				statusText: 'Necesitas autenticarte para completar esta accion',
			},
		);
	}

	const jsonData = await dataJsonDeserializer(request, 'POST');

	const parsedData = PatchData.safeParse({
		id: jsonData.productId,
		...jsonData,
		/* id: jsonData.productId,
		price: jsonData.price ? Number(jsonData.price) : undefined,
		discount: jsonData.discount ? Number(jsonData.discount) : undefined,
		category: jsonData.category,
		promotion: jsonData.promotion ?? undefined,
		imageUrl: jsonData.imageUrl ?? undefined,
		flowers: jsonData.flowers ?? undefined,
		decorations: jsonData.decorations ?? undefined,
		features: jsonData.features ?? undefined, */
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

	if (data.imageUrl && !(await isValidImageURL(data.imageUrl))) {
		return NextResponse.json(
			{},
			{
				status: 400,
				statusText:
					'La URL de imagen que proporcionaste no es correcta',
			},
		);
	}

	const patchCategory: any = data.category
		? { connect: { name: data.category } }
		: undefined;

	const patchFlowers: any = data.flowers
		? {
				set: data.flowers.map(flower => {
					return {
						id: flower,
					};
				}),
			}
		: undefined;

	const patchDecorations: any = data.decorations
		? {
				set: data.decorations.map(decoration => {
					return {
						id: decoration,
					};
				}),
			}
		: undefined;

	console.log(data.features);

	const features = data.features ?? [];

	if (data.promotion && data.promotion !== '') {
		features.push('PROMOCIONES');
	}

	if (data.discount && data.discount >= 1) {
		features.push('OFERTAS');
	}

	const patchFeatures: any = data.features
		? {
				set: data.features.map(feature => {
					return {
						name: feature,
					};
				}),
			}
		: undefined;

	try {
		const product = await prisma.product.update({
			where: {
				id: data.id,
			},
			data: {
				price: data.price,
				discount: data.discount,
				category: patchCategory,
				promotion: data.promotion,
				imageUrl: data.imageUrl,
				flowers: patchFlowers,
				decorations: patchDecorations,
				features: patchFeatures,
			},
			include: {
				flowers: true,
				decorations: true,
				features: true,
			},
		});

		return NextResponse.json({ product }, { status: 200 });
	} catch (error: any) {
		return NextResponse.json(
			{ error, message: error.message },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar actualizar el producto',
			},
		);
	}
}

const DeleteData = z.object({
	productId: z.number().min(1),
});

export async function DELETE(request: NextRequest) {
	const session = await getServerSession(authOptions);

	if (!session?.user) {
		return NextResponse.json(
			{},
			{
				status: 401,
				statusText: 'Necesitas autenticarte para completar esta accion',
			},
		);
	}

	const jsonData = await dataJsonDeserializer(request, 'POST');

	const parsedData = DeleteData.safeParse({
		productId: jsonData.productId,
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

	try {
		const product = await prisma.product.delete({
			where: {
				id: data.productId,
			},
		});

		return NextResponse.json({ product }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar actualizar el producto',
			},
		);
	}
}
