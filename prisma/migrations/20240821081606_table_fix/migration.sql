/*
  Warnings:

  - Added the required column `restaurant_id` to the `PriceRange` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurant_id` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceRange" ADD COLUMN     "restaurant_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Status" ADD COLUMN     "restaurant_id" TEXT NOT NULL;
