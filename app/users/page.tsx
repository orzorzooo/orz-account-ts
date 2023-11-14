import Image from "next/image";
// import { getUsers } from "@/lib/db/users";
import { db, users } from "@/lib/drizzle";
import CreateUserForm from "./form";
import { createUsers } from "./actions";

export default async function Home() {
  const allUsers = await db.select().from(users);
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="font-bold text-3xl">User page</div>
      <div className="flex flex-row w-2/3 justify-between">
        <CreateUserForm createUsers={createUsers}></CreateUserForm>
        <ul>
          {allUsers.map((user) => (
            <>
              <div key={user.id}>{user.name}</div>
              <div>{user.email}</div>
            </>
          ))}
        </ul>
      </div>
    </main>
  );
}
