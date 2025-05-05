/*
  Warnings:

  - You are about to drop the column `alertName` on the `PaddleWebhook` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `PaddleWebhook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaddleWebhook" DROP COLUMN "alertName",
ADD COLUMN     "eventType" TEXT NOT NULL;
