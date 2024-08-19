-- CreateTable
CREATE TABLE "Restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "filter_ids" TEXT[],
    "image_url" TEXT NOT NULL,
    "delivery_time_minutes" INTEGER NOT NULL,
    "price_range_id" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);
