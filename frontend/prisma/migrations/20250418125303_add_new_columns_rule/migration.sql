/*
  Warnings:

  - You are about to drop the column `description` on the `Rule` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Rule" DROP COLUMN "description",
ADD COLUMN     "labels" JSONB NOT NULL DEFAULT '{ "en": "No Smoking", "ka": "არ ვეწევით" }',
ADD COLUMN     "svg" TEXT NOT NULL DEFAULT '';
