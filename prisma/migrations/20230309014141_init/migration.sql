-- CreateTable
CREATE TABLE "Address" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" SERIAL NOT NULL,
    "from" TEXT NOT NULL,
    "fromId" INTEGER NOT NULL,
    "to" TEXT NOT NULL,
    "toId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EarnRecord" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "EarnRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_key" ON "Address"("address");
