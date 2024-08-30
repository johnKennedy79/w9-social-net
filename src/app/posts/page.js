import { db } from "@/lib/db";
import Link from "next/link";
import NewPost from "@/app/components/newPost";
import NavBar from "../components/navbar";
export const metadata = {
  title: "Posts",
  discription: "view all posts",
};

export default async function Posts({ searchParams }) {
  const sort = searchParams.sort === "desc" ? "DESC" : "ASC";

  const result = await db.query(`
      SELECT 
        rcposts.id, 
        rcposts.post, 
        rcposts.timestamp, 
        profiles.username AS username 
      FROM
        rcposts
      RIGHT JOIN
        profiles ON rcposts.clerk_id = profiles.clerk_id
      ORDER BY rcposts.timestamp ${sort}
    `);

  const posts = result.rows;

  return (
    <div className="mt-20">
      <NavBar />
      <NewPost />
      <div className="mb-4 sort">
        <Link href={`/posts?sort=asc`} className="mr-4">
          Sort ascending
        </Link>
        <Link href={`/posts?sort=desc`}>Sort descending</Link>
      </div>
      {posts.map((post) => {
        const jsonDate = new Date(post.timestamp);
        const formattedDate = jsonDate.toLocaleDateString();
        const formattedTime = jsonDate.toLocaleTimeString();
        return (
          <div key={post.id}>
            <div>
              <h2>{post.username}</h2>
              <p>{formattedDate}</p>
              <p>{formattedTime}</p>
            </div>
            <div>
              <p>{post.post}</p>
            </div>
            <div>
              <Link href={`posts/${post.id}`}>comments</Link>{" "}
            </div>
          </div>
        );
      })}
    </div>
  );
}
