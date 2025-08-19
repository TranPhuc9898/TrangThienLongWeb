/*
  Warnings:

  - You are about to drop the column `images` on the `product_variants` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "product_colors" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "color" TEXT NOT NULL,
    "images" JSONB NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "product_colors_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_product_variants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storage" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "price" BIGINT NOT NULL,
    "image" TEXT NOT NULL,
    "inStock" BOOLEAN NOT NULL DEFAULT true,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_variants" ("color", "createdAt", "id", "image", "inStock", "price", "productId", "quantity", "storage", "updatedAt") SELECT "color", "createdAt", "id", "image", "inStock", "price", "productId", "quantity", "storage", "updatedAt" FROM "product_variants";
DROP TABLE "product_variants";
ALTER TABLE "new_product_variants" RENAME TO "product_variants";
CREATE UNIQUE INDEX "product_variants_productId_storage_color_key" ON "product_variants"("productId", "storage", "color");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "product_colors_productId_color_key" ON "product_colors"("productId", "color");
