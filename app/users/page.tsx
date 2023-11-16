import Image from "next/image";
import { db, users } from "@/lib/drizzle";
import CreateUserForm from "./form";
import { createUsers, deleteUser } from "./actions";
import { List } from "./list";

// async function List() {
//   async function onDelete(user: Users) {
//     await deleteUser(user);
//   }
//   const allUsers = await db.select().from(users);

//   return (
//     <ul className="w-1/2">
//       {allUsers.map((user) => (
//         <li className="flex justify-between p-5 border  border-gray-200 my-3 rounded-xl">
//           <div key={user.id} className="font-bold text-xl">
//             {user.name}
//           </div>
//           <div>{user.email}</div>
//           <Button
//           // onClick={() => {
//           //   onDelete(user);
//           // }}
//           >
//             Delete
//           </Button>
//         </li>
//       ))}
//     </ul>
//   );
// }

export default async function Home() {
  const allUsers = await db.select().from(users);
  if (!allUsers) return false;
  return (
    <main className="flex min-h-screen flex-col items-center justify-around p-24">
      <div className="font-bold text-3xl">User page</div>
      <div className="flex flex-row w-2/3 justify-between">
        <CreateUserForm createUsers={createUsers}></CreateUserForm>
        <List allUsers={allUsers}></List>
      </div>
    </main>
  );
}
