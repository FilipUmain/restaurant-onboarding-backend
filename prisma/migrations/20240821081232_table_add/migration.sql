-- CreateTable
CREATE TABLE "Status" (
    "id" TEXT NOT NULL,
    "is_currently_open" BOOLEAN NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PriceRange" (
    "id" TEXT NOT NULL,
    "range" TEXT NOT NULL,

    CONSTRAINT "PriceRange_pkey" PRIMARY KEY ("id")
);
