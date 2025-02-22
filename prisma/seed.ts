import { Categories, Features, PrismaClient } from '@prisma/client';
import { z } from 'zod';
import bcrypt from 'bcrypt';

const prisma: PrismaClient = new PrismaClient();

type CategoryKey = keyof typeof Categories;
type FeatureKey = keyof typeof Features;

async function main() {
	// Register the defined categories and features
	for (const key in Categories) {
		const categoryName = key as CategoryKey;

		await prisma.category.upsert({
			where: { name: categoryName },
			update: {},
			create: { name: categoryName },
		});
	}

	console.log('Categories registered');

	for (const key in Features) {
		const featureName = key as FeatureKey;

		await prisma.feature.upsert({
			where: { name: featureName },
			update: {},
			create: { name: featureName },
		});
	}

	console.log('Features registered');

	const testFlower = await prisma.flower.upsert({
		where: {
			name: 'Test Flower',
		},
		update: {},
		create: {
			name: 'Test Flower',
			imageUrl: '/image/flower.png',
		},
	});

	console.log('Test Flower registered', testFlower);

	const testDecoration = await prisma.decoration.upsert({
		where: {
			name: 'Test Decoration',
		},
		update: {},
		create: {
			name: 'Test Decoration',
			imageUrl: '/image/decoration.png',
		},
	});

	console.log('Test Decoration registered', testDecoration);

	const testflower = await prisma.product.upsert({
		where: {
			id: 1,
		},
		update: {},
		create: {
			price: 100,
			discount: -1,
			category: {
				connect: {
					name: Categories.CUMPLEANOS,
				},
			},
			promotion: '',
			imageUrl: '/image/flower.png',
			flowers: {
				connect: {
					name: 'Test flower',
				},
			},
			features: {
				connect: {
					name: Features.HOME,
				},
			},
		},
	});

	console.log('Test flower registered', testflower);

	const rootUserSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const rootUserData = rootUserSchema.parse({
		email: process.env.ROOT_EMAIL,
		password: process.env.ROOT_PASSWORD,
	});

	const hashedPassword = await bcrypt.hash(rootUserData.password, 10);

	await prisma.user.upsert({
		where: {
			username: 'root',
		},
		create: {
			username: 'root',
			email: rootUserData.email,
			password: hashedPassword,
			role: 'ROOT',
		},
		update: {
			email: rootUserData.email,
			password: hashedPassword,
			role: 'ROOT',
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
