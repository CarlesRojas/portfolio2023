/*
  Warnings:

  - You are about to drop the column `projectName` on the `ProjectDetails` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProjectDetails" DROP CONSTRAINT "ProjectDetails_projectName_fkey";

-- DropIndex
DROP INDEX "ProjectDetails_projectName_key";

-- AlterTable
ALTER TABLE "ProjectDetails" DROP COLUMN "projectName";

-- AddForeignKey
ALTER TABLE "ProjectDetails" ADD CONSTRAINT "ProjectDetails_name_fkey" FOREIGN KEY ("name") REFERENCES "Project"("name") ON DELETE CASCADE ON UPDATE CASCADE;
