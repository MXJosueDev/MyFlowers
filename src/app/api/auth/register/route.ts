import { prisma } from '@/_lib/prisma';
import { dataJsonDeserializer } from '@/utils/Utils';
import { Role } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { authOptions } from '../[...nextauth]/authOptions';

const PostData = z.object({
	username: z
		.string()
		.regex(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/),
	email: z.string().email(),
	password: z.string().min(6),
	role: z.string(),
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

	const rootUser = await prisma.user.findUnique({
		where: {
			email: session.user?.email ?? undefined,
		},
		select: {
			role: true,
		},
	});

	if (!rootUser) {
		return NextResponse.json(
			{},
			{
				status: 401,
				statusText: 'No existes en la base de datos',
			},
		);
	}

	if (rootUser.role !== Role.ROOT) {
		return NextResponse.json(
			{},
			{
				status: 401,
				statusText:
					'Necesitas ser un usuario ROOT para completar esta accion.',
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

	try {
		const usernameUser = await prisma.user.findUnique({
			where: {
				username: data.username,
			},
		});

		if (usernameUser) {
			NextResponse.json(
				{},
				{
					status: 400,
					statusText: 'Ese usuario ya está ocupado',
				},
			);
		}

		const emailUser = await prisma.user.findUnique({
			where: {
				email: data.email,
			},
		});

		if (emailUser) {
			NextResponse.json(
				{},
				{
					status: 400,
					statusText: 'Ese correo ya está registrado',
				},
			);
		}

		const hashedPassword = await bcrypt.hash(data.password, 10);

		const user = await prisma.user.create({
			data: {
				email: data.email,
				username: data.username,
				password: hashedPassword,
				role: data.role as Role,
			},
			select: {
				id: true,
				username: true,
				email: true,
			},
		});

		return NextResponse.json({ user }, { status: 200 });
	} catch (error) {
		return NextResponse.json(
			{ error },
			{
				status: 500,
				statusText: 'Ocurrio un error al intentar hacer el registro',
			},
		);
	}
}
