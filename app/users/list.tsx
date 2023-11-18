"use client";
import type { Users } from "../../lib/drizzle";
import { deleteUser } from "./actions";
import { Button } from "../../components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export function List({ allUsers }: any) {
  const [pending, setPending] = useState(false);
  async function onDelete(user: Users) {
    setPending(true);
    await deleteUser(user);
    setPending(false);
  }
  if (!allUsers) return false;

  return (
    <ul className="w-1/2">
      {allUsers.map((user: Users) => (
        <Link href={`users/${user.id}`} key={user.id}>
          <li className="flex justify-between items-center p-5 border  border-gray-200 my-3 rounded-xl">
            <div>{user.id}</div>

            <div className="font-bold text-xl">{user.name}</div>
            <div>{user.email}</div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Delete</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>確認操作?</DialogTitle>
                  <DialogDescription>這個操作無法還原，會將資料從資料庫完全刪除</DialogDescription>
                </DialogHeader>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button disabled={pending} type="button">
                      Close
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={pending}
                    variant={"destructive"}
                    onClick={() => {
                      onDelete(user);
                    }}
                  >
                    {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : ""}
                    確定刪除
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </li>
        </Link>
      ))}
    </ul>
  );
}
