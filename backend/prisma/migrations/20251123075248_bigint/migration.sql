/*
  Warnings:

  - Changed the type of `createdAt` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "createdAt",
ADD COLUMN     "createdAt" BIGINT NOT NULL;
