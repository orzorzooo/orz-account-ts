"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { createProfile } from "../actions";
import type { NewProfile } from "@/lib/drizzle";
const formSchema = z.object({
  bandname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string(),
  description: z.string().min(2),
});

let pending = false;

export default function CreateProfileForm({ user }: any) {
  const router = useRouter();
  const profile = user?.profile;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bandname: profile ? profile.bandname : "",
      phone: profile ? profile.phone : "",
      description: profile ? profile.description : "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: any) {
    values.user_id = user.id;
    console.log("data", values);
    pending = true;
    const result = await createProfile(values);
    console.log("success", result);
    pending = false;
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="bandname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>團隊名稱</FormLabel>
              <FormControl>
                <Input placeholder="填入姓名" {...field} />
              </FormControl>
              {/* <FormDescription>團隊名稱</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>團隊聯絡電話</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              {/* <FormDescription>填入聯絡信箱</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>團隊簡介</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." {...field} />
              </FormControl>
              {/* <FormDescription>填入聯絡信箱</FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <SubmitButton></SubmitButton> */}
        <Button type="submit" disabled={pending}>
          {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ""}
          {pending ? "Pending" : profile ? "Update" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
