import { prisma } from '@/_lib/prisma';
import { dataJsonDeserializer, isValidImageURL } from '@/utils/Utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/route';

const GetData = z.object({
	decorationId: z.number().min(1),
});

export async function GET(request: NextRequest) {
	const jsonData = await dataJsonDeserializer(request, 'GET');

	const parsedData = GetData.safeParse({
		decorationId: Number(jsonData.decorationId),
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
		const decoration = await prisma.decoration.findUnique({
			where: {
				id: data.decorationId,
			},
			include: {
				products: true,
			},
		});

		return NextResponse.json({ decoration }, { status: 200 });
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

const PostData = z.object({
	name: z.string(),
	imageUrl: z.string().url(),
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

	try {
		const decoration = await prisma.decoration.create({
			data: {
				name: data.name,
				imageUrl: data.imageUrl,
			},
		});

		return NextResponse.json({ decoration }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar registrar la decoracion',
			},
		);
	}
}

const PatchData = z.object({
	id: z.number().min(1),
	name: z.string().optional(),
	imageUrl: z.string().url().optional(),
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
		id: jsonData.decorationId,
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

	try {
		const decoration = await prisma.decoration.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				imageUrl: data.imageUrl,
			},
		});

		return NextResponse.json({ decoration }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar actualizar la decoracion',
			},
		);
	}
}

const DeleteData = z.object({
	decorationId: z.number().min(1),
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
		decorationId: jsonData.decorationId,
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
		const decoration = await prisma.decoration.delete({
			where: {
				id: data.decorationId,
			},
		});

		return NextResponse.json({ decoration }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText:
					'Ocurrio un error al intentar actualizar la decoracion',
			},
		);
	}
}
