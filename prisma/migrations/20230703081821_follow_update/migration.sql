/*
  Warnings:

  - A unique constraint covering the columns `[userEmail]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userEmail]` on the table `Following` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followerId` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerName` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingId` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingName` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userEmail` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "followerId" TEXT NOT NULL,
ADD COLUMN     "followerName" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "followingId" TEXT NOT NULL,
ADD COLUMN     "followingName" TEXT NOT NULL,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Goal" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "goalType" TEXT NOT NULL,
    "goal" TEXT NOT NULL,

    CONSTRAINT "Goal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slug" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "winloss" TEXT NOT NULL,
    "roi" INTEGER NOT NULL,

    CONSTRAINT "Trade_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Goal_slug_key" ON "Goal"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Trade_slug_key" ON "Trade"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_userEmail_key" ON "Follower"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Following_userEmail_key" ON "Following"("userEmail");

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trade" ADD CONSTRAINT "Trade_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
