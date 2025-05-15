/*
  Warnings:

  - You are about to drop the `PaddleWebhook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PaddleWebhook";

-- CreateTable
CREATE TABLE "customerCreated" (
    "id" TEXT NOT NULL,
    "userSessionId" TEXT NOT NULL,
    "customerCreatedId" TEXT NOT NULL,
    "rawPayload" TEXT NOT NULL,

    CONSTRAINT "customerCreated_pkey" PRIMARY KEY ("id")
);
