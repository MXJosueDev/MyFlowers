-- CreateTable
CREATE TABLE `Flower` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Flower_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Decoration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Decoration_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `discount` DOUBLE NOT NULL DEFAULT -1,
    `categoryName` ENUM('CUMPLEANOS', 'PAREJAS', 'CONDOLENCIAS', 'GRADUACION', 'DETALLES', 'BODAS', 'ANIVERSARIOS') NOT NULL,
    `promotion` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `featureName` ENUM('home', 'masvendidos', 'ofertas', 'promociones') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `name` ENUM('CUMPLEANOS', 'PAREJAS', 'CONDOLENCIAS', 'GRADUACION', 'DETALLES', 'BODAS', 'ANIVERSARIOS') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Feature` (
    `name` ENUM('home', 'masvendidos', 'ofertas', 'promociones') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role` ENUM('ROOT', 'ADMIN') NOT NULL DEFAULT 'ADMIN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_FlowerToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FlowerToProduct_AB_unique`(`A`, `B`),
    INDEX `_FlowerToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_DecorationToProduct` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_DecorationToProduct_AB_unique`(`A`, `B`),
    INDEX `_DecorationToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryName_fkey` FOREIGN KEY (`categoryName`) REFERENCES `Category`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_featureName_fkey` FOREIGN KEY (`featureName`) REFERENCES `Feature`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FlowerToProduct` ADD CONSTRAINT `_FlowerToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Flower`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FlowerToProduct` ADD CONSTRAINT `_FlowerToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DecorationToProduct` ADD CONSTRAINT `_DecorationToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Decoration`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_DecorationToProduct` ADD CONSTRAINT `_DecorationToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
