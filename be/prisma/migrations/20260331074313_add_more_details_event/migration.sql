/*
  Warnings:

  - Added the required column `posterImage` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "events" ADD COLUMN     "galleryImages" TEXT[],
ADD COLUMN     "highlights" TEXT[],
ADD COLUMN     "posterImage" TEXT NOT NULL,
ADD COLUMN     "thingsToKnow" TEXT[] DEFAULT ARRAY[]::TEXT[];
