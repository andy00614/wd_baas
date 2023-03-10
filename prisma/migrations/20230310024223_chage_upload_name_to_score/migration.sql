/*
  Warnings:

  - You are about to drop the `Upload` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Upload";

-- CreateTable
CREATE TABLE "Score" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);
