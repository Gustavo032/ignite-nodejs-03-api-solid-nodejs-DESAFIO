/*
  Warnings:

  - Added the required column `category` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" ADD COLUMN     "category" TEXT NOT NULL;
