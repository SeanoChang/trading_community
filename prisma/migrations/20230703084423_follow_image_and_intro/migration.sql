/*
  Warnings:

  - Added the required column `followerImage` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followerIntro` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingImage` to the `Following` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followingIntro` to the `Following` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "followerImage" TEXT NOT NULL,
ADD COLUMN     "followerIntro" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Following" ADD COLUMN     "followingImage" TEXT NOT NULL,
ADD COLUMN     "followingIntro" TEXT NOT NULL;
