
> ahk-talent-bridge@0.1.0 db:sql
> prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "isMember" BOOLEAN NOT NULL DEFAULT false,
    "contactName" TEXT,
    "contactEmail" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "companyId" TEXT,
    "companyName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "seniority" TEXT NOT NULL,
    "languages" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "rawDescription" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "requirements" TEXT NOT NULL DEFAULT '[]',
    "structuredProfile" TEXT,
    "translations" TEXT,
    "demoMatch" TEXT,
    "matchNote" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "submittedLang" TEXT NOT NULL DEFAULT 'pt',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Job_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Talent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "city" TEXT,
    "linkedin" TEXT,
    "area" TEXT NOT NULL,
    "currentRole" TEXT,
    "seniority" TEXT NOT NULL,
    "yearsExperience" TEXT,
    "languages" TEXT NOT NULL DEFAULT '',
    "germanLevel" TEXT,
    "englishLevel" TEXT,
    "germanCompanyExperience" TEXT,
    "internationalExperience" TEXT,
    "relocation" TEXT,
    "workAuthorization" TEXT,
    "summary" TEXT,
    "cvUrl" TEXT,
    "cvFilename" TEXT,
    "rawInput" TEXT NOT NULL DEFAULT '',
    "structuredProfile" TEXT,
    "status" TEXT NOT NULL DEFAULT 'active',
    "submittedLang" TEXT NOT NULL DEFAULT 'pt',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Consent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "talentId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "granted" BOOLEAN NOT NULL DEFAULT false,
    "policyVersion" TEXT NOT NULL DEFAULT '2026-07',
    "grantedAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "revokedAt" DATETIME,
    CONSTRAINT "Consent_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "jobId" TEXT NOT NULL,
    "talentId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "justification" TEXT NOT NULL DEFAULT '',
    "gap" TEXT,
    "model" TEXT NOT NULL DEFAULT '',
    "promptVersion" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Match_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "Job" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Match_talentId_fkey" FOREIGN KEY ("talentId") REFERENCES "Talent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT,
    "action" TEXT NOT NULL,
    "actor" TEXT NOT NULL DEFAULT 'system',
    "detail" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "Job_status_idx" ON "Job"("status");

-- CreateIndex
CREATE INDEX "Talent_status_idx" ON "Talent"("status");

-- CreateIndex
CREATE INDEX "Talent_email_idx" ON "Talent"("email");

-- CreateIndex
CREATE INDEX "Consent_talentId_idx" ON "Consent"("talentId");

-- CreateIndex
CREATE INDEX "Match_jobId_idx" ON "Match"("jobId");

-- CreateIndex
CREATE INDEX "Match_score_idx" ON "Match"("score");

-- CreateIndex
CREATE UNIQUE INDEX "Match_jobId_talentId_key" ON "Match"("jobId", "talentId");

-- CreateIndex
CREATE INDEX "AuditLog_entityType_entityId_idx" ON "AuditLog"("entityType", "entityId");

