-- CreateTable
CREATE TABLE "Certification" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "index" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "region" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Certification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Certification_index_key" ON "Certification"("index");
