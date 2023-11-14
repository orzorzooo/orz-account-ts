import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);
// Create a pgTable that maps to a table in your DB
console.log({
  POSTGRES_URL: process.env.POSTGRES_URL,
  POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
});

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

type NewUser = typeof users.$inferInsert;
export const getUsers = async () => {
  const result = await db.select().from(users);
  console.log("Results", result);
  return result;
};

export const createUsers = async (user: NewUser) => {
  const result = await db.insert(users).values(user);
  console.log("result", result);
  return result;
  // const result = await db.
};
