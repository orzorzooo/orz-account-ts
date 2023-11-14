"use server";
// import { db, users } from "@/lib/db/users";
import { db, users } from "@/lib/drizzle";
import type { Users, NewUser } from "@/lib/drizzle";

export const createUsers = async (user: NewUser) => {
  user.password = "123";
  console.log(user);
  const result = await db.insert(users).values(user);
  console.log("result", result);
};
