import { prisma } from '@/_lib/prisma';
import { dataJsonDeserializer, isValidImageURL } from '@/utils/Utils';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authOptions } from '../auth/[...nextauth]/authOptions';

const GetData = z.object({
	flowerId: z.number().min(1),
});

export async function GET(request: NextRequest) {
	const jsonData = await dataJsonDeserializer(request, 'GET');

	const parsedData = GetData.safeParse({
		flowerId: Number(jsonData.flowerId),
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
		const flower = await prisma.flower.findUnique({
			where: {
				id: data.flowerId,
			},
			include: {
				products: true,
			},
		});

		return NextResponse.json({ flower }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: 'Ocurrio un error al intentar obtener la flor',
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
		const flower = await prisma.flower.create({
			data: {
				name: data.name,
				imageUrl: data.imageUrl,
			},
		});

		return NextResponse.json({ flower }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: 'Ocurrio un error al intentar registrar la flor',
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
		id: jsonData.flowerId,
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
		const flower = await prisma.flower.update({
			where: {
				id: data.id,
			},
			data: {
				name: data.name,
				imageUrl: data.imageUrl,
			},
		});

		return NextResponse.json({ flower }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: 'Ocurrio un error al intentar actualizar la flor',
			},
		);
	}
}

const DeleteData = z.object({
	flowerId: z.number().min(1),
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
		flowerId: jsonData.flowerId,
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
		const flower = await prisma.flower.delete({
			where: {
				id: data.flowerId,
			},
		});

		return NextResponse.json({ flower }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: 'Ocurrio un error al intentar actualizar la flor',
			},
		);
	}
}
