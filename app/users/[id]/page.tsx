import CreateUserForm from "../form";
import { db, users } from "../../../lib/drizzle";
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
      <div className="flex min-h-screen flex-col items-center justify-around p-24">
        <div className="font-bold text-xl">修改資料</div>
        <div className="flex justify-between w-full">
          <div>
            <CreateUserForm user={user} update={true}></CreateUserForm>
          </div>
          <div className="">
            <Posts user={user}></Posts>
          </div>
        </div>
        <div className="self-end">
          <DeleteButton user={user}></DeleteButton>
        </div>
      </div>
    </>
  );
}
