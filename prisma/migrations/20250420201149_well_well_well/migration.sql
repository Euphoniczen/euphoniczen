/*
  Warnings:

  - You are about to drop the `customerCreated` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "customerCreated";

-- CreateTable
CREATE TABLE "CustomerCreated" (
    "id" TEXT NOT NULL,
    "customerCreatedId" TEXT,
    "customerCreatedEmail" TEXT,
    "alertName" TEXT,
    "rawPayload" JSONB,

    CONSTRAINT "CustomerCreated_pkey" PRIMARY KEY ("id")
);
