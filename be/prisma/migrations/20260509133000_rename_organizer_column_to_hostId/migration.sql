BEGIN;

-- Rename column organizerId to hostId on events table
ALTER TABLE "events" RENAME COLUMN "organizerId" TO "hostId";

-- Rename foreign key constraint if it exists
ALTER TABLE "events" RENAME CONSTRAINT "events_organizerId_fkey" TO "events_hostId_fkey";

COMMIT;
