-- CreateIndex
CREATE INDEX "product_variants_productId_idx" ON "product_variants"("productId");

-- CreateIndex
CREATE INDEX "product_variants_inStock_idx" ON "product_variants"("inStock");

-- CreateIndex
CREATE INDEX "products_category_idx" ON "products"("category");

-- CreateIndex
CREATE INDEX "products_slug_idx" ON "products"("slug");

-- CreateIndex
CREATE INDEX "products_series_idx" ON "products"("series");

-- CreateIndex
CREATE INDEX "products_iphoneModel_idx" ON "products"("iphoneModel");

-- CreateIndex
CREATE INDEX "products_inStock_idx" ON "products"("inStock");

-- CreateIndex
CREATE INDEX "products_featured_idx" ON "products"("featured");

-- CreateIndex
CREATE INDEX "products_createdAt_idx" ON "products"("createdAt");
