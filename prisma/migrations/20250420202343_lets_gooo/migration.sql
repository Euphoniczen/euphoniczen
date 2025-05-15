/*
  Warnings:

  - You are about to drop the column `alertName` on the `CustomerCreated` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerCreated" DROP COLUMN "alertName",
ADD COLUMN     "eventType" TEXT;
