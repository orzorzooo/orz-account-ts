import { db, posts, users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import type { Post } from "@/lib/drizzle";

export default async function Posts({ user }: any) {
  // const { posts }: any = await db.query.users.findFirst({ where: eq(users.id, user.id), with: { posts: true } });
  const userPosts = await db.query.posts.findMany({ where: eq(posts.user_id, user.id) });

  console.log("-->", userPosts);
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {userPosts.map((post: Post) => (
          <div className="border rounded-xl p-8">{post.title}</div>
        ))}
      </div>
    </>
  );
}
