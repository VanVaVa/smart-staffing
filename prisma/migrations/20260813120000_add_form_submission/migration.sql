CREATE TYPE "FormSubmissionType" AS ENUM ('contact', 'partnership', 'vacancy', 'book');

CREATE TABLE "FormSubmission" (
    "id" TEXT NOT NULL,
    "type" "FormSubmissionType" NOT NULL,
    "channel" TEXT,
    "contactValue" TEXT NOT NULL,
    "fullName" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT true,
    "sourcePath" TEXT NOT NULL,
    "sourceLabel" TEXT,
    "vacancyId" TEXT,
    "resumeStoragePath" TEXT,
    "resumeOriginalName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FormSubmission_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "FormSubmission_type_createdAt_idx" ON "FormSubmission"("type", "createdAt" DESC);
