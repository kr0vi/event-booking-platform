-- CreateEnum
CREATE TYPE "eventStatus" AS ENUM ('SOON', 'OPEN', 'CLOSED');

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "status" "eventStatus" NOT NULL DEFAULT 'OPEN',
ALTER COLUMN "date" SET DATA TYPE TEXT,
ALTER COLUMN "time" SET DATA TYPE TEXT;
