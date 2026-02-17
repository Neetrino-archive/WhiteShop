import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as any;

// Ensure UTF-8 encoding for PostgreSQL connection
// This fixes encoding issues with Armenian and other UTF-8 characters
const databaseUrl = process.env.DATABASE_URL || '';
let urlWithEncoding = databaseUrl;

if (!databaseUrl.includes('client_encoding')) {
  urlWithEncoding = databaseUrl.includes('?') 
    ? `${databaseUrl}&client_encoding=UTF8`
    : `${databaseUrl}?client_encoding=UTF8`;
  
  // Temporarily override DATABASE_URL for Prisma Client
  process.env.DATABASE_URL = urlWithEncoding;
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({ 
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    errorFormat: "pretty",
  });

// Prisma Client connects automatically on first query (lazy connection)
// No need to call $connect() explicitly as it can cause issues in Next.js API routes
// Connection will be established automatically when the first database query is made

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

