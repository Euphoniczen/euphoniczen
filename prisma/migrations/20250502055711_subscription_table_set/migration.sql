-- CreateTable
CREATE TABLE "SubscriptionData" (
    "id" TEXT NOT NULL,
    "priceId" TEXT,
    "subscriptionName" TEXT,
    "status" TEXT,
    "subscriberEmail" TEXT,
    "rawPaylod" JSONB,

    CONSTRAINT "SubscriptionData_pkey" PRIMARY KEY ("id")
);
