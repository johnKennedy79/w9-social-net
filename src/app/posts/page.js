import { db } from "@/lib/db";
import Link from "next/link";
import NewPost from "@/app/components/newPost";
import NavBar from "../components/navbar";

export const metadata = {
  title: "Posts",
  discription: "view all posts and add a new post",
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
      <div className="mb-4 sort text-center">
        <Link
          href={`/posts?sort=asc`}
          className="mr-6 hover:text-[#002349] hover:cursor:pointer"
        >
          Sort ascending
        </Link>
        <Link
          href={`/posts?sort=desc`}
          className="hover:text-[#002349] hover:cursor:pointer ml-6"
        >
          Sort descending
        </Link>
      </div>
      <div className="w-11/12 flex flex-col items-center">
        {posts.map((post) => {
          const jsonDate = new Date(post.timestamp);
          const formattedDate = jsonDate.toLocaleDateString();
          const formattedTime = jsonDate.toLocaleTimeString();
          return (
            <div key={post.id} className="w-10/12 text-center">
              <div className="border-solid border-[#cd950c] border-2 p-2 flex items-center justify-between bg-[#002349]">
                <Link
                  href={`/${post.clerk_id}`}
                  className="hover:text-fuchsia-500 hover:cursor:pointer"
                >
                  <h2>{post.username}</h2>
                </Link>
                <p>
                  {formattedDate}
                  {formattedTime}
                </p>
              </div>
              <div>
                <p>{post.post}</p>
              </div>
              <div>
                <Link
                  href={`posts/${post.id}`}
                  className="hover:text-[#002349] hover:cursor:pointer"
                >
                  comments
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
