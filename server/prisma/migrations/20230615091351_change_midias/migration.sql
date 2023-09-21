/*
  Warnings:

  - You are about to drop the `Music` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Video` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Music";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Video";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Midia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "editora" TEXT,
    "compositor" TEXT,
    "grupo" TEXT,
    "periodo" TEXT,
    "historia" TEXT,
    "capa" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Midia_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
