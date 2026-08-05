-- CreateEnum
CREATE TYPE "FakePaymentStatus" AS ENUM ('PENDING', 'SUCCEEDED', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "FakePayment" (
    "id" TEXT NOT NULL,
    "externalRef" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "status" "FakePaymentStatus" NOT NULL DEFAULT 'PENDING',
    "cardNumber" TEXT NOT NULL,
    "cardName" TEXT NOT NULL,
    "cardExpiry" TEXT NOT NULL,
    "cardCVV" TEXT NOT NULL,
    "description" TEXT,
    "metadata" JSONB,
    "failureReason" TEXT,
    "refundedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FakePayment_pkey" PRIMARY KEY ("id")
);
