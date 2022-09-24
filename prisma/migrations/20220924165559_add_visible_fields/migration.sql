/*
  Warnings:

  - Added the required column `visible` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `visible` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "visible" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "visible" BOOLEAN NOT NULL;
