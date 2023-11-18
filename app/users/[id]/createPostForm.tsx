"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import * as z from "zod";

export default function CreatFormPost() {
  let pending = false;
  const formSchema = z.object({
    title: z.string().min(1, {
      message: "標題為必填",
    }),
    content: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // name: user ? user.name : "",
      // email: user ? user.email : "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    pending = true;
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="填入姓名" {...field} />
              </FormControl>
              <FormDescription>標題</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Type your message here." />
              </FormControl>
              <FormDescription>填入內容</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* <SubmitButton></SubmitButton> */}
        <Button type="submit" disabled={pending}>
          {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ""}
          {pending ? "pending" : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
