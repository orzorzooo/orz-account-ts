"use server";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { db, users } from "@/lib/db/users";

type NewUser = typeof users.$inferInsert;

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
});

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues: {
    name: "",
    email: "",
  },
});

export const createUsers = async (user: NewUser) => {
  const result = await db.insert(users).values(user);
  console.log("result", result);
  return { message: result };
  // const result = await db.
};

export async function onSubmit(values: any) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  // console.log(values);
  const value = {
    name: "cc",
    email: "fc@gmail.com",
    password: "bb",
  };

  const result = await createUsers(values);
}
