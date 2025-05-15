/*
  Warnings:

  - You are about to drop the column `priceId` on the `SubscriptionData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubscriptionData" DROP COLUMN "priceId",
ADD COLUMN     "subscriptionId" TEXT;
