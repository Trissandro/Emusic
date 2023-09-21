/*
  Warnings:

  - Added the required column `seguidores` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seguindo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passe" TEXT NOT NULL,
    "admin" TEXT NOT NULL,
    "seguidores" INTEGER NOT NULL,
    "seguindo" INTEGER NOT NULL
);
INSERT INTO "new_User" ("admin", "email", "id", "name", "passe") SELECT "admin", "email", "id", "name", "passe" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
