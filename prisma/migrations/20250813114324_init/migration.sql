-- CreateTable
CREATE TABLE "public"."ShortUrl" (
    "id" SERIAL NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "shortToken" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShortUrl_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_originalUrl_key" ON "public"."ShortUrl"("originalUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ShortUrl_shortToken_key" ON "public"."ShortUrl"("shortToken");
