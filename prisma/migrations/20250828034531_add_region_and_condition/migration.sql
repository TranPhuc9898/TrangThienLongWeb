-- AlterTable
ALTER TABLE "products" ADD COLUMN "regionCode" TEXT;
ALTER TABLE "products" ADD COLUMN "series" TEXT;
ALTER TABLE "products" ADD COLUMN "tag" TEXT;

-- CreateTable
CREATE TABLE "region_prices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "regionCode" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "region_prices_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "region_prices_productId_regionCode_key" ON "region_prices"("productId", "regionCode");
