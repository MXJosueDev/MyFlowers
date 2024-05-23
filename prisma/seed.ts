import { Categories, Features, PrismaClient } from '@prisma/client';

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

	for (const key in Features) {
		const featureName = key as FeatureKey;

		await prisma.feature.upsert({
			where: { name: featureName },
			update: {},
			create: { name: featureName },
		});
	}
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
