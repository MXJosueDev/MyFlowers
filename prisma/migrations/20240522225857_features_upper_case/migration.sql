/*
  Warnings:

  - The primary key for the `feature` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The values [home,masvendidos,ofertas,promociones] on the enum `Feature_name` will be removed. If these variants are still used in the database, this will fail.
  - The values [home,masvendidos,ofertas,promociones] on the enum `Feature_name` will be removed. If these variants are still used in the database, this will fail.

*/
-- DropForeignKey
ALTER TABLE `product` DROP FOREIGN KEY `Product_featureName_fkey`;

-- AlterTable
ALTER TABLE `feature` DROP PRIMARY KEY,
    MODIFY `name` ENUM('HOME', 'MASVENDIDOS', 'OFERTAS', 'PROMOCIONES') NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AlterTable
ALTER TABLE `product` MODIFY `featureName` ENUM('HOME', 'MASVENDIDOS', 'OFERTAS', 'PROMOCIONES') NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_featureName_fkey` FOREIGN KEY (`featureName`) REFERENCES `Feature`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;
