"use client";
import { Button } from "@/components/ui/button";
import { db, users } from "@/lib/drizzle";
import { deleteUser } from "../actions";
import { useState } from "react";
import type { Users } from "@/lib/drizzle";
import { redirect, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function DeleteButton({ user }: { user: Users }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  async function onDelete(user: Users) {
    console.log(user);
    setPending(true);
    try {
      await deleteUser(user);
      // redirect("/users");
    } catch (error) {}
    setPending(false);
    // router.push("/users");
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your data from our
            servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onDelete(user);
            }}
          >
            {pending ? "pending" : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
