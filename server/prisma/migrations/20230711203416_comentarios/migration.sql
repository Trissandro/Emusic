-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "coment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "midiaId" TEXT NOT NULL,
    CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment_midiaId_fkey" FOREIGN KEY ("midiaId") REFERENCES "Midia" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
