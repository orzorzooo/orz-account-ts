"use server";
import { db, users } from "@/lib/drizzle";
import type { Users, NewUser } from "@/lib/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const createUsers = async (user: NewUser) => {
  user.password = "123";
  try {
    const result = await db.insert(users).values(user);
    revalidatePath("/users");
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

export const deleteUser = async (user: Users) => {
  const result = await db.delete(users).where(eq(users.id, user.id));
  revalidatePath("/users");
};
