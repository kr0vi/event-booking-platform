-- Update ORGANIZER users to HOST
UPDATE "users" SET "role" = 'HOST' WHERE "role" = 'ORGANIZER';
