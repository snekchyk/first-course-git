-- CreateTable
CREATE TABLE "Admins" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "permission_level" INTEGER NOT NULL,

    CONSTRAINT "Admins_pkey" PRIMARY KEY ("id")
);
