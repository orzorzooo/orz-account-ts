import Image from "next/image";
import FormExample from "@/components/formExample";
import { getUsers } from "@/lib/db/users";
import CreateUserForm from "./form";

export default async function Home() {
  const users = await getUsers();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Users page
        </p>
      </div>

      <div className="flex flex-row w-2/3 justify-between">
        <CreateUserForm></CreateUserForm>

        <ul>
          {users.map((user) => (
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
