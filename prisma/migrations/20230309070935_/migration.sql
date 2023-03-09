/*
  Warnings:

  - You are about to drop the column `address` on the `Address` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[publicKey]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[privateKey]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `privateKey` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publicKey` to the `Address` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Address_address_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "address",
ADD COLUMN     "privateKey" TEXT NOT NULL,
ADD COLUMN     "publicKey" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Address_publicKey_key" ON "Address"("publicKey");

-- CreateIndex
CREATE UNIQUE INDEX "Address_privateKey_key" ON "Address"("privateKey");
