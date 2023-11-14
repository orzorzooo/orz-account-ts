import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
// Use this object to send drizzle queries to your DB

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").default("pass").notNull(),
    create_at: timestamp("create_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  }
);

export const db = drizzle(sql);
export type Users = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
