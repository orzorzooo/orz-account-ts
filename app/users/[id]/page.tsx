import CreateUserForm from "../form";
import { db } from "@/lib/drizzle";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import DeleteButton from "./deleteButton";
import { notFound } from "next/navigation";
import CreatFormPost from "./createPostForm";
import Posts from "./posts";
import CreateProfileForm from "./profile";

export default async function Page({ params }: { params: { id: number } }) {
  // const [user] = await db.select().from(users).where(eq(users.id, params.id)).limit(1);
  const user = await db.query.users.findFirst({ where: eq(users.id, params.id), with: { profile: true } });

  console.log("user", user);
  if (!user) {
    return notFound();
  }
  return (
    <>
      <div className="w-full p-16">
        {/* <div className="font-bold text-xl">修改資料</div> */}
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-2">
            <div className="font-bold border-b border-gray text-xl mb-3"> User Info</div>

            <div className="font-bold text-3xl">{user.name}</div>
            <div className="text-xl">{user.email}</div>
            <DeleteButton user={user}></DeleteButton>
          </div>

          <div className="flex-1 ">
            <div className="lg:max-w-2xl font-bold border-b border-gray text-xl mb-3"> Profile</div>
            <CreateProfileForm user={user}></CreateProfileForm>
          </div>
        </div>
        <div className="self-end"></div>
      </div>
    </>
  );
}
