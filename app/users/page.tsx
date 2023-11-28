import Image from "next/image";
import { db, models } from "@/lib/drizzle";
import CreateUserForm from "./form";
import { List } from "./list";

export default async function Home() {
  const allUsers = await db.select().from(models.users);
  if (!allUsers) return false;
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="font-bold text-3xl">User page</div>
      <div className="flex flex-row w-full justify-around">
        <div className="border border-gray-200 rounded-xl p-10 w-1/3 ">
          <CreateUserForm></CreateUserForm>
        </div>
        <List allUsers={allUsers}></List>
      </div>
    </main>
  );
}
