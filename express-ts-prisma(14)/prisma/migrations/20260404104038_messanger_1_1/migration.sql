/*
  Warnings:

  - You are about to drop the `UserPreferences` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userPreferenceId]` on the table `Users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "UserPreferences" DROP CONSTRAINT "UserPreferences_userId_fkey";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "userPreferenceId" TEXT;

-- DropTable
DROP TABLE "UserPreferences";

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "emailUpdates" BOOLEAN NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userPreferenceId_key" ON "Users"("userPreferenceId");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_userPreferenceId_fkey" FOREIGN KEY ("userPreferenceId") REFERENCES "UserPreference"("id") ON DELETE SET NULL ON UPDATE CASCADE;
