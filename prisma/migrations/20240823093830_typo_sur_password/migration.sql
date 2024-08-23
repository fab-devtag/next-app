/*
  Warnings:

  - You are about to drop the column `hashedPassowrd` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `hashedPassowrd`,
    ADD COLUMN `hashedPassword` VARCHAR(191) NULL;
