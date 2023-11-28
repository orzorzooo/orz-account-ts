"use server";
import { db, users, posts, profile_model } from "@/lib/drizzle";
import type { Users, NewUser, Profile, NewProfile } from "@/lib/drizzle";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const createUsers = async (user: NewUser) => {
  user.password = "123";
  try {
    const result = await db.insert(users).values(user);
    revalidatePath("/");
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

export const updateUser = async (user: Users, updateData: any) => {
  try {
    const result = await db.update(users).set(updateData).where(eq(users.id, user.id));
    return { status: true };
  } catch (error) {
    return { status: false };
  } finally {
    revalidatePath("/");
  }
};

export const deleteUser = async (user: Users) => {
  await db.delete(posts).where(eq(posts.user_id, user.id));
  await db.delete(users).where(eq(users.id, user.id));
  revalidatePath("/users");
  redirect("/users");
};

// onConflictDoUpdate target欄位在DB需有UNIQUE屬性
export const createProfile = async (profile: NewProfile) => {
  try {
    const result = await db.insert(profile_model).values(profile).onConflictDoUpdate({
      target: profile_model.user_id,
      set: profile,
    });
    console.log(result);
    revalidatePath("/");
    return { status: true };
  } catch (error) {
    console.log(error);
    return { status: false };
  }
};
