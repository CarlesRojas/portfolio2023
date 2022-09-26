/*
  Warnings:

  - A unique constraint covering the columns `[name,position]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[position]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_name_position_key" ON "Project"("name", "position");

-- CreateIndex
CREATE UNIQUE INDEX "Section_position_key" ON "Section"("position");
