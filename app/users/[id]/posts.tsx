import { db, posts, users } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import type { Post } from "@/lib/drizzle";
import Link from "next/link";
import anime from "animejs";
import { useEffect } from "react";
export default async function Posts({ user }: any) {
  // const { posts }: any = await db.query.users.findFirst({ where: eq(users.id, user.id), with: { posts: true } });
  const userPosts = await db.query.posts.findMany({ where: eq(posts.user_id, user.id) });

  // useEffect(() => {
  //   const animation = anime({
  //     targets: ".anime",
  //     translateX: -10,
  //     delay: anime.stagger(100),
  //     opacity: 1,
  //   });
  //   animation.play();
  // });
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="border rounded-xl p-8"> + </div>
        {userPosts.map((post: Post) => (
          <Link href={`/posts/${post.id}`}>
            <div className="border rounded-xl p-8 h-32 flex jusitfy-center items-center anime">{post.title}</div>
          </Link>
        ))}
      </div>
    </>
  );
}
