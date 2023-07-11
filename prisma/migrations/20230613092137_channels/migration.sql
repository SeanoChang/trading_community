/*
  Warnings:

  - You are about to drop the column `channelId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `channelId` on the `User` table. All the data in the column will be lost.
  - Added the required column `postId` to the `Channel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Channel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_channelId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_channelId_fkey";

-- AlterTable
ALTER TABLE "Channel" ADD COLUMN     "postId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "channelId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "channelId";

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Channel" ADD CONSTRAINT "Channel_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
