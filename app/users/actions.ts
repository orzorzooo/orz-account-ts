"use server";
import { db, models } from "@/lib/drizzle";
// import { users, posts, profile_model } from "@/lib/schema";
import type { Users, NewUser, Profile, NewProfile } from "@/lib/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const createUsers = async (user: NewUser) => {
  user.password = "123";
  try {
    const result = await db.insert(models.users).values(user);
    revalidatePath("/");
    return { status: true };
  } catch (error) {
    return { status: false };
  }
};

export const updateUser = async (user: Users, updateData: any) => {
  try {
    const result = await db.update(models.users).set(updateData).where(eq(models.users.id, user.id));
    return { status: true };
  } catch (error) {
    return { status: false };
  } finally {
    revalidatePath("/");
  }
};

export const deleteUser = async (user: Users) => {
  await db.delete(models.posts).where(eq(models.posts.user_id, user.id));
  await db.delete(models.users).where(eq(models.users.id, user.id));
  revalidatePath("/users");
  redirect("/users");
};

// onConflictDoUpdate target欄位在DB需有UNIQUE屬性
export const createProfile = async (profile: NewProfile) => {
  try {
    const result = await db.insert(models.profile).values(profile).onConflictDoUpdate({
      target: models.profile.user_id,
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
