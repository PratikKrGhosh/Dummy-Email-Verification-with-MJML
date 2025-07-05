import { relations, sql } from "drizzle-orm";
import {
  boolean,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const sessionTable = mysqlTable("session_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id),
  valid: boolean().default(true).notNull(),
  userAgent: text("user_agent").notNull(),
  ip: varchar("user_ip", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const verifyEmailTable = mysqlTable("verify_email_table", {
  id: int().autoincrement().primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => usersTable.id),
  valid: boolean().default(true).notNull(),
  token: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at")
    .default(sql`(CURRENT_TIMESTAMP + INTERVAL 15 MINUTE)`)
    .notNull(),
});

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  isVerified: boolean("email_verification").default(false).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});

export const usersTableRelation = relations(usersTable, ({ many }) => ({
  session: many(sessionTable),
  verifyEmail: many(verifyEmailTable),
}));

export const sessionTableRelation = relations(sessionTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [sessionTable.userId],
    references: [usersTable.id],
  }),
}));

export const verifyEmailTableRelation = relations(
  verifyEmailTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [verifyEmailTable.userId],
      references: [usersTable.id],
    }),
  })
);
