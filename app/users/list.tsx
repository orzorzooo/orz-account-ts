"use client";
import type { Users } from "../../lib/drizzle";
import { deleteUser } from "./actions";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";
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

import anime from "animejs";

export function List({ allUsers }: any) {
  const [pending, setPending] = useState(false);
  async function onDelete(user: Users) {
    setPending(true);
    await deleteUser(user);
    setPending(false);
  }
  if (!allUsers) return false;
  useEffect(() => {
    const animation = anime({
      targets: ".orz-user-li",
      translateX: -10,
      delay: anime.stagger(100),
      opacity: 1,
    });
    animation.play();
  });
  return (
    <ul className="w-1/2">
      {allUsers.map((user: Users) => (
        <Link href={`users/${user.id}`} key={user.id}>
          <li className="flex justify-between items-center p-5 border  border-gray-200 my-3 rounded-xl -translate-y-8 opacity-0 orz-user-li">
            <div>{user.id}</div>
            <div className="font-bold text-xl">{user.name}</div>
            <div>{user.email}</div>
          </li>
        </Link>
      ))}
    </ul>
  );
}
