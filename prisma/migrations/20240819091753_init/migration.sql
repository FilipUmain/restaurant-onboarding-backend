/*
  Warnings:

  - You are about to drop the `filter` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "filter";

-- CreateTable
CREATE TABLE "Filter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Filter_pkey" PRIMARY KEY ("id")
);
