-- CreateTable
CREATE TABLE "PaddleWebhook" (
    "id" SERIAL NOT NULL,
    "alertName" TEXT NOT NULL,
    "rawPayload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PaddleWebhook_pkey" PRIMARY KEY ("id")
);
