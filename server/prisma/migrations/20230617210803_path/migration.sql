/*
  Warnings:

  - Added the required column `path` to the `Midia` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Midia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT,
    "compositor" TEXT,
    "grupo" TEXT,
    "periodo" TEXT,
    "historia" TEXT,
    "capa" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Midia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Midia" ("autor", "capa", "compositor", "editora", "grupo", "historia", "id", "periodo", "tipo", "titulo", "userId") SELECT "autor", "capa", "compositor", "editora", "grupo", "historia", "id", "periodo", "tipo", "titulo", "userId" FROM "Midia";
DROP TABLE "Midia";
ALTER TABLE "new_Midia" RENAME TO "Midia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
