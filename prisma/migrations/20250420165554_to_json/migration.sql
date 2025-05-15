/*
  Warnings:

  - Changed the type of `rawPayload` on the `customerCreated` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "customerCreated" DROP COLUMN "rawPayload",
ADD COLUMN     "rawPayload" JSONB NOT NULL;
