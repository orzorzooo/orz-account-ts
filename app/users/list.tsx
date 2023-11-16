"use client";
import type { Users } from "../../lib/drizzle";
import { deleteUser } from "./actions";
import { Button } from "../../components/ui/button";

export function List({ allUsers }: any) {
  function onDelete(user: Users) {
    deleteUser(user);
  }
  if (!allUsers) return false;

  return (
    <ul className="w-1/2">
      {allUsers.map((user: Users) => (
        <li className="flex justify-between p-5 border  border-gray-200 my-3 rounded-xl" key={user.id}>
          <div className="font-bold text-xl">{user.name}</div>
          <div>{user.email}</div>
          <Button
            onClick={() => {
              onDelete(user);
            }}
          >
            Delete
          </Button>
        </li>
      ))}
    </ul>
  );
}
