/*
  Warnings:

  - You are about to drop the column `featureName` on the `product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_featureName_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `featureName`;

-- CreateTable
CREATE TABLE `_FeatureToProduct` (
    `A` ENUM('HOME', 'MASVENDIDOS', 'OFERTAS', 'PROMOCIONES') NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_FeatureToProduct_AB_unique`(`A`, `B`),
    INDEX `_FeatureToProduct_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_FeatureToProduct` ADD CONSTRAINT `_FeatureToProduct_A_fkey` FOREIGN KEY (`A`) REFERENCES `Feature`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_FeatureToProduct` ADD CONSTRAINT `_FeatureToProduct_B_fkey` FOREIGN KEY (`B`) REFERENCES `Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
