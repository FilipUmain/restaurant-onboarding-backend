/*
  Warnings:

  - You are about to drop the column `restaurant_id` on the `PriceRange` table. All the data in the column will be lost.
  - You are about to drop the column `filter_ids` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `price_range_id` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `restaurant_id` on the `Status` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantId]` on the table `Status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantId` to the `Status` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceRange" DROP COLUMN "restaurant_id";

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "filter_ids",
DROP COLUMN "price_range_id",
ADD COLUMN     "priceRangeId" TEXT;

-- AlterTable
ALTER TABLE "Status" DROP COLUMN "restaurant_id",
ADD COLUMN     "restaurantId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RestaurantFilter" (
    "id" TEXT NOT NULL,
    "restaurantId" TEXT NOT NULL,
    "filterId" TEXT NOT NULL,

    CONSTRAINT "RestaurantFilter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RestaurantFilter_restaurantId_filterId_key" ON "RestaurantFilter"("restaurantId", "filterId");

-- CreateIndex
CREATE UNIQUE INDEX "Status_restaurantId_key" ON "Status"("restaurantId");

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_priceRangeId_fkey" FOREIGN KEY ("priceRangeId") REFERENCES "PriceRange"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantFilter" ADD CONSTRAINT "RestaurantFilter_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantFilter" ADD CONSTRAINT "RestaurantFilter_filterId_fkey" FOREIGN KEY ("filterId") REFERENCES "Filter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
