-- AlterTable
ALTER TABLE "customerCreated" ALTER COLUMN "customerCreatedId" DROP NOT NULL,
ALTER COLUMN "customerCreatedEmail" DROP NOT NULL,
ALTER COLUMN "rawPayload" DROP NOT NULL,
ALTER COLUMN "alertName" DROP NOT NULL;
