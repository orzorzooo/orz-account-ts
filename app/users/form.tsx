"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { createUsers, updateUser } from "./actions";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
});

let pending = false;

export default function CreateUserForm({ user }: any) {
  const router = useRouter();
  // 1. Define your form.

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user ? user.name : "",
      email: user ? user.email : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    pending = true;
    if (!user) {
      const result = await createUsers(values);
      console.log("success", result);
    } else {
      const result = await updateUser(user, values);
      console.log("success", result);
      router.push("/users");
    }
    pending = false;
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="填入姓名" {...field} />
              </FormControl>
              <FormDescription>使用者姓名</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>填入聯絡信箱</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <SubmitButton></SubmitButton> */}
        <Button type="submit" disabled={pending}>
          {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ""}
          {pending ? "Pending" : user ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
