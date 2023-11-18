import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Use this object to send drizzle queries to your DB

export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    password: text("password").default("pass").notNull(),
    create_at: timestamp("create_at").defaultNow().notNull(),
  }
  // (users) => {
  //   return {
  //     uniqueIdx: uniqueIndex("unique_idx").on(users.email),
  //   };
  // }
);
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable(
  "posts",
  {
    id: serial("id").primaryKey(),
    user_id: integer("user_id")
      .notNull()
      .references(() => users.id),
    title: text("title").notNull(),
    content: text("content"),
    created_at: timestamp("created_at").defaultNow().notNull(),
  }
  // (posts) => {
  //   return {
  //     uniqueIdx: uniqueIndex("unique_idx").on(posts.id),
  //   };
  // }
);

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
}));

export const db = drizzle(sql, { schema: { posts, users, postsRelations, usersRelations } });
export type Users = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
