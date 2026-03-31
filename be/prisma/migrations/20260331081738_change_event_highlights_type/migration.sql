/*
  Warnings:

  - The `highlights` column on the `events` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "highlights",
ADD COLUMN     "highlights" JSONB[];
