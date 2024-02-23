/*
  Warnings:

  - You are about to drop the column `nome` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `users` table. All the data in the column will be lost.
  - Added the required column `name` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "nome",
ADD COLUMN     "name" TEXT NOT NULL;
