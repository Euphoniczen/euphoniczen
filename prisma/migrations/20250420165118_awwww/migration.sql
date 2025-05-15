/*
  Warnings:

  - You are about to drop the column `userSessionId` on the `customerCreated` table. All the data in the column will be lost.
  - Added the required column `customerCreatedEmail` to the `customerCreated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customerCreated" DROP COLUMN "userSessionId",
ADD COLUMN     "customerCreatedEmail" TEXT NOT NULL;
