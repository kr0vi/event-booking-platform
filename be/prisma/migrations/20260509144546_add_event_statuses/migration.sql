/*
  Warnings:

  - The values [SOON,OPEN,CLOSED] on the enum `eventStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "eventStatus_new" AS ENUM ('COMPLETED', 'CANCELLED', 'DRAFT', 'PUBLISHED');
ALTER TABLE "events" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "events" ALTER COLUMN "status" TYPE "eventStatus_new" USING ("status"::text::"eventStatus_new");
ALTER TYPE "eventStatus" RENAME TO "eventStatus_old";
ALTER TYPE "eventStatus_new" RENAME TO "eventStatus";
DROP TYPE "eventStatus_old";
ALTER TABLE "events" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;

-- AlterTable
ALTER TABLE "events" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
