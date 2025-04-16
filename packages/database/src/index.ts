// Environment Variables
import * as dotenv from "dotenv";

// Drizzle ORM
import { drizzle } from "drizzle-orm/postgres-js";

// PostgreSQL
import postgres from "postgres";

// Schema
import {
  imageMimeTypeEnum,
  userRoleEnum,
  users,
  sessions,
  accounts,
  verifications,
  courses,
  artworks,
  images
} from "./schema";

dotenv.config();

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set in the environment variables");
}

// Create client
const client = postgres(connectionString, { prepare: false });

// Create database
export const database = drizzle(client);

// Export schema
export {
  users,
  sessions,
  accounts,
  verifications,
  courses,
  artworks,
  images
}

// Export types
export type User = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export type Session = typeof sessions.$inferSelect;
export type SessionInsert = typeof sessions.$inferInsert;

export type Account = typeof accounts.$inferSelect;
export type AccountInsert = typeof accounts.$inferInsert;

export type Verification = typeof verifications.$inferSelect;
export type VerificationInsert = typeof verifications.$inferInsert;

export type Course = typeof courses.$inferSelect;
export type CourseInsert = typeof courses.$inferInsert;

export type Artwork = typeof artworks.$inferSelect;
export type ArtworkInsert = typeof artworks.$inferInsert;

export type Image = typeof images.$inferSelect;
export type ImageInsert = typeof images.$inferInsert;

export type ImageMimeType = typeof imageMimeTypeEnum.enumValues[number];
export type UserRole = typeof userRoleEnum.enumValues[number];
