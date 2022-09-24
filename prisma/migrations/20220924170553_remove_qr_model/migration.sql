/*
  Warnings:

  - You are about to drop the column `qrCodeUrl` on the `ProjectDetails` table. All the data in the column will be lost.
  - You are about to drop the `QrCode` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectDetails" DROP CONSTRAINT "ProjectDetails_qrCodeUrl_fkey";

-- DropIndex
DROP INDEX "ProjectDetails_qrCodeUrl_key";

-- AlterTable
ALTER TABLE "ProjectDetails" DROP COLUMN "qrCodeUrl",
ADD COLUMN     "qrCode" TEXT;

-- DropTable
DROP TABLE "QrCode";
