import { integer, pgTable, serial, text, timestamp, uniqueIndex, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").default("pass").notNull(),
  create_at: timestamp("create_at").defaultNow().notNull(),
});
export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  content: text("content"),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
}));

export const profile = pgTable(
  "profiles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    user_id: integer("user_id")
      .unique()
      .notNull()
      .references(() => users.id),
    bandname: text("bandname").notNull(),
    phone: text("phone"),
    description: text("description"),
  },
  (profile_model) => {
    return {
      uniqueIndex: uniqueIndex("unique_idx").on(profile_model.user_id),
    };
  }
);

export const usersProfileRelations = relations(users, ({ one }) => ({
  profile: one(profile),
}));

export const profileUserRelations = relations(profile, ({ one }) => ({
  user: one(users, {
    fields: [profile.user_id],
    references: [users.id],
  }),
}));

export type Users = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
