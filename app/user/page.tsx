import { getUserSession } from "../api/auth/[...nextauth]/route";
import { notFound } from "next/navigation";
import BtnSignOut from "./BtnSignOut";
export default async function Home() {
  const user = await getUserSession();
  if (!user) return notFound();
  return (
    <main>
      <div className="font-bold text-2xl">{JSON.stringify(user)}</div>
      <BtnSignOut></BtnSignOut>
    </main>
  );
}
