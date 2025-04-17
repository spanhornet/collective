import postgres from "postgres";
import { imageMimeTypeEnum, userRoleEnum, users, sessions, accounts, verifications, courses, artworks, images } from "./schema";
export declare const database: import("drizzle-orm/postgres-js").PostgresJsDatabase<Record<string, never>> & {
    $client: postgres.Sql<{}>;
};
export { users, sessions, accounts, verifications, courses, artworks, images };
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
//# sourceMappingURL=index.d.ts.map