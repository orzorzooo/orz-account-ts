import { db, posts } from "@/lib/drizzle";
import { eq } from "drizzle-orm";

export default async function Post({ params }: { params: { id: number } }) {
  const post = await db.query.posts.findFirst({ where: eq(posts.id, params.id) });
  console.log(post);
  return (
    <>
      <div>{post?.title}</div>
      <div>{post?.content}</div>
    </>
  );
}
