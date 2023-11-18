import { db, users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import type { Post } from "@/lib/drizzle";

export default async function Posts({ user }: any) {
  // const allPosts = await db.select().from(posts).where(eq(posts.user_id, user.id));
  const allPosts = await db.query.users.findMany({ with: { posts: true } });

  console.log("-->", allPosts);
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {/* {allPosts.map((post: Post) => (
          <div className="border rounded-xl p-8">{post.title}</div>
        ))} */}
      </div>
    </>
  );
}
