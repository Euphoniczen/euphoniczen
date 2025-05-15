/*
  Warnings:

  - Added the required column `alertName` to the `customerCreated` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customerCreated" ADD COLUMN     "alertName" TEXT NOT NULL;
