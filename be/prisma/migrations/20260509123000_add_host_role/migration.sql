BEGIN;

-- Add the HOST variant to the Role enum
ALTER TYPE "Role" ADD VALUE 'HOST';

-- Update existing users with ORGANIZER role to HOST
UPDATE "users" SET "role" = 'HOST' WHERE "role" = 'ORGANIZER';

COMMIT;
