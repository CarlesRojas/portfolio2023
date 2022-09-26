/*
  Warnings:

  - A unique constraint covering the columns `[sectionName,position]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Project_name_position_key";

-- CreateIndex
CREATE UNIQUE INDEX "Project_sectionName_position_key" ON "Project"("sectionName", "position");
