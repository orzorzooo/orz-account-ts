import CreateUserForm from "../form";
import { db, users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import DeleteButton from "./deleteButton";
import { notFound } from "next/navigation";
import CreatFormPost from "./createPostForm";
import Posts from "./posts";

export default async function Page({ params }: { params: { id: number } }) {
  const [user] = await db.select().from(users).where(eq(users.id, params.id)).limit(1);
  console.log("bb", user);
  if (!user) {
    return notFound();
  }
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-start p-24">
        <div className="font-bold text-xl">修改資料</div>
        <div className="flex justify-around w-full h-96">
          <div className="">
            <div className="font-bold border-b border-gray text-xl mb-3"> User Info</div>

            <div className="font-bold text-3xl">{user.name}</div>
            <div className="text-xl">{user.email}</div>
            <DeleteButton user={user}></DeleteButton>
          </div>

          {/* <div>
            <CreateUserForm user={user} update={true}></CreateUserForm>
          </div> */}
          <div className="justify-self-start w-2/3">
            <div className="font-bold border-b border-gray text-xl mb-3"> Posts</div>
            <Posts user={user}></Posts>
          </div>
        </div>
        <div className="self-end"></div>
      </div>
    </>
  );
}
