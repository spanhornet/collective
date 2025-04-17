"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.images = exports.artworks = exports.courses = exports.verifications = exports.accounts = exports.sessions = exports.users = exports.imageMimeTypeEnum = exports.userRoleEnum = void 0;
// Drizzle ORM
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
exports.userRoleEnum = (0, pg_core_1.pgEnum)("user_role", [
    "STUDENT",
    "TEACHER",
    "ADMINISTRATOR"
]);
exports.imageMimeTypeEnum = (0, pg_core_1.pgEnum)("image_mime_type", [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/tiff",
    "image/bmp",
    "image/heic",
    "image/heif",
    "image/avif"
]);
exports.users = (0, pg_core_1.pgTable)("users", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    name: (0, pg_core_1.text)("name").notNull(),
    firstName: (0, pg_core_1.text)("first_name").notNull(),
    lastName: (0, pg_core_1.text)("last_name").notNull(),
    email: (0, pg_core_1.varchar)("email").notNull(),
    emailVerified: (0, pg_core_1.boolean)("email_verified").notNull().default(false),
    phone: (0, pg_core_1.varchar)("phone").notNull(),
    role: (0, exports.userRoleEnum)("role").notNull().default("STUDENT"),
    image: (0, pg_core_1.text)("image"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.sessions = (0, pg_core_1.pgTable)("sessions", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    expiresAt: (0, pg_core_1.timestamp)("expires_at").notNull(),
    token: (0, pg_core_1.text)("token").notNull().unique(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
    ipAddress: (0, pg_core_1.text)("ip_address"),
    userAgent: (0, pg_core_1.text)("user_agent"),
});
exports.accounts = (0, pg_core_1.pgTable)("accounts", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    accountId: (0, pg_core_1.text)("account_id").notNull(),
    providerId: (0, pg_core_1.text)("provider_id").notNull(),
    userId: (0, pg_core_1.text)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    accessToken: (0, pg_core_1.text)("access_token"),
    refreshToken: (0, pg_core_1.text)("refresh_token"),
    idToken: (0, pg_core_1.text)("id_token"),
    accessTokenExpiresAt: (0, pg_core_1.timestamp)("access_token_expires_at"),
    refreshTokenExpiresAt: (0, pg_core_1.timestamp)("refresh_token_expires_at"),
    scope: (0, pg_core_1.text)("scope"),
    password: (0, pg_core_1.text)("password"),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.verifications = (0, pg_core_1.pgTable)("verifications", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    identifier: (0, pg_core_1.text)("identifier").notNull(),
    value: (0, pg_core_1.text)("value").notNull(),
    expiresAt: (0, pg_core_1.timestamp)("expires_at").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.courses = (0, pg_core_1.pgTable)("courses", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.artworks = (0, pg_core_1.pgTable)("artworks", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    courseId: (0, pg_core_1.text)("course_id").notNull().references(() => exports.courses.id, { onDelete: "cascade" }),
    title: (0, pg_core_1.text)("title").notNull(),
    description: (0, pg_core_1.text)("description").notNull(),
    author: (0, pg_core_1.text)("author").notNull(),
    images: (0, pg_core_1.text)("images").notNull().array().default((0, drizzle_orm_1.sql) `ARRAY[]::text[]`),
    periodTags: (0, pg_core_1.text)("period_tags").notNull().array().default((0, drizzle_orm_1.sql) `ARRAY[]::text[]`),
    typeTags: (0, pg_core_1.text)("type_tags").notNull().array().default((0, drizzle_orm_1.sql) `ARRAY[]::text[]`),
    collocation: (0, pg_core_1.text)("collocation"),
    link: (0, pg_core_1.text)("link"),
    order: (0, pg_core_1.integer)("order").notNull().default(0),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.images = (0, pg_core_1.pgTable)("images", {
    id: (0, pg_core_1.text)("id").primaryKey(),
    userId: (0, pg_core_1.text)("user_id").notNull().references(() => exports.users.id, { onDelete: "cascade" }),
    url: (0, pg_core_1.text)("url").notNull(),
    size: (0, pg_core_1.integer)("size"),
    mimeType: (0, exports.imageMimeTypeEnum)("mime_type").notNull(),
    createdAt: (0, pg_core_1.timestamp)("created_at").notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").notNull().defaultNow(),
});
exports.schema = {
    users: exports.users,
    sessions: exports.sessions,
    accounts: exports.accounts,
    verifications: exports.verifications,
    courses: exports.courses,
    artworks: exports.artworks,
    images: exports.images,
};
