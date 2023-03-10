/*
  Warnings:

  - You are about to drop the column `score` on the `Withdraw` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Withdraw` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Withdraw" DROP COLUMN "score",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Upload" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Upload_pkey" PRIMARY KEY ("id")
);
