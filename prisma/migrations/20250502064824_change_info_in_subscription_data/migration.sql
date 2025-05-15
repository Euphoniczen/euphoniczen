/*
  Warnings:

  - You are about to drop the column `status` on the `SubscriptionData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SubscriptionData" DROP COLUMN "status",
ADD COLUMN     "subscriptionStatus" TEXT;
