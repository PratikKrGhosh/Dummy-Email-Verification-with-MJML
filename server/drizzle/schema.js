import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users_table", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  userName: varchar("user_name", { length: 255 }).notNull().unique(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});
